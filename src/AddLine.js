import {forwardRef, useEffect, useRef, useState} from "react";
import Box from "@mui/material/Box";
import {Alert, Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";


export default function AddLine({addRepertoireMoves, endOfLine}) {
    const fieldRef = useRef(null);
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (fieldRef.current) {
            fieldRef.current.scrollIntoView({
                behavior: "smooth",
                block: 'end'
            });
        }
    })

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <>
            {endOfLine === true ?
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="info">No more moves in this line!</Alert>
                </Snackbar> :
                <Box sx={{display: 'flex', justifyContent: 'center', margin: 4}} ref={fieldRef}>
                    <Fab color="primary" aria-label="add" variant={"extended"} onClick={addRepertoireMoves}>
                        <AddIcon/>
                        Add more moves
                    </Fab>
                </Box>
            }
        </>
    )
}