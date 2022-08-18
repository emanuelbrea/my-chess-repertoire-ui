import NavBar from "./NavBar";
import * as React from "react";
import Footer from "./Footer";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from "next/image";


export default function LandingPage() {
    return (
        <>
            <section style={{backgroundImage: "url(../backgroundLanding1.jpg)", height: "100vh"}}>
                <NavBar/>
                <Grid container spacing={5} justifyContent={"center"} paddingRight={2} paddingLeft={2} paddingTop={10}

                >
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h1" fontWeight={500}>
                            All your openings.
                        </Typography>
                        <Typography variant="h1" fontWeight={500}>
                            One place.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Image src="/landing7.jpg" alt="me" width="1400" height="1000" />
                    </Grid>
                </Grid>
            </section>
            <Footer/>
        </>
    );
}