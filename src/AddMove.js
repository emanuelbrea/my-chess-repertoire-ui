import Grid from "@mui/material/Grid";
import {ReactSVG} from "react-svg";
import Typography from "@mui/material/Typography";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import {Card, CardActionArea, CardContent, CardMedia, CircularProgress} from "@mui/material";
import {getSvgUrl} from "./util.js";

export default function AddMove(props) {
    const {onClose, open, moves, move, fen, depth, color} = props;

    const handleOk = (move) => {
        onClose(move);
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            open={open}
            maxWidth="xl"
            fullWidth={true}
            onClose={handleClose}
        >
            <DialogTitle>
                {'Pick a move to replace ' + depth + '.' + move.move}
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={5} justifyContent={"center"} paddingRight={2} paddingLeft={2}>
                    {moves.filter(function (my_move) {
                        return (my_move.move !== move.move)
                    }).map((move, index) => (
                        <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={index}>
                            <Card elevation={10}>
                                <CardActionArea onClick={() => handleOk(move.move)}>
                                    <CardMedia>
                                        <ReactSVG key={index} loading={() => <CircularProgress/>}
                                                  src={getSvgUrl(fen, move.move, color)}></ReactSVG>
                                    </CardMedia>
                                    <CardContent>
                                        <Typography variant="h6" marginX={2}>
                                            {depth}.{move.move}
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
            </DialogContent>
        </Dialog>
    )
}