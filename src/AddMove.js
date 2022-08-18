import Grid from "@mui/material/Grid";
import {ReactSVG} from "react-svg";
import Typography from "@mui/material/Typography";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import {Card, CardActionArea, CardContent, CardMedia, Container, IconButton, Skeleton} from "@mui/material";
import Alert, {getSvgUrl} from "./util.js";
import Snackbar from '@mui/material/Snackbar';
import Box from "@mui/material/Box";
import CloseIcon from '@mui/icons-material/Close';

export default function AddMove({onClose, open, moves, move, fen, depth, color}) {

    const handleOk = (move) => {
        onClose(move);
    };

    const handleClose = () => {
        onClose();
    };

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
                            <Box display="flex" alignItems="center">
                                <Box flexGrow={1} fontSize={24}>{'Pick a move to replace ' + depth + '.' + move.move}</Box>
                                <Box>
                                    <IconButton onClick={handleClose}>
                                        <CloseIcon/>
                                    </IconButton>
                                </Box>
                            </Box>
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
                                                    <ReactSVG
                                                        loading={() => <Skeleton animation="wave" variant="rectangular"
                                                                                 height={300}></Skeleton>}
                                                        key={index}
                                                        src={getSvgUrl(fen, move.move, color)}></ReactSVG>
                                                </CardMedia>
                                            </CardActionArea>
                                        </Card>
                                        <Container
                                            sx={{display:"flex", flexDirection:"column", alignItems:"center", m:1, mt:2}}>
                                            <Typography variant="h5">
                                                {depth}.{move.move}
                                            </Typography>
                                            <Typography variant="h5">
                                                {move?.name}
                                            </Typography>
                                        </Container>

                                    </Grid>
                                ))}
                            </Grid>
                        </DialogContent>
                    </Dialog>
                    :
                    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="info" sx={{width: '100%', fontSize: 16}}>There are no
                            alternatives for
                            this move!</Alert>
                    </Snackbar>
            }
        </>


    )
}