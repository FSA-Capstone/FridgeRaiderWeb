import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Card, CardHeader, CardContent, Typography, Divider, TextField, MenuItem, MySnackbarContentWrapper, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { getRecipe, postReview } from '../../store';

class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      rating: '',
      description: '',
      warningRating: false,
      warningDescription: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.postReview = this.postReview.bind(this)
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

  handleChange(e) {
    const state = this.state
    state[e.target.name] = e.target.value * 1 ? e.target.value * 1 : e.target.value
    this.setState({
      state 
    })
  }

  postReview(e) {
    e.preventDefault()
    let valid = true
    if(isNaN(this.state.rating) || this.state.rating === null) {
      valid = false;
      this.setState({
        warningRating: true
      })
    } else if(this.state.warningRating){
      this.setState({
        warningRating: false
      })
    }
    if(isNaN(this.state.description) || this.state.description === null) {
      valid = false;
      this.setState({
        warningDescription: true
      })
    } else if(this.state.warningDescription){
      this.setState({
        warningDescription: false
      })
    }
    const review = {
      rating: this.state.rating,
      description: this.state.description
    }
    if(valid) {
      this.props.postReview( this.state.recipe.id, this.props.authenticatedUser.id, this.props.history )
    }
  }

  render() {
    const { classes } = this.props;
    const { recipe, rating, description, warningDescription, warningRating } = this.state
    const { handleChange, postReview } = this
    const ratings = [1, 2, 3, 4, 5]
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
        </div>
        <div className={classes.container}>
          <div style={{ gridColumnEnd: 'span 12' }}>
            <h2 className="reviewHead">Reviews</h2>
              {this.props.authenticatedUser.id ?
              <form onSubmit={() => postReview()}>
                <TextField
                  id="rating"
                  name="rating"
                  select
                  label="Select"
                  className="textField"
                  value={rating}
                  onChange={handleChange}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please rate the recipe."
                  margin="normal"
                  variant="outlined"
                >
                  {ratings.map(rating => (
                    <MenuItem key={rating} value={rating}>
                      {`${rating} Star${rating > 1 ? 's' : ''}`}
                    </MenuItem>
                  ))}
                </TextField>
                {
                  warningRating ? 
                    <MySnackbarContentWrapper
                      variant="error"
                      className={margin}
                      value={description}
                      message="Please rate the recipe!"
                    /> : 
                    null
                }
                <TextField
                  id="description"
                  name="description"
                  label="Multiline Placeholder"
                  placeholder="Placeholder"
                  onChange={handleChange}
                  multiline
                  className="textFieldLarge"
                  margin="normal"
                  variant="outlined"
                />
                {
                  warningDescription ? 
                    <MySnackbarContentWrapper
                      variant="error"
                      className={classes.margin}
                      message="Please write a review!"
                    /> : 
                    null
                }
                <Button variant="contained" aria-label="Submit">
                  Submit
                </Button>
              </form>
              :
              null}
              {
                recipe.reviews.map((review, index) => 
                  <div key={index} className="review">
                    <h3 className="reviewAuthor">{review.properties.name}</h3>
                    <img src={`/dist/rating/${review.relation.rating}.png`} className="rating" />
                    <p className="reviewBody">{review.relation.description}</p>
                  </div> )
              }
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
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  textFieldLarge: {
    width: "1000px",
    maxWidth: "80%",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

const mapStateToProps = ({recipes, authenticatedUser},{ id }) => {
  const recipe = recipes.filter( recipe => recipe.id === id).pop()
  return {
    recipe,
    authenticatedUser,
    id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecipe: (id) => dispatch(getRecipe(id)),
    postReview: (recipeId, userId, review) => dispatch(postReview(id))
  }
}

RecipeDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RecipeDetails));
