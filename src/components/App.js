import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import {
  withStyles,
} from '@material-ui/core';
import {
  retrieveCurrentUser,
} from '../actions/user';

import DashboardSection from './sections/DashboardSection';
import LoadingIndicator from './misc/LoadingIndicator';
import Navigation from './misc/Navigation';
import ShopSection from './sections/ShopSection';

const styles = theme => ({
  content: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.drawer.width,
    },
    marginTop: theme.appBar.maxHeight,
    padding: theme.spacing(3),
  },
});

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const App = props => {
  useEffect(() => {
    if (!props.currentUser) {
      props.dispatch(retrieveCurrentUser());
    }
  }, [props.currentUser]);

  if(!props.currentUser) {
    return <LoadingIndicator/>;
  }

  return (
    <Router>
        <Navigation/>
          <main className={ props.classes.content }>
            <Switch>
              <Redirect exact from='/' to='/dashboard'/>
              <Route exact path='/dashboard' component={ DashboardSection } />
              <Route exact path='/shop' component={ ShopSection } />
            </Switch>
          </main>
    </Router>
  );
}

export default connect(mapStateToProps)(withStyles(styles)(App));
