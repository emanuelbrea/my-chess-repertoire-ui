import {ReactSVG} from "react-svg";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import StatsTable from "./StatsTable";
import {Card, CardActionArea, CardContent, CardMedia, Container, Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";
import AddMove from "./AddMove";

const fens = [
    "http://localhost:5000/position/svg?fen=rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1&move=c5",
    "http://localhost:5000/position/svg?fen=rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1&move=e5",
    "http://localhost:5000/position/svg?fen=rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1&move=e6",
    // "http://localhost:5000/position/svg?fen=rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1&move=c6",
]

export default function RivalMoves() {
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
            <Typography variant="h3" marginX={2}>
                Opponent moves:
            </Typography>
            <Grid container spacing={5} justifyContent={"center"} marginTop={3} paddingRight={3} paddingLeft={3} >
                {fens.map((fen, index) => (
                    <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                        <Card elevation={10}>
                            <CardActionArea>
                                <CardMedia>
                                    <ReactSVG key={index} src={fen}></ReactSVG>
                                </CardMedia>
                                <CardContent>
                                    <Typography variant="h6" marginX={2}>
                                        1...c5
                                    </Typography>
                                    <Typography variant="h6" marginX={2}>
                                        Defensa Siciliana
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                    </Grid>
                ))}
                <Grid item xs={12} sm={6} md={6} lg={4} xl={1} alignSelf={"center"} display={"flex"}
                      justifyContent={"center"}>
                    <Fab color="primary" aria-label="add" size={"large"} variant={"extended"}
                         onClick={handleClickEditMove}>
                        <AddIcon/>
                        Add move
                    </Fab>
                </Grid>
            </Grid>
            <Container sx={{padding: 4}}>
                <StatsTable/>
            </Container>
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