import {ReactSVG} from 'react-svg';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import StatsTable from './StatsTable';
import {Card, CardActionArea, CardMedia, Container, Skeleton} from '@mui/material';
import Alert, {getSvgUrl} from '../public/Util';
import React, {useEffect, useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import PropTypes from 'prop-types';

export default function RivalMoves({moves, fen, depth, addVariant, color}) {
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (move) => {
    setActive(move);
    addVariant(move, depth);
  };

  useEffect(() => {
    if (moves.length === 0) {
      setOpen(true);
    }
  }, [moves]);

  return (
    <>
      {moves.length > 0 &&
                <>
                  <Container sx={{display: 'flex', justifyContent: 'center', mt: 1}}>
                    <Typography variant="h3">
                            Opponent moves
                    </Typography>
                  </Container>
                  <Grid container spacing={5} justifyContent={'center'} marginTop={3} paddingRight={3}
                    paddingLeft={3}>
                    {moves.map((move, index) => (
                      <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={index}>
                        <div data-aos="flip-left" data-aos-offset="0" data-aos-delay={300 + index * 50}
                          data-aos-duration="800">
                          <Card elevation={10} sx={{'border': active === move && '6px solid #769656', ':hover': {
                            boxShadow: 20,
                          }}}>
                            <CardActionArea onClick={() => handleChange(move)}>

                              <CardMedia>
                                <ReactSVG
                                  loading={() => <Skeleton animation="wave" variant="rectangular"
                                    height={350}></Skeleton>}
                                  key={index} src={getSvgUrl(fen, move.move, color)}></ReactSVG>
                              </CardMedia>
                            </CardActionArea>
                          </Card>
                          <Container
                            sx={{alignItems: 'center', display: 'flex', flexDirection: 'column', mt: 2}}>
                            <Typography variant="h6" marginX={2}>
                              {depth}{color === 'white' ? '...' : '.'}{move.move}
                            </Typography>
                            <Typography variant="h6" marginX={2} id={move.move + index}>
                              {move.name}
                            </Typography>
                          </Container>

                        </div>

                      </Grid>
                    ))}
                  </Grid>
                  <Container sx={{padding: 4}}>
                    <StatsTable stats={moves} active={active?.move}/>
                  </Container>
                </>
      }
      <Snackbar open={open} autoHideDuration={5000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="info" sx={{width: '100%', fontSize: 16}}>Not enough games to continue
                    this line</Alert>
      </Snackbar>

    </>


  );
}

RivalMoves.propTypes = {
  moves: PropTypes.array,
  fen: PropTypes.string,
  depth: PropTypes.number,
  addVariant: PropTypes.func,
  color: PropTypes.string,
};
