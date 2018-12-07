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
  constructor({ userName, recipe }) {
    super({ userName, recipe });
    this.state = {
      open: false,
      targetEmail: '',
      recipientName: '',
      emailFromName: !userName ? '' : `${userName}`,
      emailRecipeName: `${recipe.name}`,
      emailImg: `${recipe.imageUrl}`,
      recipeURL: `https://fridge-raider-capstone.herokuapp.com/#/recipes/${recipe.id}`
    };
    this.handleModalChange = this.handleModalChange.bind(this);
  }

  handleModalChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleModalClickOpen = () => {
    this.setState({ open: true });
  };

  handleModalClose = () => {
    const { userName } = this.props
    this.setState({
      open: false,
      targetEmail: '',
      recipientName: '',
      emailFromName: !userName ? '' : `${userName}`,
    });
  };

  handleModalSend = () => {
    const { userName } = this.props
    sendIt(this.state)
    this.setState({
      open: false,
      targetEmail: '',
      recipientName: '',
      emailFromName: !userName ? '' : `${userName}`,
    });
  };

  render() {    
    const { recipe } = this.props
    return (
      <div>
        {
          !recipe 
          ? null 
          :
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
                  label="Recipient's Name"
                  type="name"
                  name="recipientName"
                  value={this.state.recipientName}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  onChange={this.handleModalChange}
                />
                <TextField
                  label="Recipient's Email"
                  type="email"
                  name="targetEmail"
                  autoComplete="email"
                  value={this.state.targetEmail}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  onChange={this.handleModalChange}
                />
                <TextField
                  label="Your Name"
                  type="name"
                  name="emailFromName"
                  value={this.state.emailFromName}
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
        }
      </div>
    );
  }
}