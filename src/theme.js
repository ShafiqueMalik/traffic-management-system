import {
    Button,
    Box,
    AppBar,
    Toolbar,
    Typography,
    Checkbox,
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
    Stack
  } from "@mui/material";
  import { dark, primary, white ,icon, black} from "./colors";
  import { ThemeProvider, createTheme } from "@mui/material/styles";
  
  const theme = createTheme({
    palette: {
      primary: {
        main: primary[500],
        dark: primary[700]
      },
      secondary: {
        main: dark[500],
        dark:dark[700],
        contrastText:white[500],
      },    
      bluee:{
        main:"#1976d2",
        light:"#42a5f5",
        dark:"#1565c0",
        contrastText:white[500]
      },
      icon:{
        main: icon[500],
        dark:icon[700],
      }
    }
  });
  export default theme;