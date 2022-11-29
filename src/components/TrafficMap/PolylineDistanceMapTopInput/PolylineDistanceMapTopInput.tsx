import React from 'react'
import { Box, Button, Stack, TextField } from '@mui/material';

const PolylineDistanceMapTopInput = ({distanceFieldError}:any) => {
  return (
    <Box id="polyline-distance-input" sx={{
      position: "absolute",
      top: "20px",
      zIndex: 1,
      left: "50%",
      transform: "translateX(-50%)",
      bgcolor: "white",
      padding: "10px 15px",
      borderRadius: "10px",
      display: "none"
    }}>
      <Stack direction="row" gap="5px">
        <TextField id="distance-input"
        onKeyDown={(e)=>{
          if(e.key==="."){
            e.preventDefault()
          }
            
        }}
        error={distanceFieldError} type="number"
          InputProps={{
            inputProps: {
              max: 30, min: 1
            }
          }}
          label="Distance in meters..."
          size='small' variant="outlined"
          sx={{width:"160px","& input":{fontSize:"14px"},"& .MuiFormLabel-root":{fontSize:"14px"}}}
        />
        <Button id="set-distance-btn" variant="contained" size="small">Set</Button>
      </Stack>
    </Box>
  )
}

export default PolylineDistanceMapTopInput