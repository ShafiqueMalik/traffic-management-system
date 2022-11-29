import React from 'react'
import { FormControl, Box,InputLabel, InputAdornment, OutlinedInput, Stack, TextField } from '@mui/material';

const ColorInputField = ({color, setColor,text}:any) => {
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value);
    }
    const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value)
    }
    return (
        <Stack>
        <Box sx={{fontSize:"12px"}}>{text}</Box>
        <FormControl>
            {/* <InputLabel id="line-color"
            sx={{color:"#ffffff"}}
            >Age</InputLabel> */}
            <OutlinedInput
                id="outlined-adornment-color"
                placeholder="#123456"
                value={color}
                onChange={handleColorInputChange}
                // label="Line Color"
                sx={{
                    p: "5px",
                    pr: 0,
                    width: "95px",
                    "& .MuiInputBase-inputAdornedEnd": {
                        p: "0",
                    },
                    bgcolor: "white",
                    overflow: "hidden",
                    fontSize:"12px"
                }}
                endAdornment={
                    <InputAdornment position="end"
                        sx={{ ml: 0 }}
                    >
                        <Box component="input" type="color"
                            onChange={handleColorChange}
                            value={color}
                            sx={{
                                width: "40px",
                                p: "0",
                                height: "33px",
                                border: 0,
                                bgcolor:"#cccccc",
                            }}
                        />
                    </InputAdornment>
                }
            />
        </FormControl>
        </Stack>
    )
}

export default ColorInputField