import React from 'react'
import { Box } from "@mui/material";


type UserLevelBoxProps = {
    level:number
}
const UserLevelBox = ({level}:UserLevelBoxProps) => {
    const handleClick = () => {
        alert("User Level Clicked")
    }
    return (
        <Box role="button" onClick={handleClick} sx={{
            width: "100%",
            height: "10px",
            bgcolor: "#FFC001",
            cursor:"pointer"
        }} />
    )
}

export default UserLevelBox