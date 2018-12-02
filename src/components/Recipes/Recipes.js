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
	Collapse,
	Chip,
	InputBase,
	Button
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { getRecipesForIngredients, removeIngredient, addIngredient } from '../../store';

class Recipes extends Component {
	constructor(props) {
    super(props);
    let cuisines = {}
    let mealTypes = {}
    if(props.cuisines) {
      props.cuisines.forEach(cuisine => {
        cuisines[cuisine] = false
      });
    }
    if(props.categories) {
      props.categories.forEach(category => {
        mealTypes[category] = false
      });
    }
		this.state = {
			expanded: {
				cuisines: true,
				types: true,
				ingredients: true
			},
			cuisines,
			mealTypes,
			input: '',
			recipes: props.recipes.slice(0, 24),
			allIngredients: props.allIngredients,
			userIngredients: props.userIngredients
		};
		this.expandCuisines = this.expandCuisines.bind(this);
		this.handleCuisines = this.handleCuisines.bind(this);
		this.expandTypes = this.expandTypes.bind(this);
		this.handleTypes = this.handleTypes.bind(this);
		this.filterRecipes = this.filterRecipes.bind(this);
		this.removeIngredient = this.removeIngredient.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addIngredient = this.addIngredient.bind(this)
	}

	componentDidMount() {
    if(this.props.userIngredients.length > 0) {
      this.props.getRecipesForIngredients(this.props.userIngredients);
    }
	}

	componentDidUpdate(prevProps) {
		if (prevProps.recipes !== this.props.recipes) {
			this.setState({
				recipes: this.props.recipes.slice(0, 24)
			});
		}
		if (prevProps.userIngredients !== this.props.userIngredients) {
			this.setState({
				userIngredients: this.props.userIngredients
			});
    }
	}

	handleChange(e) {
		this.setState({
			input: e.target.value
		});
	}

	removeIngredient(ingredient) {
		this.props.removeIngredient(ingredient);
		this.props.getRecipesForIngredients(
			this.state.userIngredients.filter((_ingredient) => ingredient !== _ingredient)
		);
	}

	addIngredient() {
    this.props.addIngredient(this.state.input.toLowerCase());
    const ingredients = this.state.userIngredients.filter((ingredient) => ingredient !== this.state.input)
    ingredients.push(this.state.input.toLowerCase())
    this.props.getRecipesForIngredients(ingredients);
		this.setState({
			input: ''
		});
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

	expandIngredients() {
		let expanded = this.state.expanded;
		expanded.ingredients = expanded.ingredients ? false : true;
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
			recipes = recipes.filter((recipe) => cuisines[recipe.cuisine]);
		}
		if (typeCheck) {
			recipes = recipes.filter((recipe) => mealTypes[recipe.category]);
		}
		this.setState({
			recipes: recipes.slice(0, 24)
		});
	}

	render() {
		const {
			expandCuisines,
			handleCuisines,
			expandTypes,
			expandIngredients,
			handleTypes,
			removeIngredient,
			handleChange,
			addIngredient
		} = this;
		const { expanded, cuisines, recipes, mealTypes, userIngredients, input } = this.state;
		if (userIngredients.length === 0) {
			this.props.history.push('/');
		}
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
						<ListItem button onClick={expandIngredients} style={{ backgroundColor: '#f0f0f0' }}>
							<ListItemText inset primary="Ingredients" />
							{expanded.ingredients ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Collapse
							in={expanded.ingredients}
							timeout="auto"
							style={{ textAlign: 'center' }}
							unmountOnExit
						>
							{userIngredients.map((ingredient) => (
								<Chip
									key={ingredient}
									label={ingredient}
									onDelete={() => removeIngredient(ingredient)}
									className="chip"
									color="primary"
								/>
							))}
							<InputBase
								placeholder="Add another ingredient..."
								className="ingSearch"
								onChange={handleChange}
								value={input}
							/>
							<Button
								variant="extendedFab"
								color="primary"
								aria-label="Edit"
								style={{     display: "block", fontSize: "0.7em", height: "35px", margin: "5px auto 10px", left: "0px", right: "0px", boxShadow: "none" }}
								onClick={addIngredient}
							>
								Add Ingredient
							</Button>
						</Collapse>
						<ListItem button onClick={expandTypes} style={{ backgroundColor: '#f0f0f0' }}>
							<ListItemText inset primary="Meal Type" />
							{expanded.types ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Collapse in={expanded.types} timeout="auto" unmountOnExit>
							<FormControl component="fieldset">
								<FormGroup>
									{Object.keys(mealTypes).map((key) => (
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
						<ListItem button onClick={expandCuisines} style={{ backgroundColor: '#f0f0f0' }}>
							<ListItemText inset primary="Cuisines" />
							{expanded.cuisines ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Collapse in={expanded.cuisines} timeout="auto" unmountOnExit>
							<FormControl component="fieldset">
								<FormGroup>
									{Object.keys(cuisines).map((key) => (
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
					{recipes.map((recipe) => {
						return (
							<GridListTile
								key={recipe.id}
								style={{ height: '440px', width: '306px', margin: '50px 20px' }}
							>
								<RecipeCard history={this.props.history} recipe={recipe} userIngredients={userIngredients} />
							</GridListTile>
						);
					})}
				</GridList>
			</div>
		);
	}
}

const mapStateToProps = ({ recipes, ingredients, cuisines, categories }) => {
	return {
    recipes,
    cuisines,
    categories,
		allIngredients: ingredients.allIngredients,
		userIngredients: ingredients.userIngredients
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getRecipesForIngredients: (ingredients) => dispatch(getRecipesForIngredients(ingredients)),
		removeIngredient: (ingredient) => dispatch(removeIngredient(ingredient)),
		addIngredient: (ingredient) => dispatch(addIngredient(ingredient))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
