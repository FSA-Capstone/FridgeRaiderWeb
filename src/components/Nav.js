import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppBar, Toolbar, IconButton, Button, Badge, InputBase, Menu, MenuItem } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { logout } from '../store'

class Nav extends Component {

  constructor() {
    super()
    this.state = {
      anchorEl: null
    }
    this.handleProfileMenu = this.handleProfileMenu.bind(this)
    this.handleProfileMenuClose = this.handleProfileMenuClose.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleProfileMenu(event) {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleProfileMenuClose() {
    this.setState({ anchorEl: null })
  }

  handleLogout() {
    this.props.logout()
    this.handleProfileMenuClose()
    this.props.resetOrders()
    this.props.history.push('/')
  }

  render() {
    const { authenticatedUser } = this.props
    const { anchorEl } = this.state
    const { handleProfileMenu, handleProfileMenuClose, handleLogout } = this
    const isOpen = Boolean(anchorEl)
    
    const loggedInUserSettings = () => {
      return (
        <Fragment>
          <IconButton onClick={ handleProfileMenu } aria-owns={isOpen ? 'profile-menu' : null} aria-haspopup="true">
            <AccountCircleIcon />
          </IconButton>
          <Menu id="profile-menu" anchorEl={anchorEl} open={isOpen} onClick={handleProfileMenuClose} >
            <MenuItem to={'/myrecipes'} component={Link} onClick={handleProfileMenuClose} >My Recipes</MenuItem>
            <MenuItem to={'/myaccount'} component={Link} onClick={handleProfileMenuClose} >My Account</MenuItem>
            <MenuItem onClick={handleLogout} >Logout</MenuItem>
          </Menu>
        </Fragment>
      )
    }

    return (
      <Fragment>
        <AppBar position="static" style={{backgroundColor: "white"}} >
          <Toolbar> 
          <div style={{display: "flex", flexGrow: 1, margin: "20px"}}>  
            <Link to="/">
              <img src="/dist/logo.png" /> 
            </Link>   
          </div>        
          { 
            !authenticatedUser.id 
                ?  <Button to="/login" component= {Link}>Login</Button> 
                : loggedInUserSettings()
          } 
          </Toolbar>
        </AppBar>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ authenticatedUser }) => {
  return {
    authenticatedUser
  }
}

const mapDispatchToProps = (dispatch ) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
