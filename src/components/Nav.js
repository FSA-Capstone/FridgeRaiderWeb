import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Badge,
  InputBase,
  Menu,
  MenuItem
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { logout } from '../store.js';
import { auth } from './User/FirebaseComponent.js';
import { checkForLoggedInGoogleUser } from '../store';

const styles = {
  largeIcon: {
    width: 60,
    height: 60
  }
};

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
    this.handleProfileMenu = this.handleProfileMenu.bind(this);
    this.handleProfileMenuClose = this.handleProfileMenuClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props
          .checkForLoggedInGoogleUser(user)
          .then(() => this.props.history.push('/'));
      }
    });
  }

  handleProfileMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleProfileMenuClose() {
    this.setState({ anchorEl: null });
  }

  handleLogout() {
    this.props.logout();
    this.handleProfileMenuClose();
    this.props.history.push('/');
  }

  render() {
    const { authenticatedUser } = this.props;
    const { anchorEl } = this.state;
    const { handleProfileMenu, handleProfileMenuClose, handleLogout } = this;
    const isOpen = Boolean(anchorEl);

    const loggedInUserSettings = () => {
      return (
        <Fragment>
          <IconButton
            onClick={handleProfileMenu}
            aria-owns={isOpen ? 'profile-menu' : null}
            aria-haspopup="true"
          >
            <AccountCircleIcon className="svg_icons" />
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={isOpen}
            onClick={handleProfileMenuClose}
          >
            <MenuItem
              to={'/myrecipes'}
              component={Link}
              onClick={handleProfileMenuClose}
            >
              My Recipes
            </MenuItem>
            <MenuItem
              to={'/myaccount'}
              component={Link}
              onClick={handleProfileMenuClose}
            >
              My Account
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Fragment>
      );
    };

    return (
      <Fragment>
        <AppBar
          position="static"
          style={{
            backgroundColor: 'white',
            zIndex: 5,
            position: 'relative',
            maxHeight: '100px'
          }}
        >
          <Toolbar>
            <div style={{ display: 'flex', flexGrow: 1, margin: '20px' }}>
              <Link to="/">
                <img src="/dist/logo.png" style={{ height: '80%' }} />
              </Link>
            </div>
            {!authenticatedUser.id ? (
              <Button to="/login" component={Link}>
                Login
              </Button>
            ) : (
              loggedInUserSettings()
            )}
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    checkForLoggedInGoogleUser: user =>
      dispatch(checkForLoggedInGoogleUser(user))
  };
};

const mapStateToProps = ({ authenticatedUser }) => {
  return {
    authenticatedUser
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
