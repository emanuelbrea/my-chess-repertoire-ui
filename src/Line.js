import * as React from 'react';
import {useEffect, useState} from 'react';
import MyMove from "../src/MyMove";
import RivalMoves from "../src/RivalMoves";
import {Alert, Backdrop, CircularProgress, Divider} from "@mui/material";
import ScrollToTop from "react-scroll-to-top";
import AddLine from "./AddLine";
import {mdiChessKing} from '@mdi/js';
import Icon from "@mdi/react";
import Box from "@mui/material/Box";

export default function Line({fen, color, addVariant, currentDepth, removeMoves, active, addCandidates}) {
    const [data, setData] = useState(null);
    const [endOfLine, setEndOfLine] = useState(false);


    useEffect(() => {
        getRepertoireMoves().then(data => {
            setData(data);
            if (data['success'] === true) {
                getCandidates(data)
            }
        })
    }, [fen])

    useEffect(() => {
        getCandidates(data)
    }, [active])


    function getCandidates(moves) {
        if (moves && active && Object.keys(moves['data']).length > 0) {
            const rivalMoves = moves['data']['rival_moves']
            let candidates = []
            for (let rivalMove of rivalMoves) {
                candidates.push(rivalMove['fen'])
            }
            addCandidates(candidates, moves['data']['depth'])
        }
    }


    const getRepertoireMoves = async () => {
        const requestOptions = {
            method: 'GET',
        };
        const moves = await fetch('/api/repertoire/?' + new URLSearchParams({
            fen: fen,
            color: color
        }), requestOptions)
            .then(res => res.json())
            .catch((error) => {
                return {'success': false}
            })
        return moves
    }

    const updateMove = async (move) => {
        removeMoves(data['data']['depth'])
        const requestOptions = {
            method: 'PUT',
        };
        const moves = await fetch('/api/repertoire/?' + new URLSearchParams({
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
        const moves = await fetch('/api/repertoire/?' + new URLSearchParams({
            fen: fen,
            color: color
        }), requestOptions)
            .then(res => res.json())

        setEndOfLine(true)
        setData(moves)
    }

    if (!active) {
        return null;
    }

    if (!data) {
        return (
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={true}
            >
                <Box sx={{position: 'relative', display: 'inline-flex'}}>
                    <CircularProgress color="inherit" size={68}/>
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Icon path={mdiChessKing}
                              title="Aggressive"
                              size={2.2}
                        />
                    </Box>
                </Box>

            </Backdrop>


        )

    }

    if (data['success'] === false) {

        return (<Alert severity="error">There was an error accessing the data.</Alert>)
    }

    if (active && Object.keys(data['data']).length === 0) {
        return (
            <AddLine addRepertoireMoves={addRepertoireMoves} endOfLine={endOfLine}></AddLine>
        )
    }

    return (
        <>
            {active === true && Object.keys(data['data']['my_move']).length > 0 ?
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
            {active === true ?
                <>
                    <RivalMoves moves={data['data']['rival_moves']}
                                fen={Object.keys(data['data']['my_move']).length > 0 ? data['data']['my_move']['fen'] : fen}
                                depth={color === 'white' ||
                                Object.keys(data['data']['my_move']).length === 0
                                    ? data['data']['depth']
                                    : data['data']['depth'] + 1}
                                addVariant={addVariant}
                                color={color}
                    />
                    <Divider/>
                    <ScrollToTop smooth/>
                </>
                : null
            }
        </>

    );
}
