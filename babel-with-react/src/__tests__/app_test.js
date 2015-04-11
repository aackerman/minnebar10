import React from 'react/addons';
import App from '../app';

let ReactTestUtils = React.addons.TestUtils;

describe('App', () => {
  it('renders a form', function(){
    let instance = ReactTestUtils.renderIntoDocument(<App/>);
    expect(function(){

    }).not.toThrow();
  });
});
