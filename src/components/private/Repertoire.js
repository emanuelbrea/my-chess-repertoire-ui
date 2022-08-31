import * as React from 'react';
import {useState} from 'react';
import Line from "./Line";
import NavBarLogged from "./NavBarLogged";
import {useParams} from "react-router-dom";

export default function Repertoire() {
    const {color} = useParams();

    const [fens, setFens] = useState({
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1': {
            active: true,
            depth: 1
        }
    })
    const [currentDepth, setCurrentDepth] = useState(1)
    const initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

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
        setCurrentDepth(depth);
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
        for (let candidate of candidates) {
            if (!(candidate in fens)) {
                setFens((fens) => ({...fens, [candidate]: {active: false, depth: depth}}))
            }
        }
    }

    return (
        <React.Fragment>
            <NavBarLogged/>
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
