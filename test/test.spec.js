const expect = require('chai').expect;
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('Travis Test', () => {
  it('Test 1', () => {
    expect(1 + 1).to.equal(2);
  });
});

describe('Recipe Pages', () => {
  beforeEach('set up wrapper', () => {
    wrapper = shallow(<Recipies />);
  });
  it('correctly filters by recipe', () => {});
});
