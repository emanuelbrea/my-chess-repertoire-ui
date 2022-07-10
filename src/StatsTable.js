import {Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function StatsTable({stats}){
    console.log(stats)
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
                            White winning rate (%)
                        </TableCell>
                        <TableCell>
                            White Wins / Draws / Black Wins
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stats.map((row) => (
                        <TableRow
                            key={row.move}
                        >
                            <TableCell component={'th'} scope={'row'}>
                                {row.move}
                            </TableCell>
                            <TableCell align={"center"}>
                                {(row.played).toLocaleString("en-US")}
                            </TableCell>
                            <TableCell align={"center"}>
                                {(row.frequency * 100).toFixed(2)}
                            </TableCell>
                            <TableCell align={"center"}>
                                {row.average_elo}
                            </TableCell>
                            <TableCell align={"center"}>
                                {row.year}
                            </TableCell>
                            <TableCell align={"center"}>
                                {(row.winning_rate * 100).toFixed(2)}
                            </TableCell>
                            <TableCell align="center">
                                <Stack direction={"row"}>
                                    <Box sx={{flex:Math.round(row.white_wins / row.played * 100), backgroundColor:"#bababa2b", borderRadius:'3px 0  0 3px'}}><Typography >{Math.round(row.white_wins / row.played * 100)}%</Typography></Box>
                                    <Box sx={{flex:Math.round(row.draws / row.played * 100), backgroundColor:"#777574"}}><Typography sx={{color:"white"}}>{Math.round(row.draws / row.played * 100)}%</Typography></Box>
                                    <Box sx={{flex:Math.round(row.black_wins / row.played * 100), backgroundColor:"#403d39", borderRadius:'0 3px 3px 0'}}><Typography sx={{color:"white"}}>{Math.round(row.black_wins / row.played * 100)}%</Typography></Box>
                                </Stack>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </TableContainer>
    )
}