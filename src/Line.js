import * as React from 'react';
import MyMove from "../src/MyMove";
import RivalMoves from "../src/RivalMoves";
import {CircularProgress, Divider, Fab} from "@mui/material";
import useSWR from 'swr'
import {getRepertoireUrl} from "./util";
import ScrollToTop from "react-scroll-to-top";

const fetcher = (...args) => fetch(...args).then((res) => res.json())


export default function Line({fen, color}) {
    const {data, error} = useSWR(getRepertoireUrl(fen, color), fetcher)


    if (!data) return (<CircularProgress/>)
    return (
        <React.Fragment>
            <MyMove move={data['data']['my_move']} stats={data['data']['my_moves']} position={data['data']['position']}
                    depth={data['data']['depth']}/>
            <Divider/>
            <RivalMoves moves={data['data']['rival_moves']} position={data['data']['my_move']}
                        depth={data['data']['depth']}/>
            <Divider/>
            <ScrollToTop smooth />
        </React.Fragment>

    );
}
