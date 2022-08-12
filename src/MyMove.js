import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import {ReactSVG} from 'react-svg'
import StatsTable from "./StatsTable";
import Box from "@mui/material/Box";
import {Card, CardActionArea, CardContent, CardMedia, CircularProgress, Fab, Link} from "@mui/material";
import AddMove from "./AddMove";
import {useEffect, useRef, useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import {getSvgUrl} from "./util";

export default function MyMove({move, depth, position, stats, currentDepth, updateMove, color}) {

    const [open, setOpen] = useState(false);
    const fieldRef = useRef(null);
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

    if (fieldRef.current && depth === currentDepth) {
        fieldRef.current.scrollIntoView({
            behavior: "smooth",
            block: 'center'
        });
    }

    return (
        <>

            <Grid container spacing={3} justifyContent={"space-around"} marginTop={3} padding={3} marginBottom={4}
                  ref={fieldRef}>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={5}>
                    <Typography variant="h3">
                        Your move: {depth}{color === 'white' ? '.' : '...'}{move.move}
                    </Typography>
                    {description != null ? <div dangerouslySetInnerHTML={{__html: description}}/> : null}
                    <Link href={move.link !== null ? move.link : 'https://en.wikibooks.org/wiki/Chess_Opening_Theory'}
                          marginX={2} target='_blank'>
                        Read more on WikiBooks
                    </Link>
                    <Box sx={{marginTop: 5}}>
                        <StatsTable stats={stats}/>
                    </Box>

                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
                    <Card elevation={10}>
                        <CardActionArea
                            onClick={handleClickEditMove}
                        >
                            <CardMedia>
                                <ReactSVG
                                    loading={() => <CircularProgress/>}
                                    src={getSvgUrl(position.fen, move.move, color)}/>
                            </CardMedia>
                            <CardContent>
                                <Typography variant="h6" marginX={2}>
                                    {depth}.{move.move}
                                </Typography>
                                <Typography variant="h6" marginX={2}>
                                    {move.name !== undefined ? move.name : ''}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', margin: 4}}>
                <Fab color="primary" aria-label="edit" variant={"extended"} onClick={handleClickEditMove}>
                    <EditIcon/>
                    Edit move
                </Fab>
            </Box>
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