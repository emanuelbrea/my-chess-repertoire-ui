import {AppBar, Container, Stack, Toolbar} from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import Box from "@mui/material/Box";

export default function NavBar() {
    const pages = ['Home', 'About', 'Contact'];

    return (
        <AppBar position={"static"} color="transparent" elevation={0}>
            <Container sx={{mt: 3}}>
                <Toolbar sx={{justifyContent: "space-between"}}>
                    <Box
                        component="a"
                        href="/">
                        <img src="/logo.svg" height={80}/>
                    </Box>


                    <Stack direction="row" spacing={1} sx={{display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button variant={"text"}
                                    sx={{
                                        ':hover': {
                                            textDecoration: "underline #769656",
                                            textDecorationThickness: "3px",
                                            textUnderlineOffset: "10px",
                                            backgroundColor: "transparent"
                                        },
                                        fontSize: 18,
                                        color: "black",
                                        textTransform: "none"
                                    }} key={page}
                            >
                                {page}
                            </Button>
                        ))}
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Link href="/login" passHref>
                            <Button sx={{
                                ':hover': {
                                    textDecoration: "underline #769656",
                                    textDecorationThickness: "3px",
                                    textUnderlineOffset: "10px",
                                    backgroundColor: "transparent"
                                },
                                textTransform: "none", mr: 2, fontSize: 18, color: "black"
                            }} size="large">
                                Log in
                            </Button>
                        </Link>
                        <Link href="/register" passHref>
                            <Button sx={{
                                ':hover': {
                                    border: "2px solid #769656"
                                },
                                textTransform: "none", fontSize: 18, color: "black", border: "2px solid #769656"
                            }} variant="outlined" size="large">
                                Sign up
                            </Button>
                        </Link>
                    </Stack>

                </Toolbar>
            </Container>
        </AppBar>
    )
}