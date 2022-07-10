import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import {ReactSVG} from 'react-svg'
import Link from "./Link";
import StatsTable from "./StatsTable";
import Box from "@mui/material/Box";
import {Card, CardActionArea, CardContent, CardMedia, Fab} from "@mui/material";
import AddMove from "./AddMove";
import {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';

export default function MyMove() {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState();
    const handleClose = (newValue) => {
        setOpen(false);

        if (newValue) {
            setValue(newValue);
        }
    };

    const handleClickEditMove = () => {
        setOpen(true);
    };

    return (
        <>

            <Grid container spacing={4} justifyContent={"space-around"} marginTop={3} padding={3} marginBottom={4} >
                <Grid item xs={12} sm={12} md={12} lg={6} xl={5}>
                    <Typography variant="h3" marginX={2}>
                        Your move: 1.e4
                    </Typography>
                    <Typography marginX={2}>
                        White's assertive opening move opens lines for the queen and king's bishop and fights for
                        control of the squares d5 and f5.
                        This move is popular at all levels of the game and was the favorite opening move of world
                        champion Bobby Fischer who called it "best by test".
                        <br/>
                        <br/>
                        Openings with 1.e4 are traditionally considered more sharp and attacking than those with 1.d4,
                        but this is an extreme generalization and both players will have many more opportunities to
                        influence the type of position that appears.
                        <br/>
                        <br/>
                    </Typography>
                    <Link href="https://en.wikibooks.org/wiki/Chess_Opening_Theory/1._e4" marginX={2} target='_blank'>
                        Read more on WikiBooks

                    </Link>
                    <Box sx={{marginTop: 5}}>
                        <StatsTable/>
                    </Box>

                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={4} >
                    <Card elevation={10}>
                        <CardActionArea
                            onClick={handleClickEditMove}
                        >
                            <CardMedia>
                                <ReactSVG
                                    src={"http://localhost:5000/position/svg?fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR%20w%20KQkq%20-%200%201&move=e4"}/>
                            </CardMedia>
                            <CardContent>
                                <Typography variant="h6" marginX={2}>
                                    1.e4
                                </Typography>
                                <Typography variant="h6" marginX={2}>
                                    Open game
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
            <Box sx={{display:'flex', justifyContent:'flex-end', margin:4}}>
                <Fab color="primary" aria-label="edit" variant={"extended"}  onClick={handleClickEditMove}>
                    <EditIcon />
                    Edit move
                </Fab>
            </Box>
            <AddMove
                id={'edit-move'}
                keepMounted
                open={open}
                onClose={handleClose}
                value={value}
            />
        </>
    )
}