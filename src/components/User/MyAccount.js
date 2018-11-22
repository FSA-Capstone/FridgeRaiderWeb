import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, TextField, Typography, Paper } from '@material-ui/core';
/* TO DO (when DB is ready)
import { updateUser } from '../store';
*/

class MyAccount extends Component {
  constructor() {
    super();
    this.state = {
        name: '',
        email: '',
        userName: '',
        password: '',
        status: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setUser(user) {
    this.setState(
      {
        name: user.name ? user.name : '',
        userName: user.userName ? user.userName : '',
        password: user.password ? user.password : '',
        email: user.email ? user.email : '',
      });
  }

  componentDidMount() {
    const { user } = this.props;
    if (!user) {
      return null;
    }
    this.setUser(user);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setUser(this.props.user);
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, email, userName, password } = this.state;
    /* TO DO (when DB is ready)
    this.props.updateUser({ name, email, userName, password })
      .then(() => this.setState({ status: 'Account Updated!' }))
      .catch(error => this.setState({ status: `Error: ${error.message}` }))
    */
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const { name, email, userName, password, status } = this.state;

    return (
      <Grid container justify="center">
        <Grid item xs>
          <div style={{ marginTop: 25, marginBottom: 25, height: '80vh' }}>
            <Grid container justify="center">
              <Grid item>
                <Paper elevation={1}>
                  <form
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '30vw',
                      padding: '5vh 5vw 5vh 5vw',
                    }}
                  >
                    <Typography variant="title" style={styles.element}>
                      My Account
                    </Typography>

                    <TextField
                      required
                      id="name"
                      label="Name"
                      variant="outlined"
                      style={styles.element}
                      value={name}
                      onChange={handleChange('name')}
                    />

                    <TextField
                      required
                      id="userName"
                      label="Username"
                      variant="outlined"
                      style={styles.element}
                      value={userName}
                      onChange={handleChange('userName')}
                    />

                    <TextField
                      required
                      id="password"
                      label="Password"
                      variant="outlined"
                      style={styles.element}
                      value={password}
                      type="password"
                      onChange={handleChange('password')}
                    />

                    <TextField
                      required
                      id="email"
                      label="Email"
                      variant="outlined"
                      style={styles.element}
                      value={email}
                      onChange={handleChange('email')}
                    />

                    <Button
                      variant="contained"
                      style={{ width: '10vw', height: '6vh', margin: 10 }}
                      onClick={handleSubmit}
                      disabled={
                        !name ||
                        !userName ||
                        !password ||
                        !email
                      }
                    >
                      Update
                    </Button>

                    { status ? <Typography variant="subheading" >{status}</Typography> : '' }

                  </form>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    );
  }
}

const styles = {
  element: { margin: 10 },
};

const mapStateToProps = ({ authenticatedUser }) => {
  return {
    user: authenticatedUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    /*TO DO (when DB is ready)
    updateUser: (user) => dispatch(updateUser(user)),
    */
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
