import * as React from 'react';
import Footer from './Footer';
import Typography from '@mui/material/Typography';
import {Card, CardContent, CardMedia, Container} from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import YoutubeVideo from './YoutubeVideo';

export default function LandingPage() {
  return (
    <>
      <Container component="main"
        maxWidth={'lg'} sx={{mt: 20}}>
        <Typography variant="h2" >
                                All your openings.
        </Typography>
        <Typography variant="h2" color={'primary'}>
                                One place.
        </Typography>
        <Typography variant="body1" fontSize={20} mt={3}>
                                Get a generated repertoire for your playing style.
        </Typography>
        <Box>
          <Typography variant="h4" mt={10}>
                                    Features
          </Typography>
        </Box>


        <Grid container spacing={4} mt={2}>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <Card elevation={10} sx={{
              ':hover': {
                boxShadow: 20,
              },
              'display': 'flex',
              'height': '100%',
              'flexDirection': 'column',
            }}>
              <CardMedia sx={{display: 'flex', justifyContent: 'center'}}>
                <AutoFixHighIcon sx={{color: '#769656', mt: 5, fontSize: 50}}/>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                                            Auto generated repertoire
                </Typography>
                <Typography variant="body1" color="text.secondary">
                                            You will get your chess opening repertoire based on your playing style
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <Card elevation={10} sx={{
              ':hover': {
                boxShadow: 20,
              },
              'display': 'flex',
              'height': '100%',
              'flexDirection': 'column',
            }}
            >
              <CardMedia sx={{display: 'flex', justifyContent: 'center'}}>
                <QueryStatsIcon sx={{color: '#769656', mt: 5, fontSize: 50}}/>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                                            Openings statistics and plans
                </Typography>
                <Typography variant="body1" color="text.secondary">
                                            Get insights of each position
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <Card elevation={10} sx={{
              ':hover': {
                boxShadow: 20,
              },
              'display': 'flex',
              'height': '100%',
              'flexDirection': 'column',
            }}>
              <CardMedia sx={{display: 'flex', justifyContent: 'center'}}>
                <PlaylistAddIcon sx={{color: '#769656', mt: 5, fontSize: 50}}/>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                                            Add your favorite lines
                </Typography>
                <Typography variant="body2" color="text.secondary">
                                            You can always add your own moves to customize your repertoire
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box mt={5} display={'flex'} justifyContent={'center'}>
          <YoutubeVideo/>
        </Box>
      </Container>
      <Footer/>

    </>
  );
}
