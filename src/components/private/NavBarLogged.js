import {
    AppBar,
    Divider,
    Drawer,
    IconButton, Link,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from "react";
import Box from "@mui/material/Box";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

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
                    <Box
                        marginTop={1}
                        component="a"
                        href="/">
                        <img src="/logo.svg" height={70}/>
                    </Box>
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
                    <Box>
                        <img src="/logo.svg" height={70}/>
                    </Box>

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
                                    <img src="/rookW.svg" height={35}/>
                                </ListItemIcon>
                                <ListItemText primary={"White"}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={"black"} disablePadding>
                            <ListItemButton href={'/repertoire/black'}>
                                <ListItemIcon>
                                    <img src="/rookB.svg" height={35}/>
                                </ListItemIcon>
                                <ListItemText primary={"Black"}/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Box>
                        <Divider/>
                        <List>
                            <ListItem key={"profile"} disablePadding>
                                <Link href="/profile" underline={"none"}>
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
                                <Link href="/" underline={"none"}>
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