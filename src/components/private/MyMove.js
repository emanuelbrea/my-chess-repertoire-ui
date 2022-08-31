import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import {ReactSVG} from 'react-svg'
import StatsTable from "./StatsTable";
import {Card, CardActionArea, CardMedia, Container, IconButton, Link, Skeleton} from "@mui/material";
import AddMove from "./AddMove";
import {useEffect, useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {getSvgUrl} from "../public/Util";

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
        getMoveDescription(move)
    }, [move]);


    const getMoveDescription = async (move) => {

        const moves = await fetch(move.link.replace('wiki/', 'w/api.php?titles=') +
            '&redirects&origin=*&action=query&prop=extracts&formatversion=2&format=json&exchars=800')
            .then(res => res.json())
        const info = moves['query']['pages'][0]
        if(info['extract'] !== undefined){
            const desc = info['extract'].replace('When contributing to this Wikibook, please follow the Conventions for organization.', '')
            setDescription(desc)
        }
        else{
            setDescription(undefined)
        }
    }

    return (
        <>

            <Grid container spacing={1} justifyContent={"space-evenly"} marginTop={3} padding={3} marginBottom={4}>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={5} display={"flex"} flexDirection={"column"}
                      justifyContent={"center"}>
                    <Typography variant="h3">
                        Your move: {depth}{color === 'white' ? '.' : '...'}{move.move}
                    </Typography>
                    {description === null &&
                        <>
                            <Skeleton variant="text" width={"60%"} sx={{ fontSize: '1rem' }} />

                            <Skeleton variant="rounded" width={"60%"} height={100} />
                        </>
                    }
                    {description != null &&
                        <div dangerouslySetInnerHTML={{__html: description}} style={{fontSize: 18}}/>
                    }
                    <Link href={move.link !== null ? move.link : 'https://en.wikibooks.org/wiki/Chess_Opening_Theory'}
                          marginX={2} target='_blank'>
                        Read more on WikiBooks
                    </Link>
                </Grid>
                <Grid item xs={12} sm={10} md={8} lg={6} xl={5} display={"flex"} flexDirection={"column"}
                      justifyContent={"center"}
                >
                    <Card elevation={10}>
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
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4} display={"flex"} flexDirection={"column"}
                              alignItems={"center"}
                        >
                            <Typography variant="h5">
                                {depth}{color === 'white' ? '.' : '...'}{move.move}
                            </Typography>
                            <Typography variant="h5" textAlign={"center"}>
                                {move?.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4} display={"flex"} justifyContent={"flex-end"}>
                            <IconButton color="primary" size={"large"} onClick={handleClickEditMove}>
                                <EditIcon sx={{fontSize: 30}}/>
                            </IconButton>
                            <IconButton sx={{color: "#769656"}} onClick={() => setFavorite(!favorite)}>
                                {favorite ?
                                    <FavoriteIcon size={"large"} sx={{fontSize: 30}}/>
                                    :
                                    <FavoriteBorderIcon size={"large"} sx={{fontSize: 30}}/>}

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
    )
}
