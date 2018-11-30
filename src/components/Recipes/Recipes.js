import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeCard from './RecipeCard';
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

class Recipes extends Component {
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
      recipes: props.recipes.slice(0, 24)
    };
    this.expandCuisines = this.expandCuisines.bind(this);
    this.handleCuisines = this.handleCuisines.bind(this);
    this.expandTypes = this.expandTypes.bind(this);
    this.handleTypes = this.handleTypes.bind(this);
    this.filterRecipes = this.filterRecipes.bind(this);
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
    console.log(recipes[0]);
    return (
      <div className="reults" style={{ width: '99.9%' }}>
        <List
          component="nav"
          subheader={
            <ListSubheader
              disableSticky={true}
              style={{
                textAlign: 'center',
                fontSize: '1.2em',
                margin: '25px 0 50px 0'
              }}
              component="div"
            >
              Filter Recipes
            </ListSubheader>
          }
          style={{
            width: '250px',
            height: '100vh',
            position: 'fixed',
            top: 0,
            display: 'inline-block',
            borderRight: '.5px solid #666',
            boxShadow:
              '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
          }}
        >
          <div
            id="navSide"
            style={{
              height: 'calc(100% - 100px)',
              width: '248px',
              top: '100px',
              position: 'fixed',
              overflow: 'auto'
            }}
          >
            <ListItem
              button
              onClick={expandTypes}
              style={{ backgroundColor: '#f0f0f0' }}
            >
              <ListItemText inset primary="Meal Type" />
              {expanded.types ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={expanded.types} timeout="auto" unmountOnExit>
              <FormControl component="fieldset">
                <FormGroup>
                  {Object.keys(mealTypes).map(key => (
                    <FormControlLabel
                      key={key}
                      control={
                        <Switch
                          name={key}
                          color="primary"
                          checked={mealTypes[key]}
                          onChange={handleTypes}
                          value={mealTypes[key] ? false : true}
                        />
                      }
                      label={key}
                      style={{ marginLeft: '35px' }}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Collapse>
            <ListItem
              button
              onClick={expandCuisines}
              style={{ backgroundColor: '#f0f0f0' }}
            >
              <ListItemText inset primary="Cuisines" />
              {expanded.cuisines ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={expanded.cuisines} timeout="auto" unmountOnExit>
              <FormControl component="fieldset">
                <FormGroup>
                  {Object.keys(cuisines).map(key => (
                    <FormControlLabel
                      key={key}
                      control={
                        <Switch
                          name={key}
                          color="primary"
                          checked={cuisines[key]}
                          onChange={handleCuisines}
                          value={cuisines[key] ? false : true}
                        />
                      }
                      label={key}
                      style={{ marginLeft: '35px' }}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Collapse>
          </div>
        </List>
        <GridList
          id="resultsMain"
          style={{
            justifyContent: 'space-around',
            float: 'right',
            width: 'calc(100% - 250px)',
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

const mapStateToProps = ({ recipes }) => {
  return {
    recipes
  };
};

export default connect(mapStateToProps)(Recipes);
