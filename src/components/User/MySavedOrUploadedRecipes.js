import React, { Component } from 'react';
import RecipeCard from '../Recipes/RecipeCard';
import { GridList, GridListTile } from '@material-ui/core';

class MySavedOrUploadedRecipes extends Component {
  render() {
    const { recipes } = this.props;
    return (
      <div className="results" style={{ width: '99.9%' }}>
        <GridList
          id="resultsMain"
          style={{
            paddingTop: '30px',
            width: '100%',
            justifyContent: 'center'

          }}
        >
          {recipes.map(recipe => {
            return (
              <GridListTile
                key={recipe.id}
                style={{ height: '440px', width: '306px', margin: '50px 20px' }}
              >
                <RecipeCard className="recipeCard" hideMissingIngredients={true} recipe={recipe} />
              </GridListTile>
            );
          })}
        </GridList>
      </div>
    );
  }
}

export default MySavedOrUploadedRecipes;
