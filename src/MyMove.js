import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import {ReactSVG} from 'react-svg'
import StatsTable from "./StatsTable";
import Box from "@mui/material/Box";
import {Card, CardActionArea, CardMedia, IconButton, Link, Skeleton} from "@mui/material";
import AddMove from "./AddMove";
import {useEffect, useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {getSvgUrl} from "./util";

export default function MyMove({move, depth, position, stats, updateMove, color}) {

    const [open, setOpen] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [description, setDescription] = useState(null);

    const handleClose = (newValue) => {
        setOpen(false);

        if (newValue) {
            updateMove(newValue)
        }
    };

    const handleClickEditMove = () => {
        setOpen(true);
    };

    useEffect(() => {
        if (move.link) {
            getMoveDescription(move)
        }
    }, [move]);


    const getMoveDescription = async (move) => {

        const moves = await fetch(move.link.replace('wiki/', 'w/api.php?titles=') +
            '&redirects&origin=*&action=query&prop=extracts&formatversion=2&format=json&exchars=800')
            .then(res => res.json())
        setDescription(moves['query']['pages'][0]['extract'])
    }

    return (
        <>

            <Grid container spacing={1} justifyContent={"space-evenly"} marginTop={3} padding={3} marginBottom={4}>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={5} display={"flex"} flexDirection={"column"}
                      justifyContent={"center"}>
                    <Typography variant="h3">
                        Your move: {depth}{color === 'white' ? '.' : '...'}{move.move}
                    </Typography>
                    {description != null &&
                        <div dangerouslySetInnerHTML={{__html: description}} style={{fontSize: 18}}/>}
                    <Link href={move.link !== null ? move.link : 'https://en.wikibooks.org/wiki/Chess_Opening_Theory'}
                          marginX={2} target='_blank'>
                        Read more on WikiBooks
                    </Link>
                    <Box sx={{mt: 5, mb: 1}}>
                        <StatsTable stats={stats} active={move.move}/>
                    </Box>

                </Grid>
                <Grid item xs={12} sm={10} md={10} lg={6} xl={5} display={"flex"} flexDirection={"column"}
                      justifyContent={"center"}
                >
                    <Card elevation={10}>
                        <CardActionArea
                            onClick={handleClickEditMove}
                        >
                            <CardMedia>
                                <ReactSVG
                                    loading={() => <Skeleton animation="wave" variant="rectangular"
                                                             height={500}></Skeleton>}
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
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4} display={"flex"} flexDirection={"column"}
                              alignItems={"center"}
                        >
                            <Typography variant="h5">
                                {depth}.{move.move}
                            </Typography>
                            <Typography variant="h5">
                                {move?.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4} display={"flex"} justifyContent={"flex-end"}>
                            <IconButton color="primary" size={"large"} onClick={handleClickEditMove}>
                                <EditIcon sx={{fontSize: 30}}/>
                            </IconButton>
                            <IconButton sx={{color: "red"}} onClick={() => setFavorite(!favorite)}>
                                {favorite ?
                                    <FavoriteIcon size={"large"} sx={{fontSize: 30}}/>
                                    :
                                    <FavoriteBorderIcon size={"large"} sx={{fontSize: 30}}/>}

                            </IconButton>
                        </Grid>
                    </Grid>


                </Grid>
            </Grid>
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
    )
}