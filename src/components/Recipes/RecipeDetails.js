import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Card, CardHeader, CardContent, Typography, Divider } from '@material-ui/core';
import { connect } from 'react-redux';
import { getRecipe } from '../../store';

class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {}
    }
  }

  componentDidMount() {
    this.props.getRecipe(this.props.id)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.recipe !== this.props.recipe) {
      this.setState({
        recipe: this.props.recipe
      })
    }
  }

  render() {
    const { classes } = this.props;
    const { recipe } = this.state
    console.log(recipe)
    if(!recipe.id) return null;

    return (
      <Fragment>
        <div id="recipeBack" />
        <div className="recipeContainer">
        <h1>{recipe.name}</h1>
        <div className={"topRecipe"}>
          <img src={recipe.imageUrl} style={{ width: "600px", maxWidth: "70%", height: "auto", alignSelf: "start", padding: "25px" }} />
          <div style={{ width: "400px" }}>
            <Card className={classes.card}>
              <CardContent>
                <Typography component="p" id="recipeInfo" variant="subheading" gutterBottom={true} >
                  Cuisine: {recipe.cuisine[0].properties.name}  |  Category: {recipe.category[0].properties.name}
                </Typography>
                <Divider className={classes.divider}/>
                <Typography component="div" variant="subheading" gutterBottom={true} >
                  <CardHeader title="Ingredients" style={{textAlign: "center"}} />
                </Typography>
                {
                  recipe.ingredients.map((ingredient, index) => 
                    <Typography key={index} component="p" variant="subheading" gutterBottom={true} >
                      {`${ingredient.relation.measure} ${ingredient.properties.name}`}
                    </Typography> )
                }
              </CardContent>
            </Card>
          </div>
        </div>
        <hr />
          <div className={classes.container}>
            <div style={{ gridColumnEnd: 'span 12' }}>
              Instructions:
            </div>
            <div style={{ gridColumnEnd: 'span 12' }}>
              {recipe.instructions}
            </div>
          </div>
          <div className={classes.container}>
            <div style={{ gridColumnEnd: 'span 12' }}>
              Reviews....
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,
    margin: theme.spacing.unit * 5,
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`,
  }
});

const mapStateToProps = ({recipes},{ id }) => {
  const recipe = recipes.filter( recipe => recipe.id === id).pop()
  return {
    recipe,
    id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecipe: (id) => dispatch(getRecipe(id))
  }
}

RecipeDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RecipeDetails));
