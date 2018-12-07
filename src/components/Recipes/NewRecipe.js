import React, { Fragment } from 'react';
import { Typography, InputBase, Button } from '@material-ui/core';
import { Edit as EditIcon, Search } from '@material-ui/icons';
import { connect } from 'react-redux';
import { createNewRecipe } from '../../store.js';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import { TextField } from '@material-ui/core';

class NewRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      instructions: '',
      cuisine: '',
      category: '',
      ingredientText: '',
      imageUrl: '',
      value: 1
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    if (!this.props.authenticatedUser.id) {
      console.log('No authenticated user');
      return;
    }

    let recipe = {
      name: this.state.name,
      instructions: this.state.instructions,
      cuisineName: this.state.cuisine,
      categoryName: this.state.category,
      ingredients: this.state.ingredientText
        .trim()
        .toLowerCase()
        .replace(/,/g, '\n'),
      postedByUserId: this.props.authenticatedUser.id,
      imageUrl: this.state.imageUrl
    };

    console.log(recipe);
    this.props.createNewRecipe(recipe).then(() => this.props.setTabToZero());
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
      imageUrl,
      ingredientText
    } = this.state;

    const { categories, cuisines } = this.props

    return (
      <Fragment>
        <MuiThemeProvider>
          <div style={{ textAlign: 'center' }}>
            <Typography
              variant="title"
              style={{
                marginTop: '5vh',
                marginBottom: '2vh',
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
                height: '2.35em',
                margin: '15px'
              }}
              onChange={handleChange}
              value={name}
              name={'name'}
            />

            <br />

            <Paper
              style={{
                textAlign: 'center',
                width: '400px',
                display: 'inline-block'
              }}
            >
              <TextField
                name="category"
                select
                label="Category"
                style={{
                  width: '175px',
                  margin: '10px'
                }}
                className="textField"
                value={this.state.category}
                onChange={handleChange}
              >
                {categories.map(category => {
                  return (
                    <MenuItem value={category} key={category}>
                      {category}
                    </MenuItem>
                  );
                })}
              </TextField>

              <TextField
                name="cuisine"
                select
                label="Cuisine"
                style={{
                  width: '175px',
                  margin: '10px'
                }}
                className="textField"
                value={this.state.cuisine}
                onChange={handleChange}
              >
                {cuisines.map(cuisine => {
                  return (
                    <MenuItem value={cuisine} key={cuisine}>
                      {cuisine}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Paper>

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

            <InputBase
              placeholder="Recipe picture URL"
              style={{
                backgroundColor: '#fdfdfd',
                padding: '3px 10px',
                margin: '0px auto 15px auto',
                width: '400px',
                maxWidth: '80%',
                border: '1px solid silver',
                height: '2.35em'
              }}
              onChange={handleChange}
              value={imageUrl}
              name={'imageUrl'}
            />

            <br />

            <Button
              style={{
                marginLeft: '20px'
              }}
              size="large"
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              SUBMIT
            </Button>

            <div id="main"> </div>
          </div>
        </MuiThemeProvider>
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
    authenticatedUser: state.authenticatedUser,
    categories: state.categories,
    cuisines: state.cuisines
  };
};

const styles = {
  customWidth: {
    width: 200
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewRecipe);
