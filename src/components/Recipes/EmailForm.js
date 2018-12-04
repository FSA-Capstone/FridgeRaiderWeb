import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { EmailIcon } from 'react-share';
import { sendIt } from './utils'

export default class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      targetEmail: '',
      emailSubject: 'I raided my fridge!',
      emailText: `I found this great recipe on Fridge Raider! Check it out:\n https://fridge-raider-capstone.herokuapp.com/#/recipes/${props.recipeId}`
    };
    this.handleModalChange = this.handleModalChange.bind(this);
  }

  handleModalChange(event) {
    this.setState({
      targetEmail: event.target.value
    });
  }

  handleModalClickOpen = () => {
    this.setState({ open: true });
  };

  handleModalClose = () => {
    this.setState({ open: false });
  };

  handleModalSend = () => {
    sendIt(this.state)
    this.setState({
      open: false,
      targetEmail: ''
    });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleModalClickOpen} variant="contained"><EmailIcon size={32} round={true} /></Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleModalClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Share Your Raid With A Friend!</DialogTitle>
          <DialogContent>
            <TextField
              label="Email"
              type="email"
              name="targetEmail"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              fullWidth
              onChange={this.handleModalChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleModalClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleModalSend} color="primary">
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}