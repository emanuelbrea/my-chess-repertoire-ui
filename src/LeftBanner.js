import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import Grid from "@mui/material/Grid";


export default function LeftBanner() {

    return(
        <Grid
            item
            xs={false}
            sm={4}
            md={6}
            lg={6}
            xl={6}
            sx={{
                backgroundImage: 'url(../chess-bg1.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '0% 5% 5% 0%',
                boxShadow: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'

            }}
        >
            <Box
                sx={{
                    maxWidth: 800,
                }}
            >
                <Typography gutterBottom variant="h3" component="div" fontWeight={500}>
                    Your chess repertoire in one place
                </Typography>
                <Typography sx={{mb: 50}}>
                    Easily manage your openings
                </Typography>
            </Box>


        </Grid>
    );
}