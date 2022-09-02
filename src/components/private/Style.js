import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MergeIcon from '@mui/icons-material/Merge';
import FortIcon from '@mui/icons-material/Fort';
import {Stack} from '@mui/material';
import {mdiSwordCross} from '@mdi/js';
import Icon from '@mdi/react';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PropTypes from 'prop-types';


export default function StyleGrid({aggressive, fashion, popular, handleChange}) {
  const marks = [
    {
      value: 0,
    },
  ];

  return (
    <Box sx={{flexGrow: 1}}>
      <Grid container spacing={1}>
        <Grid container item spacing={3}>
          <Grid item xs={4}>
            <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center" justifyContent={'space-between'} display={'flex'}>
              <Typography>
                                Solid
              </Typography>
              <FortIcon sx={{fontSize: 30}}/>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Slider
              aria-label="Aggressive"
              value={aggressive}
              onChange={handleChange}
              min={-1}
              max={1}
              defaultValue={0}
              step={0.01}
              marks={marks}
              name={'risk'}
            />
          </Grid>
          <Grid item xs={4}>
            <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center" justifyContent={'space-between'} display={'flex'}>
              <Icon path={mdiSwordCross}
                title="Aggressive"
                size={1.2}
              />
              <Typography>
                                Aggressive
              </Typography>
            </Stack>
          </Grid>
        </Grid>


        <Grid container item spacing={3}>
          <Grid item xs={4}>
            <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center" justifyContent={'space-between'} display={'flex'}>
              <Typography>
                                Side Lines
              </Typography>
              <CallSplitIcon sx={{fontSize: 40}}/>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Slider
              aria-label="Popular"
              value={popular}
              onChange={handleChange}
              min={-1}
              max={1}
              defaultValue={0}
              step={0.01}
              marks={marks}
              name={'popularity'}
            />
          </Grid>
          <Grid item xs={4}>
            <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center" justifyContent={'space-between'} display={'flex'}>
              <MergeIcon sx={{fontSize: 40}}/>
              <Typography>
                                Main lines
              </Typography>

            </Stack>
          </Grid>
        </Grid>


        <Grid container item spacing={3}>
          <Grid item xs={4}>
            <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center" justifyContent={'space-between'} display={'flex'}>
              <Typography>
                                Classical
              </Typography>
              <MenuBookIcon sx={{fontSize: 30}}/>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Slider
              aria-label="Fashion"
              value={fashion}
              onChange={handleChange}
              min={-1}
              max={1}
              defaultValue={0}
              step={0.01}
              marks={marks}
              name={'fashion'}
            />
          </Grid>
          <Grid item xs={4}>
            <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center" justifyContent={'space-between'} display={'flex'}>
              <DesktopMacIcon sx={{fontSize: 30}}/>
              <Typography>
                                Popular
              </Typography>

            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

StyleGrid.propTypes = {
  aggressive: PropTypes.number,
  fashion: PropTypes.number,
  popular: PropTypes.number,
  handleChange: PropTypes.func,
};
