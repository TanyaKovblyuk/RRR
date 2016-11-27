var ReactTestUtils = require('react-addons-test-utils');
import React from 'react';
import renderer from 'react-test-renderer';

it('renders correctly Search', () => {
  const tree = renderer.create(
    <Search />
  ).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.type).toContain("form");
  expect(tree.props.className).toContain("search-form");
  expect(tree.children[0].props.className).toContain("form-control");
  expect(tree.children[0].props.placeholder).toContain("Search");
});

//------------------------------------------------------------------------------

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {str: ''};
  }

  searhChange = (event) => {
    this.setState({ str: event.target.value });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: '/be/search',
      data: {'line': this.state.str}
    })
    .then((response) => { this.props.setFriends(response.data.friends) })
    this.setState({ str: '' })
    browserHistory.push('/people')
  }

  render() {
    return (
      <form className="search-form" data-remote="true" onSubmit={this.handleSubmit}>
        <input placeholder="Search" autoFocus="autofocus" type="text" className="form-control" onChange={this.searhChange}/><br/>

        <button name="button" type="submit" hidden="true">Search!</button>
      </form>
    );
  }
};
