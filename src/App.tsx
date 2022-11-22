import TrafficMap from 'components/TrafficMap/TrafficMap';
import React, { useEffect } from 'react';
import { Grid, Typography } from "@mui/material"
import RightSidebar from 'components/RightSidebar/RightSidebar';
function App() {
  return (
    <div className="App">
      <Typography variant="h4">Traffic Map</Typography>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <TrafficMap />
        </Grid>
        <Grid item xs={3}>
         <RightSidebar/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
