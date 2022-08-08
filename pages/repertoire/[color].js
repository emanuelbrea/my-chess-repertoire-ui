import * as React from 'react';
import {useState} from 'react';
import {useRouter} from 'next/router'
import Line from "../../src/Line";
import NavBar from "../../src/NavBar";

export default function Repertoire() {
    const router = useRouter()
    const {color} = router.query
    const initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    const [fens, setFens] = useState([initialFen])
    const [currentDepth, setCurrentDepth] = useState(1)

    function addVariant(move, depth) {
        if (move && depth !== undefined) {
            const index = fens.findIndex(element => element === move.fen);
            if (index !== -1) {
                depth = index
            }
            let fenCopy = [...fens]
            fenCopy.length = depth
            fenCopy.splice(depth, 0, move.fen)
            setFens(fenCopy)
            if (color === 'white') {
                setCurrentDepth(depth + 1);
            } else {
                setCurrentDepth(depth);
            }
        }
    }

    function removeMoves(depth) {
        if (color === 'white') {
            fens.length = depth
            setFens(fens)
            setCurrentDepth(depth)
        } else {
            setCurrentDepth(depth + 1)
            fens.length = depth + 1
            setFens(fens)
        }

    }

    if (!router.isReady) return null;

    return (
        <React.Fragment>
            <NavBar/>
            {fens.map((fen, index) => (
                <Line fen={fen} color={color} addVariant={addVariant} key={index} currentDepth={currentDepth}
                      removeMoves={removeMoves}/>

            ))}
        </React.Fragment>


    );
}