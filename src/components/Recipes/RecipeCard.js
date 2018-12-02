import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { saveRecipe } from '../../store.js';
import { connect } from 'react-redux';

class RecipeCard extends React.Component {
  state = { liked: this.props.authenticatedUser.savedRecipes && this.props.authenticatedUser.savedRecipes.filter( savedRecipe => savedRecipe.properties.id === this.props.recipe.id).length > 0 };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  saveRecipe(recipe) {
    this.props.saveRecipe(recipe, this.props.authenticatedUser.id);
    this.setState({
      liked: true
    })
  }

  render() {
    const { classes, recipe, userIngredients } = this.props;
    const { liked } = this.state
    return (
      <Card className={classes.card}>
        <CardHeader title={recipe.name} />
        <Link to={`/recipes/${recipe.id}`} className="recipeLink">
          <CardMedia
            className={classes.media}
            image={recipe.imageUrl}
            title={recipe.name}
          />

          {this.props.hideMissingIngredients ? null : (
            <div>
              <span className="blackOut" />

              <span className="missingHeader">
                You're Missing{' '}
                <span className="badge">
                  {recipe.ingredients
                    ? recipe.ingredients.filter(
                        ingredient => userIngredients.indexOf(ingredient) === -1
                      ).length
                    : 0}
                </span>{' '}
                Ingredients:
              </span>
              <span className="missingList">
                {recipe.ingredients
                  ? recipe.ingredients
                      .filter(
                        ingredient => userIngredients.indexOf(ingredient) === -1
                      )
                      .join('\n')
                  : ''}
              </span>
            </div>
          )}
        </Link>
        <CardContent>
          <Typography component="p">
            Cuisine: {recipe.cuisine ? recipe.cuisine : 'None'}
          </Typography>
          <Typography component="p">
            Category: {recipe.category ? recipe.category : 'None'}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <div onClick={() => this.saveRecipe(recipe)}>
            <IconButton aria-label="Add to wish list">
              { liked ? <FavoriteIcon style={{color: "red"}} /> : <FavoriteIcon />}
            </IconButton>
          </div>
          <Link to={`/recipes/${recipe.id}`}>
            <Button variant="contained" color="primary">
              View Recipe
            </Button>
          </Link>
        </CardActions>
      </Card>
    );
  }
}

const styles = theme => ({
  card: {
    margin: 0,
    width: 300,
    height: 400,
    backgroundColor: '#fff'
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  actions: {
    display: 'flex'
  }
});

RecipeCard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    authenticatedUser: state.authenticatedUser,
    hideMissingIngredients: ownProps.hideMissingIngredients
      ? ownProps.hideMissingIngredients
      : null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveRecipe: (recipeId, userId) => dispatch(saveRecipe(recipeId, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RecipeCard));
