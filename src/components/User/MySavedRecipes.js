import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeCard from '../Recipes/RecipeCard';
import {
  GridList,
  GridListTile,
  FormControl,
  FormGroup,
  FormControlLabel,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Collapse
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

class MySavedRecipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: {
        cuisines: true,
        types: true
      },
      cuisines: {
        American: false,
        British: false,
        Canadian: false,
        Chinese: false,
        Dutch: false,
        French: false,
        Greek: false,
        Indian: false,
        Irish: false,
        Italian: false,
        Jamaican: false,
        Japanese: false,
        Malaysian: false,
        Mexican: false,
        Moroccan: false,
        Russian: false,
        Spanish: false,
        Thai: false,
        Vietnamese: false
      },
      mealTypes: {
        Breakfast: false,
        'Main Course': false,
        Snack: false,
        Desert: false
      },
      recipes: this.props.recipes.slice(0, 24)
    };
    this.expandCuisines = this.expandCuisines.bind(this);
    this.handleCuisines = this.handleCuisines.bind(this);
    this.expandTypes = this.expandTypes.bind(this);
    this.handleTypes = this.handleTypes.bind(this);
    this.filterRecipes = this.filterRecipes.bind(this);
  }

  componentDidUpdate() {
    // console.log(this.props);
  }

  expandCuisines() {
    let expanded = this.state.expanded;
    expanded.cuisines = expanded.cuisines ? false : true;
    this.setState({
      expanded
    });
  }

  handleCuisines(e) {
    let cuisines = this.state.cuisines;
    cuisines[e.target.name] = cuisines[e.target.name] ? false : true;
    this.setState({
      cuisines
    });
    this.filterRecipes();
  }

  expandTypes() {
    let expanded = this.state.expanded;
    expanded.types = expanded.types ? false : true;
    this.setState({
      expanded
    });
  }

  handleTypes(e) {
    let mealTypes = this.state.mealTypes;
    mealTypes[e.target.name] = mealTypes[e.target.name] ? false : true;
    this.setState({
      mealTypes
    });
    this.filterRecipes();
  }

  filterRecipes() {
    function anyEnabled(obj) {
      for (const key in obj) {
        if (obj[key]) return true;
      }
      return false;
    }
    const { cuisines, mealTypes } = this.state;
    const cuisineCheck = anyEnabled(cuisines);
    const typeCheck = anyEnabled(mealTypes);
    let recipes = this.props.recipes;
    if (cuisineCheck) {
      recipes = recipes.filter(
        recipe => cuisines[recipe.cuisine[0].properties.name]
      );
    }
    if (typeCheck) {
      recipes = recipes
        .filter(recipe => mealTypes[recipe.category[0].properties.name])
        .slice(0, 24);
    }
    this.setState({
      recipes
    });
  }

  render() {
    const { expandCuisines, handleCuisines, expandTypes, handleTypes } = this;
    const { expanded, cuisines, recipes, mealTypes } = this.state;
    return (
      <div className="reults" style={{ width: '99.9%' }}>
        <GridList
          id="resultsMain"
          style={{
            justifyContent: 'space-around',
            float: 'right',
            paddingTop: '50px'
          }}
        >
          {recipes.map(recipe => {
            return (
              <GridListTile
                key={recipe.id}
                style={{ height: '440px', width: '306px', margin: '50px 20px' }}
              >
                <RecipeCard recipe={recipe} />
              </GridListTile>
            );
          })}
        </GridList>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.authenticatedUser.savedRecipes
  };
};

export default connect(mapStateToProps)(MySavedRecipes);
