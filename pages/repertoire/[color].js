import * as React from 'react';
import {useRouter} from 'next/router'
import Line from "../../src/Line";
import {CircularProgress} from "@mui/material";
import {useState} from "react";

export default function Repertoire() {
    const router = useRouter()
    const {color} = router.query
    const initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    const [fens, setFens] = useState([initialFen])
    const [currentDepth, setCurrentDepth] = useState(1)


    function addVariant(move, depth) {
        let fenCopy = [...fens]
        fenCopy.length = depth
        if (move && depth) {
            fenCopy.splice(depth , 0, move.fen)
            setFens(fenCopy)
            setCurrentDepth(depth + 1);
        }
    }

    function removeMoves(depth) {
        fens.length = depth
        setFens(fens)
        setCurrentDepth(depth)
    }

    if (!router.isReady) return <CircularProgress/>

    return (
        <React.Fragment>
            {fens.map((fen, index) => (
                <Line fen={fen} color={color} addVariant={addVariant} key={index} currentDepth={currentDepth}
                      removeMoves={removeMoves}/>

            ))}
        </React.Fragment>


    );
}