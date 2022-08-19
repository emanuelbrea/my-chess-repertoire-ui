import MuiAlert from "@mui/material/Alert";
import {forwardRef} from "react";

export function getSvgUrl(fen, move, color) {
    return '/api/position/svg?fen=' + encodeURIComponent(fen) + '&move=' + encodeURIComponent(move) + '&color=' + color;
}

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default Alert;