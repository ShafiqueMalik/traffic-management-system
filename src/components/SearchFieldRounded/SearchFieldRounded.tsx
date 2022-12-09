import React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import { Box, FormControl } from '@mui/material';

type SearchFieldRoundedProps = {
    type?:string,
    placeholder?:string
}
const SearchFieldRounded = ({type="text",placeholder}:SearchFieldRoundedProps) => {
    return (
        <Box sx={{width:"100%"}}>
            <Box component="input" type={type}
            placeholder={placeholder}
                sx={{
                    bgcolor: "#4F4F4F", outline: "none",
                    borderRadius: 100,
                    p: "8px 16px",
                    color: "#b9b9b9",
                    width:"100%",
                    border: "1px solid transparent",
                    "&:focus": { border: "1px solid #636363" }
                }}
            />
        </Box>
    )
}

export default SearchFieldRounded