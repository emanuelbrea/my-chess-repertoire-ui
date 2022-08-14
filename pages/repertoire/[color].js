import * as React from 'react';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router'
import Line from "../../src/Line";
import NavBar from "../../src/NavBar";

export default function Repertoire() {
    const router = useRouter()
    const {color} = router.query
    const [fens, setFens] = useState({})
    const [currentDepth, setCurrentDepth] = useState(1)
    const initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

    useEffect(() => {
        setFens((fens) => ({...fens, [initialFen]: {active: true, depth: 1}}))
    }, [])

    function addVariant(move, depth) {
        if (color === 'white') {
            depth = depth + 1
        }
        const fen = move['fen']
        for (let activeFen in fens) {
            if (activeFen !== fen && fens[activeFen]['depth'] >= depth && activeFen !== initialFen) {
                setFens((fens) => ({...fens, [activeFen]: {active: false, depth: fens[activeFen]['depth']}}))
            }
        }
        setFens((fens) => ({...fens, [fen]: {active: true, depth: depth}}))
        if (color === 'white') {
            setCurrentDepth(depth);
        } else {
            setCurrentDepth(depth);
        }
    }

    function removeMoves(depth) {
        for (let activeFen in fens) {
            if (fens[activeFen]['depth'] > depth) {
                delete fens[activeFen]
            }
        }
        if (color === 'black') {
            depth = depth + 1
        }
        setCurrentDepth(depth)

    }

    function addCandidates(candidates, depth) {
        if (color === 'white') {
            depth = depth + 1
        }
        for (let candidate of candidates) {
            if (!(candidate in fens)) {
                setFens((fens) => ({...fens, [candidate]: {active: false, depth: depth}}))
            }
        }
    }

    if (!router.isReady) return null;

    return (
        <React.Fragment>
            {Object.keys(fens).map((fen, index) => (
                <Line
                    fen={fen}
                    color={color}
                    addVariant={addVariant}
                    key={index}
                    currentDepth={currentDepth}
                    removeMoves={removeMoves}
                    active={fens[fen]['active'] === true}
                    addCandidates={addCandidates}
                />

            ))}
        </React.Fragment>


    );
}