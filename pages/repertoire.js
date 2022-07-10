import * as React from 'react';
import MyMove from "../src/MyMove";
import RivalMoves from "../src/RivalMoves";
import {Divider} from "@mui/material";

export default function Repertoire({data}) {

    return (
        <React.Fragment>
            <MyMove move={data['my_move']} stats={data['my_moves']} position={data['position']} depth={data['depth']}/>
            <Divider />
            {/*<RivalMoves moves={data['rival_moves']}/>*/}
            {/*<Divider />*/}
        </React.Fragment>

    );
}

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:5000/repertoire?fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`)
    const response = await res.json()
    const data = response['data'];

    // Pass data to the page via props
    return { props: { data } }
}