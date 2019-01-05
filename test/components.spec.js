import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Recipes } from '../src/components/Recipes/Recipes.js';
import { recipes as recipesJSON} from './json/recipes.json';
import MySavedOrUploadedRecipes from '../src/components/User/MySavedOrUploadedRecipes.js';
import sinon from 'sinon';
import { Login } from '../src/components/User/Login.js';
import { Home } from '../src/components/Home.js';
import { Pagination } from '../src/components/Pagination.js';
Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('Home Page', () => {
  let wrapper;
  beforeEach('setup wrapper', () => {
    wrapper = shallow(<Home />);
  });

  it('Renders the ingredient text field', () => {
    expect(wrapper.find('.textField')).to.have.lengthOf(1);
  });

  it('Renders the add ingredient button', () => {
    expect(wrapper.find('.addIngredientButton')).to.have.lengthOf(1);
  });

  it('Does not render the search for recipe button initially', () => {
    expect(wrapper.find('.submitButton')).to.have.lengthOf(0);
  });

  it('Renders the search for recipes button after an ingredient is added', () => {
    wrapper.setState({ ingredients: ['eggs'] });
    expect(wrapper.find('.submitButton')).to.have.lengthOf(1);
  });

  it('Calls the setIngredients thunk when the search for recipes button is clicked', () => {
    const submitButtonSpy = sinon.spy();
    wrapper = shallow(<Home setIngredients={submitButtonSpy} />);
    wrapper.setState({ ingredients: ['eggs'] });
    wrapper.find('.submitButton').simulate('click');
    expect(submitButtonSpy).to.have.property('callCount', 1);
  });
});

describe('Saved/Uploaded Recipes Page', () => {
  let wrapper;
  before('set up wrapper', () => {
    wrapper = shallow(<MySavedOrUploadedRecipes recipes={recipesJSON} />);
  });
  it('displays all when recipes when given all of them', () => {
    return expect(wrapper.find('.recipeCard')).to.have.lengthOf(184);
  });
});

describe('Login Page', () => {
  let wrapper;
  beforeEach('setup wrapper', () => {
    wrapper = shallow(<Login />);
  });

  it('Renders the user id and password fields', () => {
    expect(wrapper.find('.textField')).to.have.lengthOf(2);
  });

  it('Renders both buttons', () => {
    expect(wrapper.find('.loginButton')).to.have.lengthOf(2);
  });
});
describe('Recipe Page', () => {
  let wrapper;
  beforeEach('setup wrapper', () => {
    wrapper = shallow(<Recipes />);
  });
});
describe('Pagination', () => {
  let wrapper;

  it('Renders ... and the final page when given a large number of pages', () => {
    wrapper = shallow(<Pagination maxPages={12} pageNumber={1} />);

    expect(wrapper.find('.finalPage')).to.have.lengthOf(1);
    expect(wrapper.find('.endingDots')).to.have.lengthOf(1);
  });

  it('Does not render ... and the final page when given a small number of pages', () => {
    wrapper = shallow(<Pagination maxPages={2} pageNumber={1} />);

    expect(wrapper.find('.finalPage')).to.have.lengthOf(0);
    expect(wrapper.find('.endingDots')).to.have.lengthOf(0);
  });

  it('Renders the correct number of pages', () => {
    wrapper = shallow(<Pagination maxPages={5} pageNumber={3} />);

    expect(wrapper.find('.pageNumbers')).to.have.lengthOf(5);
    expect(wrapper.find('.endingDots')).to.have.lengthOf(0);
    expect(wrapper.find('.finalPage')).to.have.lengthOf(0);
  });
});

