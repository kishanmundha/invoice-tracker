import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  blue as primary,
  pink as secondary,
  red as error,
} from '@material-ui/core/colors';

import Root from './pages';

const theme = createMuiTheme({
  palette: {
    primary: primary,
    secondary: secondary,
    error: error,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: [
      'Google Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 14,
    useNextVariants: true,
  },
});

class App extends Component {
  componentDidMount() {
    const metas = document.head.getElementsByTagName('meta');

    for (let i = 0; i < metas.length; i++) {
      if (metas[i].name === 'theme-color') {
        metas[i].content = theme.palette.primary.main;
      }
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Root />
      </MuiThemeProvider>
    );
  }
}

export default App;
