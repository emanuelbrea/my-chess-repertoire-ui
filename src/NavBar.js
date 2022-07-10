import {AppBar, ButtonGroup, Stack, Toolbar} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function NavBar() {
    return (
        <AppBar position={"sticky"}>
            <Toolbar sx={{justifyContent: "space-between"}}>
                <Stack direction={"row"} alignItems={"center"}>
                    <IconButton
                        size={"large"}
                        edge={"start"}
                        color={"inherit"}
                        aria-label={"menu"}
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>

                    </IconButton>


                    <Typography variant="h6">
                        MY CHESS REPERTOIRE
                    </Typography>
                </Stack>
                <ButtonGroup variant="outlined" aria-label="text button group">
                    <Button color={"inherit"}>White</Button>
                    <Button color={"inherit"}>Black</Button>
                </ButtonGroup>

                <Stack direction={"row"} spacing={3}>
                    <Button color="inherit">Profile</Button>
                    <Button color="inherit" variant={"outlined"}>Logout</Button>
                </Stack>


            </Toolbar>
        </AppBar>
    )
}