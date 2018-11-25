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

class RecipeCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, recipe } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          title={recipe.name}
        />
        <Link to={`/recipes/${recipe.id}`}>
          <CardMedia
            className={classes.media}
            image={recipe.image}
            title={recipe.name}
          />
        </Link>
        <CardContent>
          <Typography component="p">
            Cuisine: {recipe.area}
          </Typography>
          <Typography component="p">
            Category: {recipe.category}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to wish list">
            <FavoriteIcon />
          </IconButton>
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
    paddingTop: '56.25%',
  },
  actions: {
    display: 'flex',
  }
});

RecipeCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeCard);
