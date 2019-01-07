import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import React from 'react';
import {ADD_RECIPE, _addRecipe } from '../src/reducers/recipe.js';
import fetchMock from 'fetch-mock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { recipes as recipesJSON} from './json/recipes.json';

const mockStore = configureMockStore(thunk)

describe('add recipe action', () => {
  it('should create an action to add a recpie', () => {
    const testRecipe = recipesJSON[0]
    const expectedAction = {
      type: ADD_RECIPE,
      recipe: testRecipe
    }
    expect(_addRecipe(testRecipe)).to.eql(expectedAction)
  })
})

  //it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
    //fetchMock.getOnce('/todos', {
      //body: { todos: ['do something'] },
      //headers: { 'content-type': 'application/json' }
    //})


