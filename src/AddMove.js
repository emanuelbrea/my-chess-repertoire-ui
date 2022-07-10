import Grid from "@mui/material/Grid";
import {ReactSVG} from "react-svg";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";

export default function AddMove(props) {
    const {onClose, value: valueProp, open, moves, move, rival, fen, depth, ...other} = props;
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

    const getSvgUrl = (fen, move) =>{
        return 'http://localhost:5000/position/svg?fen=' + fen + '&move=' + move
    }

    return (
        <Dialog
            open={open}
            maxWidth="xl"
            fullWidth={true}
            onClose={handleClose}
        >
            <DialogTitle>
                {rival ? 'Add move' : 'Pick move to replace ' + depth + '.' + move.move }
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={5} justifyContent={"center"} paddingRight={2} paddingLeft={2}>
                    {moves.map((move, index) => (
                        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                            <Card elevation={10}>
                                <CardActionArea>
                                    <CardMedia>
                                        <ReactSVG key={index} src={getSvgUrl(fen, move.move)}></ReactSVG>
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