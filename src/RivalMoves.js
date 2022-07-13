import {ReactSVG} from "react-svg";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import StatsTable from "./StatsTable";
import {Card, CardActionArea, CardContent, CardMedia, Container} from "@mui/material";
import {getSvgUrl} from "./util";

export default function RivalMoves({moves, fen, depth, addVariant, color}) {

    const handleChange = (move) => {
        addVariant(move, depth);
    };

    return (
        <>
            <Typography variant="h3" marginX={2}>
                Opponent moves:
            </Typography>
            <Grid container spacing={5} justifyContent={"center"} marginTop={3} paddingRight={3} paddingLeft={3}>
                {moves.map((move, index) => (
                    <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={index}>
                        <Card elevation={10}>
                            <CardActionArea onClick={() => handleChange(move)}>
                                <CardMedia>
                                    <ReactSVG key={index} src={getSvgUrl(fen, move.move, color)}></ReactSVG>
                                </CardMedia>
                                <CardContent>
                                    <Typography variant="h6" marginX={2}>
                                        {depth}{color === 'white' ? '...' : '.'}{move.move}
                                    </Typography>
                                    <Typography variant="h6" marginX={2}>
                                        {move.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                    </Grid>
                ))}
            </Grid>
            <Container sx={{padding: 4}}>
                <StatsTable stats={moves}/>
            </Container>

        </>


    )
}