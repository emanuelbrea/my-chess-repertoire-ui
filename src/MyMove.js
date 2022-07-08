import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import {ReactSVG} from 'react-svg'
import Link from "./Link";
import StatsTable from "./StatsTable";

export default function MyMove(){
    return(
        <Grid container spacing={2} justifyContent={"center"} marginTop={3}>
            <Grid item xs={3} >
                <Typography variant="h3" marginX={2}>
                    Your move: 1.e4
                </Typography>
                <Typography marginX={2} >
                    White's assertive opening move opens lines for the queen and king's bishop and fights for control of the squares d5 and f5.
                    This move is popular at all levels of the game and was the favorite opening move of world champion Bobby Fischer who called it "best by test".
                    <br />
                    <br />
                    Openings with 1.e4 are traditionally considered more sharp and attacking than those with 1.d4, but this is an extreme generalization and both players will have many more opportunities to influence the type of position that appears.
                    <br />
                    <br />
                </Typography>
                <Link href="https://en.wikibooks.org/wiki/Chess_Opening_Theory/1._e4" marginX={2} target='_blank'>
                   Read more on WikiBooks

                </Link>
            </Grid>
            <Grid item xs={4} >
                <ReactSVG src={"http://localhost:5000/position/svg?fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR%20w%20KQkq%20-%200%201&move=e4"}>

                </ReactSVG>
            </Grid>
            <Grid item xs={5}>
                <StatsTable/>
            </Grid>
        </Grid>
    )
}