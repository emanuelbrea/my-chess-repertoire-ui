import * as React from 'react';
import {useRouter} from 'next/router'
import Line from "../../src/Line";
import {CircularProgress} from "@mui/material";
import {useState} from "react";

export default function Repertoire() {
    const router = useRouter()
    const {color} = router.query
    const initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    const [fens, setFens] = useState({1: initialFen})
    const [currentDepth, setCurrentDepth] = useState(1)


    function addVariant(move, depth) {
        if (move && depth) {
            if (depth + 1 in fens) {
                removeMoves(depth + 1)
            }
            setFens((fens) => ({...fens, [depth + 1]: move.fen}))
            setCurrentDepth(depth + 1);
        }

    }

    function removeMoves(depth) {
        for (let i in fens) {
            if (i > depth) {
                delete fens[i];
            }
        }
        setCurrentDepth(depth)
    }

    if (!router.isReady) return <CircularProgress/>

    return (
        <React.Fragment>
            {Object.values(fens).map((fen, index) => (
                <Line fen={fen} color={color} addVariant={addVariant} key={index} currentDepth={currentDepth}
                      removeMoves={removeMoves}/>

            ))}
        </React.Fragment>


    );
}