import { Autocomplete } from '@react-google-maps/api'
import React from 'react'
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

let autocomplete:any = null;
const AutocompleteRoundedField = ({map}:any) => {
    const onAutocompleteLoad = (ac:any) => {
        autocomplete = ac
    }
    const handlePlaceChanged = () => {
        console.log(autocomplete?.getPlace());
        let location = autocomplete?.getPlace()?.geometry?.location;
        map.setCenter(location)
        // map.panTo(location)
    }
    return (
        <Autocomplete
            onLoad={onAutocompleteLoad}
            onPlaceChanged={handlePlaceChanged}
        >
            <FormControl  variant="outlined">
                <OutlinedInput
                    id="outlined-adornment-location"
                    type="text"
                    size='small'
                    sx={{ bgcolor: "white", borderRadius: "150px" }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="search location"
                                edge="end"
                            >
                                <TravelExploreIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>

        </Autocomplete>
    )
}

export default AutocompleteRoundedField