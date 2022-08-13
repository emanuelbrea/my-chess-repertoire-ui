import {ReactSVG} from "react-svg";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import StatsTable from "./StatsTable";
import {Card, CardActionArea, CardContent, CardMedia, Container, Skeleton} from "@mui/material";
import {getSvgUrl} from "./util";
import {useState} from "react";
import AOS from "aos";

export default function RivalMoves({moves, fen, depth, addVariant, color}) {

    const [active, setActive] = useState(null);

    const handleChange = (move) => {
        setActive(move);
        addVariant(move, depth);
        AOS.refresh();
    };

    AOS.refresh();

    return (
        <>
            <Container sx={{display:"flex", justifyContent:"center"}}>
                <Typography variant="h3">
                    Opponent moves
                </Typography>
            </Container>
            <Grid container spacing={5} justifyContent={"center"} marginTop={3} paddingRight={3} paddingLeft={3}>
                {moves.map((move, index) => (
                    <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={index}>
                        <div data-aos="flip-left" data-aos-offset="0" data-aos-delay={300 + index * 50}
                             data-aos-duration="800">
                            <Card elevation={10} sx={{border: active === move ? '6px solid green' : null}}>
                                <CardActionArea onClick={() => handleChange(move)}>

                                    <CardMedia>
                                        <ReactSVG
                                            loading={() => <Skeleton animation="wave" variant="rectangular"
                                                                     height={450}></Skeleton>}
                                            key={index} src={getSvgUrl(fen, move.move, color)}></ReactSVG>
                                    </CardMedia>

                                    <CardContent>
                                        <Typography variant="h6" marginX={2}>
                                            {depth}{color === 'white' ? '...' : '.'}{move.move}
                                        </Typography>
                                        <Typography variant="h6" marginX={2} id={move.move + index}>
                                            {move.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>

                    </Grid>
                ))}
            </Grid>
            <Container sx={{padding: 4}}>
                <StatsTable stats={moves} active={active?.move}/>
            </Container>

        </>


    )
}