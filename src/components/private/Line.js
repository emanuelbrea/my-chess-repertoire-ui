import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import MyMove from "./MyMove";
import RivalMoves from "./RivalMoves";
import {Divider} from "@mui/material";
import AddLine from "./AddLine";
import Snackbar from "@mui/material/Snackbar";
import Alert from "../public/Util";
import {useNavigate} from "react-router-dom";
import Loading from "../public/Loading";


export default function Line({fen, color, addVariant, currentDepth, removeMoves, active, addCandidates}) {
    const [data, setData] = useState(null);
    const [endOfLine, setEndOfLine] = useState(false);
    const fieldRef1 = useRef(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (color !== 'white' && color !== 'black') {
            return navigate("/")
        }
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


    useEffect(() => {
        if (data && data['success'] === true && currentDepth && active) {
            if (currentDepth === 1 && fieldRef1.current && color === 'white') {
                fieldRef1.current.scrollIntoView({
                    behavior: "smooth",
                    block: 'center'
                });
            } else if (currentDepth === data['data']['depth'] && fieldRef1.current) {
                fieldRef1.current.scrollIntoView({
                    behavior: "smooth",
                    block: 'start'
                });
            }
        }
    },)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    function getCandidates(moves) {
        if (moves && active && Object.keys(moves['data']).length > 0) {
            const rivalMoves = moves['data']['rival_moves']
            let candidates = []
            for (let rivalMove of rivalMoves) {
                candidates.push(rivalMove['fen'])
            }
            if (Object.keys(moves['data']['my_move']).length === 0) {
                addCandidates(candidates, 1)
            } else {
                addCandidates(candidates, moves['data']['depth'] + 1)
            }
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
        setData(null)
        const requestOptions = {
            method: 'PUT',
        };
        const moves = await fetch('/api/repertoire/?' + new URLSearchParams({
            fen: fen,
            color: color,
            move: move
        }), requestOptions)
            .then(res => res.json())
        removeMoves(data['data']['depth'])
        setData(moves)
        setOpen(true)
        getCandidates(moves)
    }

    const addRepertoireMoves = async () => {
        setData(null)
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
        return (<Loading/>)

    }

    if (data['success'] === false) {

        return (
            <Snackbar open={true}>
                <Alert severity="error" sx={{width: '100%', fontSize: 16}}>
                    There was an error displaying the website.
                </Alert>
            </Snackbar>
        )
    }

    if (active && Object.keys(data['data']).length === 0) {
        return (
            <AddLine addRepertoireMoves={addRepertoireMoves} endOfLine={endOfLine}></AddLine>
        )
    }

    return (
        <>
            {active === true && Object.keys(data['data']['my_move']).length > 0 &&
                <>
                    <div ref={fieldRef1}/>
                    <MyMove move={data['data']['my_move']}
                            stats={data['data']['my_moves']}
                            position={data['data']['position']}
                            depth={data['data']['depth']}
                            color={color}
                            currentDepth={currentDepth}
                            updateMove={updateMove}
                    />
                    <Divider/>
                    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{width: '100%', fontSize: 16}}>
                            Repertoire updated correctly!
                        </Alert>
                    </Snackbar>
                </>
            }
            {active === true &&
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
                </>
            }
        </>

    );
}
