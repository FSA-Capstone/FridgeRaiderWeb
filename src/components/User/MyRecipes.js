import React, { Component, Fragment } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import MySavedOrUploadedRecipes from './MySavedOrUploadedRecipes';
import NewRecipe from '../Recipes/NewRecipe';
import { connect } from 'react-redux';

class MyRecipes extends Component {
  constructor() {
    super();
    this.state = {
      tab: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.setTabToZero = this.setTabToZero.bind(this);
  }

  handleChange(event, tab) {
    this.setState({ tab });
  }

  setTabToZero() {
    this.setState({ tab: 0 });
  }

  render() {
    const { tab } = this.state;
    const { handleChange, setTabToZero } = this;
    return (
      <Fragment>
        <Tabs value={tab} onChange={handleChange} centered>
          <Tab label={<span style={{ fontSize: 20 }}>Uploaded Recipes</span>} />
          <Tab label={<span style={{ fontSize: 20 }}>Saved Recipes</span>} />
          <Tab label={<span style={{ fontSize: 20 }}>New Recipe</span>} />
        </Tabs>
        {tab === 0 && (
          <MySavedOrUploadedRecipes recipes={this.props.postedRecipes} />
        )}
        {tab === 1 && (
          <MySavedOrUploadedRecipes recipes={this.props.savedRecipes} />
        )}
        {tab === 2 && <NewRecipe setTabToZero={setTabToZero} />}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  let postedRecipes = [];
  let savedRecipes = [];

  console.log('auth user', state.authenticatedUser);

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
