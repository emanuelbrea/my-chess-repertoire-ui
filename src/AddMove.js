import Grid from "@mui/material/Grid";
import {ReactSVG} from "react-svg";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";

const fens = [
    "http://localhost:5000/position/svg?fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR%20w%20KQkq%20-%200%201&move=d4",
    "http://localhost:5000/position/svg?fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR%20w%20KQkq%20-%200%201&move=Nf3",
    "http://localhost:5000/position/svg?fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR%20w%20KQkq%20-%200%201&move=c4",
]

export default function AddMove(props) {
    const {onClose, value: valueProp, open, ...other} = props;
    const [value, setValue] = useState(valueProp);

    useEffect(() => {
        if (!open) {
            setValue(valueProp);
        }
    }, [valueProp, open]);


    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onClose(value);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
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
                Pick move
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={5} justifyContent={"center"} paddingRight={2} paddingLeft={2}>
                    {fens.map((fen, index) => (
                        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                            <Card elevation={10}>
                                <CardActionArea>
                                    <CardMedia>
                                        <ReactSVG key={index} src={fen}></ReactSVG>
                                    </CardMedia>
                                    <CardContent>
                                        <Typography variant="h6" marginX={2}>
                                            1.d4
                                        </Typography>
                                        <Typography variant="h6" marginX={2}>
                                            Defensa Siciliana
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