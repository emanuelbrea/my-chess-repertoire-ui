import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {ReactSVG} from 'react-svg';
import StatsTable from './StatsTable';
import {Card, CardActionArea, CardMedia, Container, IconButton, Link, Skeleton} from '@mui/material';
import AddMove from './AddMove';
import {useCallback, useEffect, useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {getSvgUrl} from '../public/Util';
import React from 'react';
import PropTypes from 'prop-types';
import {addFavoriteMove} from '../../api/user';
import getCurrentJwt from '../../auth/CognitoService';

export default function MyMove({move, depth, position, stats, updateMove, color}) {
  const [open, setOpen] = useState(false);
  const [favorite, setFavorite] = useState(move['favorite']);
  const [description, setDescription] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      updateMove(newValue);
    }
  };

  const handleClickEditMove = () => {
    setOpen(true);
  };

  useEffect(() => {
    getMoveDescription(move).catch(console.error);
    getCurrentJwt().then((jwt) => {
      setAccessToken(jwt);
    }).catch(console.error);
  }, [move]);


  const getMoveDescription = useCallback(async (move) => {
    const moves = await fetch( 'https://en.wikibooks.org/w/api.php?titles=Chess_Opening_Theory/' + move.link +
            '&redirects&origin=*&action=query&prop=extracts&formatversion=2&format=json&exchars=800')
        .then((res) => res.json());
    const info = moves['query']['pages'][0];
    if (info['extract'] !== undefined) {
      const desc = info['extract'].replace('When contributing to this Wikibook, please follow the Conventions for organization.', '');
      setDescription(desc);
    } else {
      setDescription(undefined);
    }
  }, []);

  const addToFavorite = () => {
    setFavorite(!favorite);
    addFavoriteMove(accessToken, position.fen, move.move ).catch(console.error);
  };

  return (
    <>

      <Grid container spacing={1} justifyContent={'space-evenly'} marginTop={15} padding={3} marginBottom={4}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={5} display={'flex'} flexDirection={'column'}
          justifyContent={'center'}>
          <Typography variant="h3">
                        Your move: {depth}{color === 'white' ? '.' : '...'}{move.move}
          </Typography>
          {description === null &&
                        <>
                          <Skeleton variant="text" width={'60%'} sx={{fontSize: '1rem'}} />

                          <Skeleton variant="rounded" width={'60%'} height={100} />
                        </>
          }
          {description != null &&
                        <div dangerouslySetInnerHTML={{__html: description}} style={{fontSize: 18}}/>
          }
          {
            move.link !== null && description != null &&
            <Link href={'https://en.wikibooks.org/wiki/Chess_Opening_Theory/' + move.link}
              marginX={2} target='_blank'>
              Read more on WikiBooks
            </Link>
          }
          <Link href={'https://lichess.org/analysis?fen=' + position.fen + '&color=' + color}
            marginX={2} target='_blank'>
            View on lichess
          </Link>
        </Grid>
        <Grid item xs={12} sm={10} md={8} lg={6} xl={5} display={'flex'} flexDirection={'column'}
          justifyContent={'center'}
        >
          <Card elevation={10} sx={{
            ':hover': {
              boxShadow: 20,
            },
          }}>
            <CardActionArea
              onClick={handleClickEditMove}
            >
              <CardMedia>
                <ReactSVG
                  loading={() => <Skeleton animation="wave" variant="rectangular"
                    height={400}></Skeleton>}
                  src={getSvgUrl(position.fen, move.move, color)}/>
              </CardMedia>
            </CardActionArea>
          </Card>

          <Grid container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            marginTop={2}
          >
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} display={'flex'} flexDirection={'column'}
              alignItems={'center'}
            >
              <Typography variant="h5">
                {depth}{color === 'white' ? '.' : '...'}{move.move}
              </Typography>
              <Typography variant="h5" textAlign={'center'}>
                {move?.name}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} display={'flex'} justifyContent={'flex-end'}>
              <IconButton color="primary" size={'large'} onClick={handleClickEditMove}>
                <EditIcon sx={{fontSize: 30}}/>
              </IconButton>
              <IconButton sx={{color: '#769656'}} onClick={addToFavorite}>
                {favorite ?
                                    <FavoriteIcon size={'large'} sx={{fontSize: 30}}/> :
                                    <FavoriteBorderIcon size={'large'} sx={{fontSize: 30}}/>}

              </IconButton>
            </Grid>
          </Grid>


        </Grid>
      </Grid>
      <Container sx={{mb: 3}}>
        <StatsTable stats={stats} active={move.move}/>
      </Container>
      <AddMove
        id={'edit-move'}
        keepMounted
        open={open}
        onClose={handleClose}
        moves={stats}
        move={move}
        fen={position.fen}
        depth={depth}
        color={color}
      />
    </>
  );
}
MyMove.propTypes = {
  move: PropTypes.object,
  depth: PropTypes.number,
  position: PropTypes.object,
  stats: PropTypes.array,
  updateMove: PropTypes.func,
  color: PropTypes.string,
};

