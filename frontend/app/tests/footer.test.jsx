var ReactTestUtils = require('react-addons-test-utils');
import React from 'react';
import renderer from 'react-test-renderer';
import { Link } from 'react-router';

it('renders correctly Footer', () => {
  const tree = renderer.create(
    <Footer id={0}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly footers logo', () => {
  const tree = renderer.create(
    <Footer id={3}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.type).toContain("div");
  expect(tree.children[0].children[0]).toContain("Ant-eater");
  expect(tree.children[0].props.id).toContain("logo-footer");
});

//------------------------------------------------------------------------------

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <Link to={this.props.id=='0' ? "/" : "/profile" }
           data-remote="true" id="logo-footer">
           Ant-eater
        </Link>
      </div>
    );
  }
};
