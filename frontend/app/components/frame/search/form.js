import React, { PropTypes } from 'react';
import { Router, Route, browserHistory } from 'react-router';
//------------------------------------------------------------------------------
import './style.scss'
require("url-loader?mimetype=image/png!./search.png");

export default class Search extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: '/be/search',
      data: {'line': (this.refs.searchInput.value||'')}
    })
    .then((response) => { this.props.setFriends(response.data.friends) })
    this.refs.searchInput.value=''
    browserHistory.push('/ant-eater/people')
  }

  render() {
    return (
      <form className="search-form" data-remote="true" onSubmit={this.handleSubmit}>
        <input placeholder="Search"
               autoFocus="autofocus"
               ref="searchInput"
               type="text"
               className="form-control"/>
        <br/>

        <button name="button" type="submit" hidden="true">Search!</button>
      </form>
    );
  }
};
