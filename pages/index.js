import * as React from 'react';
import NavBar from "../src/NavBar";
import MyMove from "../src/MyMove";
import RivalMoves from "../src/RivalMoves";

export default function Index() {
    return (
        <React.Fragment>
            <NavBar/>
            <MyMove/>
            <RivalMoves/>
        </React.Fragment>


    );
}