import * as React from 'react';
import RivalMoves from "../src/RivalMoves";
import {CircularProgress, Divider} from "@mui/material";
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function BlackRepertoire({addVariant}) {
    const {data, error} = useSWR('http://127.0.0.1:5000/repertoire/black', fetcher)


    if (!data) return (<CircularProgress/>)

    return (
        <React.Fragment>
            <RivalMoves moves={data['data']['rival_moves']} fen={data['data']['position']['fen']}
                        depth={0} addVariant={addVariant} color={false}/>
            <Divider/>
        </React.Fragment>

    );
}
