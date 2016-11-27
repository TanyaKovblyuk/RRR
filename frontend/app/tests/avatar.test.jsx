var ReactTestUtils = require('react-addons-test-utils');
import React from 'react';
import renderer from 'react-test-renderer';

it('renders correctly Avatar', () => {
  const tree = renderer.create(
    <Avatar src="/some.jpg"/>
  ).toJSON();
  expect(tree.type).toContain("figure");
  expect(tree.props.className).toContain("avatar");
  expect(tree.children[0].type).toContain("p");
  expect(tree.children[0].children[0].type).toContain("img");
  expect(tree.children[0].children[0].props.className).toContain("with");
  expect(tree.children[0].children[0].props.src).toContain("/some.jpg");
});

//------------------------------------------------------------------------------

export default class Avatar extends React.Component {
  render() {
    return (
      <figure className="avatar">
        <p><img src={this.props.src} className="with" id={(new Date()).getTime()} /></p>
      </figure>
    );
  }
};
