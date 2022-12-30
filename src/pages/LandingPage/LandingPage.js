import React from 'react'
import { Box } from "@mui/material";
import icons from "assets/icons";
import { bannerBg } from "assets/images";

const LandingPage = () => {
    return (
        <Box>
            <Box className="banner-section"
                sx={{
                    minHeight: "calc(100vh)",
                    backgroundImage: `url(${bannerBg})`,
                    backgroundSize: "cover",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center"
                }}>
                <Box component="img" src={icons.logoYellow} alt="connector logo" 
                sx={{ width: 250, height: 65 }} />

            </Box>
        </Box>
    )
}

export default LandingPage