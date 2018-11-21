import React, { Component, Fragment } from 'react'
import { InputBase, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { getRecipesForIngredients } from '../store'

class Home extends Component {
  
  constructor() {
    super()
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(ingredients) {
    this.props.getRecipesForIngredients(ingredients)
      .then(() => this.props.history.push('/recipes'))
  }

  render () {
    const { handleSearch } = this

    //TO DO: To be replaced by the ingredients selected by the user once that functionality is built
    const ingredients = 'Chicken,Brocolli'

    return (
      <Fragment>
        <InputBase placeholder="What do you have in your fridge..." 
          style={{ margin: 100, width: "30vw", border: "1px solid silver", height: "4vh"}}/>

        <Button onClick={() => handleSearch(ingredients)} variant="contained" style={{width: "10vw", height: "6vh", margin: 10}}>
          Search For Recipes
        </Button>
      </Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch ) => {
  return {
    getRecipesForIngredients: (ingredients) => dispatch(getRecipesForIngredients(ingredients))
  }
}

export default connect(null, mapDispatchToProps)(Home);