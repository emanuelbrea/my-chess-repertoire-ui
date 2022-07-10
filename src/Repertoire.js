import * as React from 'react';
import MyMove from "../src/MyMove";
import RivalMoves from "../src/RivalMoves";
import {Divider} from "@mui/material";

export default function Repertoire() {
    return (
        <React.Fragment>
            <MyMove/>
            <Divider />
            <RivalMoves/>
            <Divider />
        </React.Fragment>

    );
}