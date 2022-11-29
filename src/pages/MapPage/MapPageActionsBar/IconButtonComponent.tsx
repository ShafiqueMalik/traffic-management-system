import { IconButton } from '@mui/material'
import React from 'react'

type IconButtonComponentProps={
    icon?:any,
    onClick?:() => void;
}
const IconButtonComponent = ({icon,onClick}:IconButtonComponentProps) => {
    return (
        <IconButton color="inherit" sx={{ display: { xs: 'none', md: 'flex' } }} onClick={onClick}>
            {icon}
        </IconButton>
    )
}

export default IconButtonComponent