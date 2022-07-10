import * as React from 'react';
import {useRouter} from 'next/router'
import Line from "../../src/Line";
import {CircularProgress} from "@mui/material";

export default function Repertoire() {
    const router = useRouter()
    const {color} = router.query
    let fens = ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2', 'rnbqkbnr/pp2pppp/3p4/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3']

    if (!router.isReady) return <CircularProgress/>
    return (
        <React.Fragment>
            {fens.map((fen, index) => (
                <Line fen={fen} color={color} key={index}/>

            ))}
        </React.Fragment>


    );
}