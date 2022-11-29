import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom";
import {
  createTheme,
  PaletteColorOptions,
  ThemeProvider,
} from '@mui/material/styles';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

declare module '@mui/material/styles' {
  interface Palette {
    dark: PaletteColorOptions;
  }
  interface PaletteOptions {
    dark: PaletteColorOptions;
  }
  
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    dark: true
  }
}
declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    dark: true
  }
}
const { palette } = createTheme();
const theme = createTheme({
  palette: {
    // Use this code if you want to use an arbitrary color
    dark: palette.augmentColor({
      color: {
        main: "#212121",
        contrastText:"#ffffff"
      }
    })
  }
});

root.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ThemeProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
