import {AppBar, ButtonGroup, Stack, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function NavBar() {
    return (
        <AppBar position={"sticky"}>
            <Toolbar sx={{justifyContent: "space-between"}}>
                <Stack direction={"row"} alignItems={"center"}>
                    <Typography variant="h6">
                        MY CHESS REPERTOIRE
                    </Typography>
                </Stack>
                <ButtonGroup variant="outlined" aria-label="text button group">
                    <Button href={'/repertoire/white'} color={"inherit"}>White</Button>
                    <Button href={'/repertoire/black'} color={"inherit"}>Black</Button>
                </ButtonGroup>

                <Stack direction={"row"} spacing={3}>
                    <Button color="inherit">Profile</Button>
                    <Button color="inherit" variant={"outlined"}>Logout</Button>
                </Stack>


            </Toolbar>
        </AppBar>
    )
}