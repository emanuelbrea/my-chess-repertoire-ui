import {useEffect, useRef} from "react";
import Box from "@mui/material/Box";
import {Alert, Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";


export default function AddLine({addRepertoireMoves, endOfLine}){
    const fieldRef = useRef(null);
    useEffect(()=>{
        if (fieldRef.current) {
            fieldRef.current.scrollIntoView({
                behavior: "smooth",
                block: 'end'
            });
        }
    })

    return (
        <>
            {endOfLine === true ?
                <Alert severity="info">No more moves in this line!</Alert> :
            <Box sx={{display: 'flex', justifyContent: 'center', margin: 4}} ref={fieldRef}>
                <Fab color="primary" aria-label="add" variant={"extended"} onClick={addRepertoireMoves} >
                    <AddIcon />
                    Add more moves
                </Fab>
            </Box>
            }
        </>
    )
}