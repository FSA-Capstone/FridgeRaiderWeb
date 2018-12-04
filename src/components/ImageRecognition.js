import React, { Component, Fragment } from 'react';
import { InputBase, Button, Icon } from '@material-ui/core';
import { Edit as EditIcon, Search } from '@material-ui/icons';
import { connect } from 'react-redux';
import { setIngredients } from '../store';
import Clarifai from 'clarifai';

const loadKey = () => {
  try {
    return require('../../env').CLARIFAI_KEY
  } catch (error) {
    return process.env.CLARIFAI_KEY
  }
}

const CLARIFAI_KEY = loadKey()

const clarifai = new Clarifai.App({
  apiKey: CLARIFAI_KEY
 });

class ImageRecognition extends Component {
	constructor(props) {
		super(props);
		this.state = {
      imageCapture: true,
			input: '',
      ingredients: [],
      allIngredients: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.addIngredient = this.addIngredient.bind(this);
		this.removeIngredient = this.removeIngredient.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.getIFI = this.getIFI.bind(this);
  }
  
  componentDidUpdate(prevProps) {
    if(prevProps.allIngredients != this.props.allIngredients) {
      this.setState({
        allIngredients: this.props.allIngredients
      })
    }
  }

	handleChange(e) {
		this.setState({
			input: e.target.value
		});
	}

	addIngredient(e) {
    e.preventDefault()
		const ingredients = this.state.ingredients;
		const ingredient = this.state.input.trim().toLowerCase();
		if (ingredient !== '') {
      if(ingredients.indexOf(ingredient) === -1) {
        ingredients.push(ingredient);
        this.setState({
          ingredients,
          input: ''
        });
      } else {
        this.setState({
          input: ''
        });
      }
		}
  }
  
  getIFI(e) {
    const allIngredients = this.state.allIngredients
    var file = e.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = () => {
      return clarifai.models.predict("bd367be194cf45149e75f01d59f77ba7", {base64: reader.result.split('base64,')[1]})
        .then( response => response.outputs[0].data.concepts.filter( ingredient => ingredient.value*1 > 0.8 && allIngredients.includes(ingredient.name)))
        .then( filtered => filtered.map( ingredient => ingredient.name))
        .then( ingredients => 
          this.setState({
            ingredients,
            input: '',
            imageCapture: false
          }))
        .catch(error => console.log(error))
    }
  }

	removeIngredient(ingredient) {
		let ingredients = this.state.ingredients;
		const index = ingredients.indexOf(ingredient);
		if (index !== -1) {
			ingredients.splice(index, 1);
			this.setState({
				ingredients
			});
		}
	}

	handleSearch() {
		this.props.setIngredients(this.state.ingredients, this.props.history);
	}

	render() {
		const { handleSearch, handleChange, addIngredient, removeIngredient, getIFI } = this;
		const { ingredients, input, imageCapture } = this.state;

		return (
			<Fragment>
        <h1 id="beta">BETA</h1>
				<div id="main" />
				{ingredients.length > 0 ? (
					<div>
						<Button
							onClick={() => handleSearch()}
							variant="extendedFab"
							aria-label="Select"
							style={{
								display: 'block',
								right: 0,
								left: 0,
								height: '4em',
								margin: '90px auto',
								backgroundColor: '#C3E4ED'
							}}
						>
							<Search /> Search For Recipes
						</Button>
						<ul className="list">
							<li style={{ fontSize: '1.2em', fontWeight: 500, textDecoration: 'underline' }}>
								Ingredient List
							</li>
							{ingredients.map((ingredient, key) => (
								<li key={key}>
									{ingredient}&nbsp;&nbsp;<button onClick={() => removeIngredient(ingredient)}>
										<img src="/dist/delete.png" style={{ height: '100%' }} />
									</button>
								</li>
							))}
						</ul>
					</div>
				) : (
					<div style={{ height: 'calc(50vh - 220px)' }} />
        )}
        { imageCapture ?
        <div id="upload">
          <div id="shadow"></div>
          <label htmlFor="imageUpload">
            <img id="uploadButton" src="/dist/upload.png" />
          </label>
          <InputBase id="imageUpload" type='file' onChange={getIFI} />
        </div>
        : null }
        { !imageCapture ?
          <form onSubmit={addIngredient}>
            <InputBase
              placeholder="What do you have in your fridge..."
              style={{
                display: 'block',
                backgroundColor: '#fdfdfd',
                margin: '90px auto 30px auto',
                padding: '3px 10px',
                width: '400px',
                maxWidth: '80%',
                left: 0,
                right: 0,
                border: '1px solid silver',
                height: '2.35em'
              }}
              onChange={handleChange}
              value={input}
            />
            <Button
              variant="extendedFab"
              color="primary"
              aria-label="Edit"
              type="submit"
              style={{ display: 'block', margin: '0 auto 70px auto', left: 0, right: 0 }}
            >
              <EditIcon /> Add Ingredient
            </Button>
          </form>
        : null }
			</Fragment>
		);
	}
}

const mapStateToProps = ({ingredients}) => {
	return {
		allIngredients: ingredients.allIngredients
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setIngredients: (ingredients, history) => dispatch(setIngredients(ingredients, history))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageRecognition);
