import {ReactSVG} from "react-svg";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import StatsTable from "./StatsTable";
import {Container} from "@mui/material";

const fens = ["http://localhost:5000/position/svg?fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR%20w%20KQkq%20-%200%201&move=e4",
    "http://localhost:5000/position/svg?fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR%20w%20KQkq%20-%200%201&move=e4",
    "http://localhost:5000/position/svg?fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR%20w%20KQkq%20-%200%201&move=e4",
    "http://localhost:5000/position/svg?fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR%20w%20KQkq%20-%200%201&move=e4"
]

export default function RivalMoves() {
    return (
        <>
            <Typography variant="h3" marginX={2}>
                Opponent moves:
            </Typography>
            <Grid container spacing={5} justifyContent={"center"} marginTop={3} paddingRight={3} paddingLeft={3}>
                {fens.map((fen, index) => (
                    <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                        <ReactSVG key={index} src={fen}></ReactSVG>
                        <Typography variant="h6" marginX={2}>
                            c5
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            <Container>
                <StatsTable/>
            </Container>

        </>


    )
}