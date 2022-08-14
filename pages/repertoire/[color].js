import * as React from 'react';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router'
import Line from "../../src/Line";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {Fab} from "@mui/material";

export default function Repertoire() {
    const router = useRouter()
    const {color} = router.query
    const [fens, setFens] = useState({})
    const [currentDepth, setCurrentDepth] = useState(1)
    const [level, setLevel] = useState(1)
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
        setCurrentDepth(depth)
        if (color === 'white') {
            setLevel(depth * 2 - 1)
        } else if (color === 'black') {
            setLevel(depth * 2)
        }

    }

    function removeMoves(depth) {
        if (color === 'black') {
            depth += 1
        }
        for (let activeFen in fens) {
            if (fens[activeFen]['depth'] >= depth) {
                delete fens[activeFen]
            }
        }
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

    function moveUp() {
        if (level - 1 > 0) {
            setLevel(level - 1)
        }
    }

    function moveDown() {
        if (color === 'white') {
            if (level + 1 <= currentDepth * 2) {
                setLevel(level + 1)
            }
        } else if (color === 'black') {
            if (level + 1 < (currentDepth + 1) * 2) {
                setLevel(level + 1)
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
                    currentDepth={level}
                    removeMoves={removeMoves}
                    active={fens[fen]['active'] === true}
                    addCandidates={addCandidates}
                />

            ))}
            <Fab color="primary" sx={{position: "fixed", bottom: 40, right: 110}} onClick={moveUp}>
                <KeyboardArrowUpIcon/>
            </Fab>
            <Fab color="primary" sx={{position: "fixed", bottom: 40, right: 40}} onClick={moveDown}>
                <KeyboardArrowDownIcon/>
            </Fab>
        </React.Fragment>


    );
}