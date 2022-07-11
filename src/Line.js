import * as React from 'react';
import {useEffect, useState} from 'react';
import MyMove from "../src/MyMove";
import RivalMoves from "../src/RivalMoves";
import {CircularProgress, Divider} from "@mui/material";
import ScrollToTop from "react-scroll-to-top";
import Typography from "@mui/material/Typography";

export default function Line({fen, color, addVariant, currentDepth, removeMoves}) {
    const [data, setData] = useState(null);

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


    if (!data) return (<CircularProgress/>)
    if (data['success'] === false) {
        return (<Typography variant="h3" marginX={2}>
            No more lines
        </Typography>)
    }
    return (
        <React.Fragment>
            <MyMove move={data['data']['my_move']} stats={data['data']['my_moves']} position={data['data']['position']}
                    depth={data['data']['depth']} currentDepth={currentDepth} updateMove={updateMove}/>
            <Divider/>
            <RivalMoves moves={data['data']['rival_moves']} position={data['data']['my_move']}
                        depth={data['data']['depth']} addVariant={addVariant}/>
            <Divider/>
            <ScrollToTop smooth/>
        </React.Fragment>

    );
}
