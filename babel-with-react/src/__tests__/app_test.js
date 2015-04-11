import React from 'react/addons';
import App from '../app';

let ReactTestUtils = React.addons.TestUtils;
let Simulate = ReactTestUtils.Simulate;

describe('App', () => {
  it('renders a form', function(){
    let instance = ReactTestUtils.renderIntoDocument(<App/>);
    spyOn(instance, 'lookupUser').and.callFake(() => {});
    Simulate.submit(instance.refs.submitForm.getDOMNode());
    expect(instance.lookupUser).toHaveBeenCalled();
  });
});
