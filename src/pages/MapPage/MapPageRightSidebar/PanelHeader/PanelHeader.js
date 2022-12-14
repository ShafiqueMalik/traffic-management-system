import React from 'react'
import { Typography } from "@mui/material";

const PanelHeader = ({text}) => {
    return (
        <Typography variant="h6" fontSize="14px">
            {text}
        </Typography>
    )
}

export default PanelHeader