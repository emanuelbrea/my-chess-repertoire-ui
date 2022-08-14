import {AppBar, Container, Stack, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function NavBar() {
    const pages = ['Home', 'About', 'Contact'];

    return (
        <AppBar position={"static"} color="transparent" elevation={0}>
            <Container sx={{mt: 3}}>
                <Toolbar sx={{justifyContent: "space-between"}}>
                    <Typography
                        variant="h6"
                    >
                        MY CHESS REPERTOIRE
                    </Typography>

                    <Stack direction="row" spacing={1} sx={{display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button sx={{textTransform: "none", fontSize: 18}} key={page}
                            >
                                {page}
                            </Button>
                        ))}
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Link href="/login" passHref>
                        <Button sx={{textTransform: "none", mr: 2, fontSize: 18}} size="large">
                            Log in
                        </Button>
                        </Link>
                        <Link href="/register" passHref>
                        <Button sx={{textTransform: "none", fontSize: 18}} variant="outlined" size="large">
                            Sign up
                        </Button>
                        </Link>
                    </Stack>

                </Toolbar>
            </Container>
        </AppBar>
    )
}