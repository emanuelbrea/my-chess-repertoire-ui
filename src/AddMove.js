import Grid from "@mui/material/Grid";
import {ReactSVG} from "react-svg";
import Typography from "@mui/material/Typography";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import {Alert, Card, CardActionArea, CardContent, CardMedia, CircularProgress} from "@mui/material";
import {getSvgUrl} from "./util.js";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {forwardRef} from "react";

export default function AddMove({onClose, open, moves, move, fen, depth, color}) {

    const handleOk = (move) => {
        onClose(move);
    };

    const handleClose = () => {
        onClose();
    };

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <>
            {
                Object.keys(moves).length > 1 ?
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
                    :
                    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="info" sx={{fontSize: 18}}>There are no alternatives for
                            this move!</Alert>
                    </Snackbar>
            }
        </>


    )
}