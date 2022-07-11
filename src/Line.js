import * as React from 'react';
import MyMove from "../src/MyMove";
import RivalMoves from "../src/RivalMoves";
import {CircularProgress, Divider, Fab} from "@mui/material";
import useSWR from 'swr'
import {getRepertoireUrl} from "./util";
import ScrollToTop from "react-scroll-to-top";
import Typography from "@mui/material/Typography";

const fetcher = (...args) => fetch(...args).then((res) => res.json())


export default function Line({fen, color, addVariant, currentDepth}) {
    const {data, error} = useSWR(getRepertoireUrl(fen, color), fetcher)


    if (!data) return (<CircularProgress/>)
    if(data['success'] === false){
        return (<Typography variant="h3" marginX={2}>
            No more lines
        </Typography>)
    }
    return (
        <React.Fragment>
            <MyMove move={data['data']['my_move']} stats={data['data']['my_moves']} position={data['data']['position']}
                    depth={data['data']['depth']} currentDepth={currentDepth}/>
            <Divider/>
            <RivalMoves moves={data['data']['rival_moves']} position={data['data']['my_move']}
                        depth={data['data']['depth']} addVariant={addVariant}/>
            <Divider/>
            <ScrollToTop smooth />
        </React.Fragment>

    );
}
