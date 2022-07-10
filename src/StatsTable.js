import {Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function createData(move, games, frequency, elo, year) {
    return { move, games, frequency, elo, year };
}

const rows = [
    createData('e4', 159, 6.0, 24, 4.0),
    createData('d4', 237, 9.0, 37, 4.3),
    createData('Nf3', 262, 16.0, 24, 6.0),
    createData('c4', 305, 3.7, 67, 4.3),
];

export default function StatsTable(){
    return(
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label={"position-stats"} size={"small"}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Move
                        </TableCell>
                        <TableCell>
                            Games
                        </TableCell>
                        <TableCell>
                            Frequency (%)
                        </TableCell>
                        <TableCell>
                            Average Elo
                        </TableCell>
                        <TableCell>
                            Average Year
                        </TableCell>
                        <TableCell>
                            White Wins / Draws / Black Wins
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.move}
                        >
                            <TableCell component={'th'} scope={'row'}>
                                {row.move}
                            </TableCell>
                            <TableCell >
                                {row.games}
                            </TableCell>
                            <TableCell >
                                {row.frequency}
                            </TableCell>
                            <TableCell >
                                {row.elo}
                            </TableCell>
                            <TableCell>
                                {row.year}
                            </TableCell>
                            <TableCell align="center">
                                <Stack direction={"row"}>
                                    <Box sx={{flex:20, backgroundColor:"#bababa2b", borderRadius:'3px 0  0 3px'}}><Typography >20%</Typography></Box>
                                    <Box sx={{flex:30, backgroundColor:"#777574"}}><Typography sx={{color:"white"}}>30%</Typography></Box>
                                    <Box sx={{flex:50, backgroundColor:"#403d39", borderRadius:'0 3px 3px 0'}}><Typography sx={{color:"white"}}>50%</Typography></Box>
                                </Stack>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </TableContainer>
    )
}