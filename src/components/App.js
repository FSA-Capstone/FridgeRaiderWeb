import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Nav from './Nav';
import Login from './User/Login';
import RegisterUser from './User/RegisterUser';
import RegistrationSuccessful from './User/RegistrationSuccessful';
import Home from './Home';
import Recipes from './Recipes/Recipes';
import RecipeDetails from './Recipes/RecipeDetails';
import MyAccount from './User/MyAccount';
import MyRecipes from './User/MyRecipes';
import {
  getCategories,
  getIngredients,
  exchangeTokenForAuth,
  checkForLoggedInGoogleUser,
  logout
} from '../store';
import { getCuisines } from '../reducers/cuisine';

class App extends Component {
  componentDidMount() {
    const { init } = this.props;
    init();
    this.props.getCategories();
    this.props.exchangeTokenForAuth();
    this.props.getIngredients();
  }

  render() {
    return (
      <Router>
        <Fragment>
          <CssBaseline />
          <Route path="/" render={({ history, location }) => <Nav history={history} location={location} />} />
          <Switch>
            <Route
              path="/login"
              render={({ history }) => <Login history={history} />}
            />
            <Route path="/register" component={RegisterUser} />
            <Route path="/registerSuccess" component={RegistrationSuccessful} />
            <Route
              path="/recipes/:id"
              render={({ match }) => <RecipeDetails id={match.params.id} />}
            />
            <Route
              path="/recipes"
              render={({ history }) => <Recipes history={history} />}
            />
            <Route exact path="/" component={Home} />
            <Route exact path="/myaccount" component={MyAccount} />
            <Route exact path="/myrecipes" component={MyRecipes} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

const styles = {
  '@global': {
    body: {
      backgroundColor: 'white'
    }
  }
};

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(getCuisines());
    },
    exchangeTokenForAuth: () => dispatch(exchangeTokenForAuth()),
    logout: () => dispatch(logout()),
    getCategories: () => dispatch(getCategories()),
    getIngredients: () => dispatch(getIngredients())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(App));
