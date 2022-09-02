import {Container, IconButton, Link, Stack} from '@mui/material';
import Box from '@mui/material/Box';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Typography from '@mui/material/Typography';
import React from 'react';

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
    <Box component="footer" sx={{py: 2, mt: 'auto', px: 2}}>
      <Container>
        <Stack direction={'row'} spacing={5} alignItems={'center'} justifyContent={'center'} mt={5}>
          <Link href="#" color="inherit" underline="hover">About</Link>
          <Link href="#" color="inherit" underline="hover">Contact</Link>
          <Link href="#" color="inherit" underline="hover">FAQ</Link>
          <Link href="#" color="inherit" underline="hover">Donate</Link>
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
            color="inherit"
            aria-label="github"
            sx={{mr: 2}}
          >
            <GitHubIcon/>
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="linkedin"
            sx={{mr: 2}}
          >
            <LinkedInIcon/>
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="gmail"
            sx={{mr: 2}}
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
