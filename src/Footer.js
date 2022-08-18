import {Container, IconButton, Link, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Typography from "@mui/material/Typography";

export default function Footer() {
    return (
        <footer>
            <Container sx={{bgcolor: "#efefd3", position: "fixed", bottom: 0}} maxWidth={false}>
                <Stack direction={"row"} spacing={5} alignItems={"center"} justifyContent={"center"} mt={5}>
                    <Link href="#" color="inherit" underline="hover">About</Link>
                    <Link href="#" color="inherit" underline="hover">Contact</Link>
                    <Link href="#" color="inherit" underline="hover">FAQ</Link>
                    <Link href="#" color="inherit" underline="hover">Donate</Link>
                </Stack>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 3
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
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 4}}>
                    <Typography fontSize={16}>
                        &copy; 2022 My Chess Repertoire. All rights reserved.
                    </Typography>
                </Box>

            </Container>
        </footer>
    );
}