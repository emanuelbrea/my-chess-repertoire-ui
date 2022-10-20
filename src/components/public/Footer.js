import {Container, IconButton, Stack, Link} from '@mui/material';
import Box from '@mui/material/Box';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Typography from '@mui/material/Typography';
import React from 'react';
import {Link as LinkRouter} from 'react-router-dom';
import {ReactComponent as LichessLogo} from '../../assets/lichesslogo.svg';
import {ReactComponent as ChessComLogo} from '../../assets/chesscom.svg';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mychessrepertoire.com/">
                My Chess Repertoire
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box component="footer" sx={{pb: 2, mt: 'auto', px: 2, pt: 5}}>
      <Container>
        <Stack direction={'row'} spacing={5} alignItems={'center'} justifyContent={'center'} mt={5}>
          <LinkRouter to='/about' style={{textDecoration: 'none', color: 'white'}}>About</LinkRouter>
          <LinkRouter to="/contact" style={{textDecoration: 'none', color: 'white'}}>Contact</LinkRouter>
          <LinkRouter to="/faq" style={{textDecoration: 'none', color: 'white'}}>FAQ</LinkRouter>
          <Link target="_blank" href="https://github.com/sponsors/emanuelbrea" sx={{textDecoration: 'none', color: 'white'}}>Sponsor</Link>
        </Stack>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 3,
        }}>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="github"
            sx={{mr: 2}}
            href={'https://github.com/emanuelbrea/'}
            target={'_blank'}
          >
            <GitHubIcon/>
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="lichess"
            sx={{mr: 2}}
            href={'https://lichess.org/@/ema_brea'}
            target={'_blank'}
          >
            <Box width={24} height={24} display={'flex'} color={'#769656'}>
              <LichessLogo fill={'#769656'} stroke={'#769656'}/>
            </Box>
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="lichess"
            sx={{mr: 2}}
            href={'https://www.chess.com/member/emanuelbrea'}
            target={'_blank'}
          >
            <Box width={24} height={24} display={'flex'} color={'#769656'}>
              <ChessComLogo/>
            </Box>
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="linkedin"
            sx={{mr: 2}}
            href={'https://www.linkedin.com/in/emanuel-brea/'}
            target={'_blank'}
          >
            <LinkedInIcon/>
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="gmail"
            sx={{mr: 2}}
            href={'mailto:brea.emanuel@gmail.com'}
            target={'_blank'}
          >
            <MailOutlineIcon/>
          </IconButton>

        </Box>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 4}}>
          <Copyright/>
        </Box>

      </Container>
    </Box>
  );
}
