import React, { Component, Fragment } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import MySavedOrUploadedRecipes from './MySavedOrUploadedRecipes';
import NewRecipe from '../Recipes/NewRecipe';
import { connect } from 'react-redux';

class MyRecipes extends Component {
  constructor() {
    super();
    this.state = {
      value: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    const { handleChange } = this;
    return (
      <Fragment>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label={<span style={{ fontSize: 20 }}>Uploaded Recipes</span>} />
          <Tab label={<span style={{ fontSize: 20 }}>Saved Recipes</span>} />
          <Tab label={<span style={{ fontSize: 20 }}>New Recipe</span>} />
        </Tabs>
        {value === 0 && (
          <MySavedOrUploadedRecipes recipes={this.props.postedRecipes} />
        )}
        {value === 1 && (
          <MySavedOrUploadedRecipes recipes={this.props.savedRecipes} />
        )}
        {value === 2 && <NewRecipe />}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  let postedRecipes = [];
  let savedRecipes = [];

  if (state.authenticatedUser.name) {
    postedRecipes = state.authenticatedUser.postedRecipes.map(
      recipe => recipe.properties
    );

    savedRecipes = state.authenticatedUser.savedRecipes.map(
      recipe => recipe.properties
    );
  }
  return {
    postedRecipes,
    savedRecipes
  };
};

export default connect(mapStateToProps)(MyRecipes);
