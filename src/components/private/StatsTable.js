import {Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';
import PropTypes from 'prop-types';

export default function StatsTable({stats, active, handleChange}) {
  const handleClick = (move) => {
    if (handleChange) {
      handleChange(move);
    }
  };


  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 400}} aria-label={'position-stats'} size={'small'}>
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
              sx={{border: active === row.move && '2px solid green'}}
              onClick={()=> handleClick(row)}
            >
              <TableCell component={'th'} scope={'row'}>
                {row.move}
              </TableCell>
              <TableCell align={'center'}>
                {(row.played).toLocaleString('en-US')}
              </TableCell>
              <TableCell align={'center'}>
                {(row.frequency * 100).toFixed(2)}
              </TableCell>
              <TableCell align={'center'}>
                {row.average_elo}
              </TableCell>
              <TableCell align={'center'}>
                {row.year}
              </TableCell>
              <TableCell align={'center'}>
                {(row.winning_rate * 100).toFixed(2)}
              </TableCell>
              <TableCell align="center" sx={{minWidth: 250}}>
                <Stack direction={'row'}>
                  <Box sx={{
                    flex: Math.round(row.white_wins * 100),
                    backgroundColor: 'rgb(255,255,255)',
                    borderRadius: '3px 0  0 3px',
                  }}><Typography color={'#111111'}>{Math.round(row.white_wins * 100)}%</Typography></Box>
                  <Box
                    sx={{flex: Math.round(row.draws * 100), backgroundColor: '#777574'}}><Typography
                      sx={{color: 'white'}}>{Math.round(row.draws * 100)}%</Typography></Box>
                  <Box sx={{
                    flex: Math.round(row.black_wins * 100),
                    backgroundColor: '#403d39',
                    borderRadius: '0 3px 3px 0',
                  }}><Typography
                      sx={{color: 'white'}}>{Math.round(row.black_wins * 100)}%</Typography></Box>
                </Stack>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>

    </TableContainer>
  );
}

StatsTable.propTypes = {
  stats: PropTypes.array,
  active: PropTypes.string,
  handleChange: PropTypes.func,
};
