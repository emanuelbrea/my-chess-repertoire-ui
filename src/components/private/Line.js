import React, {useEffect, useRef, useState} from 'react';
import MyMove from './MyMove';
import RivalMoves from './RivalMoves';
import {Divider} from '@mui/material';
import AddLine from './AddLine';
import Snackbar from '@mui/material/Snackbar';
import Alert from '../public/Util';
import {useNavigate} from 'react-router-dom';
import Loading from '../public/Loading';
import PropTypes from 'prop-types';
import getCurrentJwt from '../../auth/CognitoService';
import {addMoves, getRepertoireMoves, updateMove} from '../../api/repertoire';


export default function Line({fen, color, addVariant, currentDepth, removeMoves, active, addCandidates}) {
  const [data, setData] = useState(null);
  const [endOfLine, setEndOfLine] = useState(false);
  const fieldRef1 = useRef(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (color !== 'white' && color !== 'black') {
      return navigate('/repertoires');
    }
    getCurrentJwt().then((jwt) => {
      setAccessToken(jwt);
      getRepertoireMoves(jwt, fen, color).then((moves) => {
        setData(moves);
        getCandidates(moves);
      }).catch((error) => setErrorMessage(error.message));
    });
  }, [fen]);

  useEffect(() => {
    getCandidates(data);
  }, [active]);


  useEffect(() => {
    if (data && data['success'] === true && currentDepth && active) {
      if (currentDepth === 1 && fieldRef1.current && color === 'white') {
        fieldRef1.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      } else if (currentDepth === data['data']['depth'] && fieldRef1.current) {
        fieldRef1.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  function getCandidates(moves) {
    if (moves && active && Object.keys(moves['data']).length > 0) {
      const rivalMoves = moves['data']['rival_moves'];
      const candidates = [];
      for (const rivalMove of rivalMoves) {
        candidates.push(rivalMove['fen']);
      }
      if (Object.keys(moves['data']['my_move']).length === 0) {
        addCandidates(candidates, 1);
      } else {
        addCandidates(candidates, moves['data']['depth'] + 1);
      }
    }
  }

  const updateRepertoireMove = async (move) => {
    setData(null);
    updateMove(accessToken, move, fen, color).then((moves) => {
      removeMoves(data['data']['depth']);
      setData(moves);
      setOpen(true);
      getCandidates(moves);
    } ).catch((error) => {
      setErrorMessage(error.message);
      setData({success: false});
    });
  };

  const addRepertoireMoves = async () => {
    setData(null);
    addMoves(accessToken, fen, color).then((moves) => {
      setEndOfLine(true);
      setData(moves);
      getCandidates(moves);
    } ).catch((error) => {
      setErrorMessage(error.message);
      setData({success: false});
    });
  };

  if (!active) {
    return null;
  }

  if (!data) {
    return (<Loading/>);
  }

  if (data['success'] === false) {
    return (
      <Snackbar open={true}>
        <Alert severity="error" sx={{width: '100%', fontSize: 16}}>
                    Something went wrong. Please try again in a few minutes.
        </Alert>
      </Snackbar>
    );
  }

  if (active && Object.keys(data['data']).length === 0) {
    return (
      <AddLine addRepertoireMoves={addRepertoireMoves} endOfLine={endOfLine}></AddLine>
    );
  }

  return (
    <>
      {active === true && Object.keys(data['data']['my_move']).length > 0 &&
                <>
                  <div ref={fieldRef1}/>
                  <MyMove move={data['data']['my_move']}
                    stats={data['data']['my_moves']}
                    position={data['data']['position']}
                    depth={data['data']['depth']}
                    color={color}
                    currentDepth={currentDepth}
                    updateMove={updateRepertoireMove}
                  />
                  <Divider/>
                  <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{width: '100%', fontSize: 16}}>
                            Repertoire updated correctly!
                    </Alert>
                  </Snackbar>
                </>
      }
      {active === true &&
                <>
                  <RivalMoves moves={data['data']['rival_moves']}
                    fen={Object.keys(data['data']['my_move']).length > 0 ? data['data']['my_move']['fen'] : fen}
                    depth={color === 'white' ||
                                Object.keys(data['data']['my_move']).length === 0 ?
                                    data['data']['depth'] :
                                    data['data']['depth'] + 1}
                    addVariant={addVariant}
                    color={color}
                  />
                  <Divider/>
                </>
      }
      <Snackbar open={errorMessage != null} autoHideDuration={4000} onClose={()=> setErrorMessage(null)}>
        <Alert onClose={()=> setErrorMessage(null)} severity="error" sx={{width: '100%', fontSize: 16}}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>

  );
}

Line.propTypes = {
  fen: PropTypes.string,
  color: PropTypes.string,
  addVariant: PropTypes.func,
  currentDepth: PropTypes.number,
  removeMoves: PropTypes.func,
  active: PropTypes.bool,
  addCandidates: PropTypes.func,
};
