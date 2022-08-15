import {
    AppBar,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar
} from "@mui/material";
import Typography from "@mui/material/Typography";
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from "react";
import Box from "@mui/material/Box";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from "next/link";

export default function NavBarLogged() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <AppBar position={"static"} color="transparent" elevation={0}>
                <Toolbar sx={{mt: 2}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={() => setOpen(true)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <img src="/kingLogo.svg" height={50}/>
                    <Typography variant="h6" component="div">
                        My Chess Repertoire
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor={"left"}
                open={open}
                onClose={() => setOpen(false)}
            >

                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", m: 3}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={() => setOpen(false)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <img src="/kingLogo.svg" height={50}/>
                    <Typography variant="h6" component="div">
                        My Chess Repertoire
                    </Typography>
                </Box>
                <Divider/>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100vh",
                    ml: "5px"
                }}>
                    <List>
                        <ListItem key={"white"} disablePadding>
                            <ListItemButton href={'/repertoire/white'}>
                                <ListItemIcon>
                                    <img src="/rookW.svg" height={25}/>
                                </ListItemIcon>
                                <ListItemText primary={"White"}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={"black"} disablePadding>
                            <ListItemButton href={'/repertoire/black'}>
                                <ListItemIcon>
                                    <img src="/rookB.svg" height={25}/>
                                </ListItemIcon>
                                <ListItemText primary={"Black"}/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Box>
                        <Divider/>
                        <List>
                            <ListItem key={"profile"} disablePadding>
                                <Link href="/profile" passHref>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <PersonIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={"Profile"}/>
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                            <ListItem key={"settings"} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <SettingsIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={"Settings"}/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem key={"logout"} disablePadding>
                                <Link href="/" passHref>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <LogoutIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={"Log out"}/>
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        </List>
                    </Box>

                </Box>
            </Drawer>
        </>


    )
}