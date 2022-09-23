import {AppBar, Avatar, Container, IconButton, Menu, MenuItem, Stack, Toolbar} from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {Auth} from 'aws-amplify';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import {ReactComponent as ReactLogo} from '../../assets/logo.svg';
import {ReactComponent as MenuLogo} from '../../assets/logoMenu.svg';

export default function NavBar() {
  const [user, setUser] = useState(null);
  const settings = ['Profile', 'Logout'];
  const pages = ['Repertoires', 'About', 'Contact'];
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const {pathname} = useLocation();

  useEffect(() => {
    async function getUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUser(user);
      } catch (error) {
      }
    }

    getUser();
  }, []);

  const handleSettings = (setting) => {
    if (setting === 'Profile') {
      navigate('/profile');
    } else if (setting === 'Logout') {
      Auth.signOut().then(() => {
        setUser(null);
        navigate('/');
      },
      ).catch((err) => console.log(err));
    }
  };

  const settingIcon = (setting) => {
    if (setting === 'Profile') {
      return (<PersonIcon/>);
    }
    if (setting === 'Logout') {
      return (<LogoutIcon/>);
    }
  };

  const getNameInitials = () => {
    let initials = '';
    if (user && user.attributes) {
      if (user.attributes.given_name) {
        initials += user.attributes.given_name.charAt(0).toUpperCase();
      }
      if (user.attributes.family_name) {
        initials += user.attributes.family_name.charAt(0).toUpperCase();
      }
    }
    if (initials) {
      return initials;
    }
    return 'NN';
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleMenu = (page) => {
    if (page === 'Repertoires') {
      navigate('/repertoires');
    }
    if (page === 'About') {
      navigate('/about');
    }
    if (page === 'Contact') {
      navigate('/contact');
    }
  };

  const linkHighlight = {
    textDecoration: 'underline #769656',
    textDecorationThickness: '3px',
    textUnderlineOffset: '10px',
    backgroundColor: 'transparent',
  };


  return (
    <>
      <AppBar position={'fixed'} color="primary" elevation={1} >
        <Container sx={{mt: 1, mb: 1, px: {xs: 0, sm: 3, md: 3, lg: 3, xl: 3}}}>
          <Toolbar sx={{justifyContent: 'space-between'}} disableGutters>


            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon/>
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: {xs: 'block', md: 'none'},
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Button variant={'text'} onClick={() => handleMenu(page)}
                      sx={{
                        ':hover': linkHighlight,
                        'fontSize': 18,
                        'color': 'white',
                        'textTransform': 'none',
                      }}
                    >
                      {page}
                    </Button>
                  </MenuItem>
                ))}
              </Menu>
              <Link to="/" style={{textDecoration: 'none'}}>
                <Box sx={{display: {xs: 'flex', md: 'none'}, ml: 1, height: 70, width: 250}} >
                  <MenuLogo/>
                </Box>
              </Link>
            </Box>

            <Link to="/" style={{textDecoration: 'none'}}>
              <Box sx={{display: {xs: 'none', md: 'flex'}, height: 70, width: 250}}>
                <ReactLogo/>
              </Box>
            </Link>


            <Stack direction="row" spacing={2} sx={{display: {xs: 'none', md: 'flex'}}}>
              <Link to="/" style={pathname === '/' ? linkHighlight : {textDecoration: 'none'}}>
                <Button variant={'text'}
                  sx={{
                    ':hover': linkHighlight,
                    'fontSize': 18,
                    'color': 'white',
                    'textTransform': 'none',
                  }}
                >
                  Home
                </Button>
              </Link>
              <Link to="/about" style={pathname === '/about' ? linkHighlight : {textDecoration: 'none'}}>
                <Button variant={'text'}
                  sx={{
                    ':hover': linkHighlight,
                    'fontSize': 18,
                    'color': 'white',
                    'textTransform': 'none',
                  }}
                >
                  About
                </Button>
              </Link>
              <Link to="/contact" style={pathname === '/contact' ? linkHighlight : {textDecoration: 'none'}}>
                <Button variant={'text'}
                  sx={{
                    ':hover': linkHighlight,
                    'fontSize': 18,
                    'color': 'white',
                    'textTransform': 'none',
                  }}
                >
                  Contact
                </Button>
              </Link>

            </Stack>
            {user && <>
              <Box sx={{mr: 1, display: {xs: 'none', sm: 'flex', md: 'flex'}}}>
                <Link to="/repertoires" style={pathname === '/repertoires' ? linkHighlight : {textDecoration: 'none'}}>
                  <Button variant={'text'}
                    sx={{
                      ':hover': linkHighlight,
                      'fontSize': 18,
                      'color': 'white',
                      'textTransform': 'none',
                    }}
                  >
                    Repertoires
                  </Button>
                </Link>
              </Box>
            </>}

            {
              !user && <Stack direction="row" spacing={1}>
                <Link to="/login" style={{textDecoration: 'none'}}>
                  <Button sx={{
                    ':hover': linkHighlight,
                    'textTransform': 'none', 'mr': 2, 'fontSize': 20, 'color': 'white',
                  }} size="large">
                    Log in
                  </Button>
                </Link>
                <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                  <Link to="/register" style={{textDecoration: 'none'}}>
                    <Button sx={{
                      ':hover': {
                        border: '2px solid #769656',
                      },
                      'textTransform': 'none', 'fontSize': 20, 'color': 'white', 'border': '2px solid #769656',
                    }} variant="outlined" size="large">
                    Sign up
                    </Button>
                  </Link>
                </Box>
              </Stack>
            }

            {user && <Box sx={{flexGrow: 0}}>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{p: 0, mr: 1}}>
                <Avatar sx={{bgcolor: '#769656'}}>
                  {getNameInitials()}
                </Avatar>
              </IconButton>
              <Menu open={open} onClose={() => setAnchorEl(null)} anchorEl={anchorEl}>
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => {
                    setAnchorEl(null);
                    handleSettings(setting);
                  } }>
                    {settingIcon(setting)}
                    <Button variant={'text'}
                      sx={{
                        ':hover': linkHighlight,
                        'fontSize': 18,
                        'color': 'white',
                        'textTransform': 'none',
                      }}
                    >
                      {setting}
                    </Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>}


          </Toolbar>
        </Container>
      </AppBar>
      <Outlet/>
    </>
  );
}
