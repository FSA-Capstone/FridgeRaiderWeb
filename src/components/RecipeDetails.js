import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Card, CardHeader, CardContent, Typography, Divider } from '@material-ui/core';
import { connect } from 'react-redux';
import { getRecipe } from '../store';

class RecipeDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, recipe } = this.props;
    if(!recipe) return null;

    return (
      <Fragment>
        <div className={classes.container}>
          <div style={{ gridColumnEnd: 'span 6' }}>
            <img src={recipe.image} />
          </div>
          <div style={{ gridColumnEnd: 'span 6' }}>
            <Card className={classes.card}>
              <CardHeader title={recipe.name} />
              <CardContent>
                <Typography component="p" variant="subheading" gutterBottom={true} >
                  Cuisine: {recipe.area}
                </Typography>
                <Typography component="p" variant="subheading" gutterBottom={true} >
                  Category: {recipe.category}
                </Typography>
                <Divider className={classes.divider}/>
                <Typography component="p" variant="subheading" gutterBottom={true} >
                  Ingredients: 
                </Typography>
                {
                  recipe.ingredients.map((ingredient, index) => 
                    <Typography key={index} component="p" variant="subheading" gutterBottom={true} >
                      {`${ingredient.measure} ${ingredient.name}`}
                    </Typography> )
                }
              </CardContent>
            </Card>
          </div>
        </div>
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

const mapStateToProps = ({ recipes }, { id }) => {
  return {
    recipe: getRecipe(id, recipes)
  };
};

RecipeDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(RecipeDetails));
