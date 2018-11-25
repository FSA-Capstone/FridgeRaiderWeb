import React, { Fragment } from 'react';
import { Typography, InputBase, Button } from '@material-ui/core';
import { Edit as EditIcon, Search } from '@material-ui/icons';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

class NewRecipe extends React.Component {
  constructor() {
    super();

    this.state = {
      ingredients: [],
      name: '',
      description: '',
      ingredientText: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    const { handleSearch, handleChange } = this;

    const { name, ingredientText, description, ingredients } = this.state;

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
          >Add Your Recipes!
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
            placeholder="Recipe Description"
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
            value={description}
            multiline={true}
            rows={4}
            name={'description'}
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

export default NewRecipe;
