import React, { PropTypes } from 'react';
import { Router, Route, browserHistory } from 'react-router';
//------------------------------------------------------------------------------
import './style.scss'
require("url-loader?mimetype=image/png!./search.png");

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
