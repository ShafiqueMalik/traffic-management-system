import React from 'react'
import {Box} from "@mui/material";
const ShadowBox = ({sx,children}) => {
  return (
    <Box  sx={{ boxShadow: 2, borderRadius: "10px",...sx }}>
        {children}
    </Box>
  )
}

export default ShadowBox