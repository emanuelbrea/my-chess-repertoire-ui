import {Card, CardActionArea, CardMedia, Container, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './Footer';
import {Link} from 'react-router-dom';
import ImageModal from './ImageModal';

export default function About() {
  useEffect(() => {
    AOS.init();
  }, []);

  const [open, setOpen] = useState(false);
  const [imageSource, setImageSource] = useState('');
  const handleClose = () => setOpen(false);

  const handleOpenImagen = (source) =>{
    setImageSource(source);
    setOpen(true);
  };

  return (
    <>
      <Container maxWidth={'xl'} component={'main'} sx={{mt: 15}}>
        <Typography
          variant="h3"
          fontWeight={500}
        >
            Features
        </Typography>
        <Grid container spacing={4} mt={2} alignItems={'center'}>
          <Grid item xs={12} sm={12} md={3} lg={4}>
            <Typography
              variant="h5"
            >
              Select the repertoire that you want to create
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={8} >
            <Card sx={{border: '2px solid #769656'}} data-aos-delay="100" data-aos="fade-left" >
              <CardActionArea onClick={()=> handleOpenImagen('/feature1.webp')}>
                <CardMedia component="img" image='/feature1.webp'>
                </CardMedia>
              </CardActionArea>
            </Card>

          </Grid>
        </Grid>
        <Grid container spacing={4} mt={2} alignItems={'center'} >
          <Grid item xs={12} sm={12} md={9} lg={8}>
            <Card sx={{border: '2px solid #769656'}} data-aos-delay="100" data-aos="fade-up">
              <CardActionArea onClick={()=> handleOpenImagen('/feature2.webp')}>
                <CardMedia component="img" image='/feature2.webp'>
                </CardMedia>
              </CardActionArea>
            </Card>

          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={4}>
            <Typography
              variant="h5"
            >
              Complete your chess profile with your playing style
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4} mt={2} alignItems={'center'}>
          <Grid item xs={12} sm={12} md={3} lg={4}>
            <Typography
              variant="h5"
            >
              The repertoire will be generated automatically based on your profile. Click on it to view the lines.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={8} >
            <Card sx={{border: '2px solid #769656'}} data-aos-delay="100" data-aos="fade-left">
              <CardActionArea onClick={()=> handleOpenImagen('/feature3.webp')}>
                <CardMedia component="img" image='/feature3.webp'>
                </CardMedia>
              </CardActionArea>
            </Card>

          </Grid>
        </Grid>
        <Grid container spacing={4} mt={2} alignItems={'center'}>
          <Grid item xs={12} sm={12} md={9} lg={8}>
            <Card sx={{border: '2px solid #769656'}} data-aos-delay="100" data-aos="fade-right">
              <CardActionArea onClick={()=> handleOpenImagen('/feature4.webp')}>
                <CardMedia component="img" image='/feature4.webp'>
                </CardMedia>
              </CardActionArea>
            </Card>

          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={4}>
            <Typography
              variant="h6"
              mb={2}
            >
              In your repertoire you will find the suggested move with a short description of it.
            </Typography>
            <Typography
              variant="h6"
              mb={2}
            >
              You can read more on the wikibooks, or you can continue it on lichess.
            </Typography>
            <Typography
              variant="h6"
              mb={2}
            >
              On the right the move is displayed and highlighted so you can easily memorize it.
            </Typography>
            <Typography
              variant="h6"
            >
              At the bottom you will find a table with stats of the most popular moves in the position, like total amount of games or number of wins by color.
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4} mt={2} alignItems={'center'}>
          <Grid item xs={12} sm={12} md={3} lg={4}>
            <Typography
              variant="h5"
              mb={2}
            >
              If you like the move, you can mark is as favorite.
            </Typography>
            <Typography
              variant="h5"
            >
              Otherwise, you can replace it with the move that you like, clicking on the board or on the edit icon.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={8}>
            <Card sx={{border: '2px solid #769656'}} data-aos-delay="100" data-aos="fade-down-left">
              <CardActionArea onClick={()=> handleOpenImagen('/feature5.webp')}>
                <CardMedia component="img" image='/feature5.webp'>
                </CardMedia>
              </CardActionArea>
            </Card>

          </Grid>
        </Grid>
        <Grid container spacing={4} mt={2} alignItems={'center'}>
          <Grid item xs={12} sm={12} md={9} lg={8}>
            <Card sx={{border: '2px solid #769656'}} data-aos-delay="100" data-aos="fade-right">
              <CardActionArea onClick={()=> handleOpenImagen('/feature6.webp')}>
                <CardMedia component="img" image='/feature6.webp'>
                </CardMedia>
              </CardActionArea>
            </Card>

          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={4}>
            <Typography
              variant="h5"
              mb={2}
            >
              Next you can view the moves expected by your opponent, along with the stats table.
            </Typography>
            <Typography
              variant="h5"
            >
              Select the opponent move that you want to prepare for.
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4} mt={2} alignItems={'center'}>
          <Grid item xs={12} sm={12} md={3} lg={4}>
            <Typography
              variant="h5"
              mb={2}
            >
              Now you will get your suggested move for your opponent reply.
            </Typography>
            <Typography
              variant="h5"
              mb={2}
            >
              You can repeat the process until the end of the line.
            </Typography>
            <Typography
              variant="h5"
            >
              Feel free to edit the moves if necessary and pick your favorites lines.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={8}>
            <Card sx={{border: '2px solid #769656'}} data-aos-delay="100" data-aos="fade-left">
              <CardActionArea onClick={()=> handleOpenImagen('/feature7.webp')}>
                <CardMedia component="img" image='/feature7.webp'>
                </CardMedia>
              </CardActionArea>
            </Card>

          </Grid>
        </Grid>
        <Grid container spacing={4} mt={2} alignItems={'center'}>
          <Grid item xs={12} sm={12} md={9} lg={8}>
            <Card sx={{border: '2px solid #769656'}} data-aos-delay="100" data-aos="fade-right">
              <CardActionArea onClick={()=> handleOpenImagen('/feature8.webp')}>
                <CardMedia component="img" image='/feature8.webp'>
                </CardMedia>
              </CardActionArea>
            </Card>

          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={4}>
            <Typography
              variant="h6"
              mb={2}
            >
              When you reach the end of the variation, you can continue it and get more moves by clicking on the ‘Add more moves’ button, or you can return to the top and start studying another line of your repertoire.
            </Typography>
            <Typography
              variant="h5"
            >
              You can repeat the process with your black repertoire.
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4} mt={2} alignItems={'center'}>
          <Grid item xs={12} sm={12} md={3} lg={4}>
            <Typography
              variant="h5"
            >
              You can always customize your profile in the Profile section.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={8}>
            <Card sx={{border: '2px solid #769656'}} data-aos-delay="100" data-aos="flip-right">
              <CardActionArea onClick={()=> handleOpenImagen('/feature9.webp')}>
                <CardMedia component="img" image='/feature9.webp'>
                </CardMedia>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={4} mt={2} alignItems={'center'}>
          <Grid item xs={12} sm={12} md={9} lg={8}>
            <Card sx={{border: '2px solid #769656'}} data-aos-delay="100" data-aos="flip-left">
              <CardActionArea onClick={()=> handleOpenImagen('/feature10.webp')}>
                <CardMedia component="img" image='/feature10.webp'>
                </CardMedia>
              </CardActionArea>
            </Card>

          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={4}>
            <Typography
              variant="h5"
              mb={2}
            >
              For questions or feedback, you can send me a message in the Contact section.
            </Typography>
            <Typography
              variant="h5"
            >
              If you would like to contribute to the project and donate, you can do it{' '}
              <Link
                to="/login"
                style={{color: 'green'}}
              >
                <b>here</b>
              </Link>
              {' '}
               .Thank you.
            </Typography>
          </Grid>
        </Grid>
        <ImageModal open={open} handleClose={handleClose} image={imageSource}/>
      </Container>
      <Footer/>
    </>
  );
}
