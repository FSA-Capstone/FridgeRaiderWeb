import React from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import RecipeCard from './RecipeCard';

const Recipes = ({ recipes }) => {
  if(!recipes){
    return null;
  }
  return (
    <Grid container justify="center">
    {
      recipes.map(recipe => {
        return (
          <Grid key={recipe.id} item xs={9} sm={6}>
            <RecipeCard recipe={recipe}/>
          </Grid>
        )
      })
    }
    </Grid>
  );
}

const mapStateToProps = ({ recipes }) => {
  return {
    recipes
  } 
}

export default connect(mapStateToProps)(Recipes);

