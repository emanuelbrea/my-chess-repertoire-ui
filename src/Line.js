import * as React from 'react';
import {useEffect, useState} from 'react';
import MyMove from "../src/MyMove";
import RivalMoves from "../src/RivalMoves";
import {CircularProgress, Divider} from "@mui/material";
import ScrollToTop from "react-scroll-to-top";
import AddLine from "./AddLine";

export default function Line({fen, color, addVariant, currentDepth, removeMoves}) {
    const [data, setData] = useState(null);
    const [endOfLine, setEndOfLine] = useState(false);


    useEffect(() => {
        getRepertoireMoves()
    }, [fen])

    const getRepertoireMoves = async () => {
        const requestOptions = {
            method: 'GET',
        };
        const moves = await fetch('http://127.0.0.1:5000/repertoire/?' + new URLSearchParams({
            fen: fen,
            color: color
        }), requestOptions)
            .then(res => res.json())

        setData(moves)
    }

    const updateMove = async (move) => {
        removeMoves(data['data']['depth'])
        const requestOptions = {
            method: 'PUT',
        };
        const moves = await fetch('http://127.0.0.1:5000/repertoire/?' + new URLSearchParams({
            fen: fen,
            color: color,
            move: move
        }), requestOptions)
            .then(res => res.json())

        setData(moves)
    }

    const addRepertoireMoves = async () => {

        const requestOptions = {
            method: 'PATCH',
        };
        const moves = await fetch('http://127.0.0.1:5000/repertoire/?' + new URLSearchParams({
            fen: fen,
            color: color
        }), requestOptions)
            .then(res => res.json())

        setEndOfLine(true)
        setData(moves)
    }


    if (!data) return (<CircularProgress/>)
    if (data['success'] === false) {
        return (
            <AddLine addRepertoireMoves={addRepertoireMoves} endOfLine={endOfLine}></AddLine>
        )
    }

    return (
        <React.Fragment>
            {Object.keys(data['data']['my_move']).length > 0 ?
                <>
                    <MyMove move={data['data']['my_move']}
                            stats={data['data']['my_moves']}
                            position={data['data']['position']}
                            depth={data['data']['depth']}
                            color={color}
                            currentDepth={currentDepth}
                            updateMove={updateMove}/>
                    <Divider/>
                </>
                : null
            }
            <RivalMoves moves={data['data']['rival_moves']}
                        fen={Object.keys(data['data']['my_move']).length > 0 ? data['data']['my_move']['fen'] : fen}
                        depth={color === 'white' ||
                        Object.keys(data['data']['my_move']).length === 0
                            ? data['data']['depth']
                            : data['data']['depth'] + 1}
                        addVariant={addVariant}
                        color={color}/>
            <Divider/>
            <ScrollToTop smooth/>
        </React.Fragment>

    );
}
