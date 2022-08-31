import Box from "@mui/material/Box";
import {Backdrop, CircularProgress} from "@mui/material";
import Icon from "@mdi/react";
import {mdiChessKing} from "@mdi/js";


export default function Loading() {
    return (
        <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={true}
        >
            <Box sx={{position: 'relative', display: 'inline-flex'}}>
                <CircularProgress color="inherit" size={68}/>
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Icon path={mdiChessKing}
                          title="Loading"
                          size={2.2}
                    />
                </Box>
            </Box>

        </Backdrop>)
}