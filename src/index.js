import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from './store';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import {
  createMuiTheme,
  CssBaseline,
} from '@material-ui/core';
import {
  ThemeProvider,
} from '@material-ui/styles';
import {
  red,
} from '@material-ui/core/colors';

import App from './components/App';
import Notifier from './components/misc/Notifier';

const getTheme = () => {
  const defaultTheme = createMuiTheme();

  return createMuiTheme({
    palette: {
      type: 'dark',
      secondary: red,
    },
    drawer: {
      width: 240,
    },
    appBar: {
      maxHeight: 64,
    },
    paper: {
      marginBottom: defaultTheme.spacing(2),
      padding: defaultTheme.spacing(2),
    },
    paperHeading: {
      marginBottom: defaultTheme.spacing(2),
  },
  });
};

const store = configureStore();

ReactDOM.render(
  <Provider store={ store }>
      <ThemeProvider theme={ getTheme() }>
          <SnackbarProvider maxSnack={ 3 }>
              <CssBaseline />
              <App />
          <Notifier/>
          </SnackbarProvider>
      </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
