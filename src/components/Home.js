import React, { Component, Fragment } from 'react';
import { InputBase, Button, Icon } from '@material-ui/core';
import { Edit as EditIcon, Search } from '@material-ui/icons';
import { connect } from 'react-redux';
import { setIngredients } from '../store';

class Home extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			ingredients: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.addIngredient = this.addIngredient.bind(this);
		this.removeIngredient = this.removeIngredient.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
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
    console.log('Clicked!')
		this.props.setIngredients(this.state.ingredients, this.props.history);
	}

	render() {
		const { handleSearch, handleChange, addIngredient, removeIngredient } = this;
		const { ingredients, input } = this.state;

		return (
			<Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
