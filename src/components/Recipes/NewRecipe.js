import React, { Fragment } from 'react';
import { Typography, InputBase, Button } from '@material-ui/core';
import { Edit as EditIcon, Search } from '@material-ui/icons';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { connect } from 'react-redux';
import { createNewRecipe } from '../../store.js';

class NewRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      instructions: '',
      cuisine: '',
      category: '',
      ingredientText: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    if (!this.props.authenticatedUser.id) {
      console.log('no authenticated user');
      return;
    }

    let recipe = {
      name: this.state.name,
      instructions: this.state.instructions,
      cuisineName: this.state.cuisine,
      categoryName: this.state.category,
      ingredients: this.state.ingredientText.trim().replace(/,/g, '\n'),
      postedByUserId: this.props.authenticatedUser.id
    };

    console.log(recipe);

    this.props.createNewRecipe(recipe);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    const { handleChange } = this;

    const {
      name,
      instructions,
      category,
      cuisine,
      ingredientText
    } = this.state;

    return (
      <Fragment>
        <div style={{ textAlign: 'center' }}>
          <Typography
            variant="title"
            style={{
              marginTop: '10vh',
              marginBottom: '5vh',
              fontWeight: 'bold'
            }}
          >
            Add Your Recipes!
          </Typography>

          <InputBase
            placeholder="Recipe name"
            style={{
              backgroundColor: '#fdfdfd',
              padding: '3px 10px',
              width: '400px',
              maxWidth: '80%',
              border: '1px solid silver',
              height: '2.35em'
            }}
            onChange={handleChange}
            value={name}
            name={'name'}
          />

          <br />
          <InputBase
            placeholder="Recipe category"
            style={{
              backgroundColor: '#fdfdfd',
              padding: '3px 10px',
              width: '400px',
              maxWidth: '80%',
              border: '1px solid silver',
              height: '2.35em',
              margin: '15px 15px'
            }}
            onChange={handleChange}
            value={category}
            name={'category'}
          />

          <br />

          <InputBase
            placeholder="Type of cuisine"
            style={{
              backgroundColor: '#fdfdfd',
              padding: '3px 10px',
              width: '400px',
              maxWidth: '80%',
              border: '1px solid silver',
              height: '2.35em'
            }}
            onChange={handleChange}
            value={cuisine}
            name={'cuisine'}
          />

          <br />

          <InputBase
            placeholder="Recipe Instructions"
            style={{
              backgroundColor: '#fdfdfd',
              margin: '15px auto 0px auto',
              padding: '3px 10px',
              width: '400px',
              maxWidth: '80%',
              border: '1px solid silver',
              height: '6em'
            }}
            onChange={handleChange}
            value={instructions}
            multiline={true}
            rows={4}
            name={'instructions'}
          />

          <br />

          <InputBase
            placeholder="Ingredients (separate multiple ingredients with commas)"
            style={{
              backgroundColor: '#fdfdfd',
              margin: '15px auto 15px auto',
              padding: '3px 10px',
              width: '400px',
              maxWidth: '80%',
              border: '1px solid silver',
              height: '4.7em'
            }}
            onChange={handleChange}
            value={ingredientText}
            name={'ingredientText'}
            rows={3}
            multiline={true}
          />

          <br />

          <Button
            style={{
              marginLeft: '20px'
            }}
            size="large"
            variant="contained"
            onClick={this.handleSubmit}
          >
            SUBMIT
            <CloudUploadIcon />
          </Button>
        </div>
        <div id="main" />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createNewRecipe: recipe => dispatch(createNewRecipe(recipe))
  };
};

const mapStateToProps = state => {
  return {
    authenticatedUser: state.authenticatedUser
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewRecipe);
