import TrafficMap from 'components/TrafficMap/TrafficMap';

import { Container, Grid, Typography, Box, Stack, Toolbar, AppBar, CssBaseline } from "@mui/material"
import RightSidebar from 'components/RightSidebar/RightSidebar';
import MapPageActionsBar from './MapPageActionsBar/MapPageActionsBar';
import MapPageRightSidebar from './MapPageRightSidebar/MapPageRightSidebar';
import MapRightSidebarVerticalTabs from './MapPageRightSidebar/MapRightSidebarVerticalTabs';

const drawerWidth = 60;


const MapPage = () => {
    return (
        <Box sx={{mt:"50px"}}>
            {/* <AppBar
                position="fixed"
                color="dark"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, 
                ml: `${drawerWidth}px`, height: "50px", mt: `${50}px` }}
            >
                <Toolbar sx={{ minHeight: "50px !important", }}>
                    <Typography variant="h6" noWrap component="div">
                        Map Page
                    </Typography>
                </Toolbar>
            </AppBar> */}
            <MapPageActionsBar/>
            <Grid container>
                <Grid item xs>
                    <TrafficMap />
                    {/* <TrafficMapTest /> */}
                </Grid>
                <Grid item sx={{width:"350px"}} pl="0!important">
                    <MapPageRightSidebar/>
                    {/* <MapRightSidebarVerticalTabs/> */}
                    <RightSidebar />
                </Grid>
            </Grid>
        </Box>
    )
}

export default MapPage