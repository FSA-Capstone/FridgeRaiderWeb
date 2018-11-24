import React from 'react';
import { connect } from 'react-redux'
import RecipeCard from './RecipeCard';
import { GridList, GridListTile } from '@material-ui/core';

const Recipes = ({ recipes }) => {
  if(!recipes){
    return null;
  }
  return (
    <GridList style={{justifyContent: 'space-around'}}>
    {
      recipes.map(recipe => {
        return (
          <GridListTile key={recipe.id} style={{height: "400px", width: "300px", margin: "50px 20px"}}>
            <RecipeCard recipe={recipe}/>
          </GridListTile>
        )
      })
    }
    </GridList>
  );
}

const mapStateToProps = ({ recipes }) => {
  return {
    recipes
  } 
}

export default connect(mapStateToProps)(Recipes);

