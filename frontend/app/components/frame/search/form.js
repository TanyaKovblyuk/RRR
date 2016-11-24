import React, { PropTypes } from 'react';
import './style.scss'
require("url-loader?mimetype=image/png!./search.png");

export default class Search extends React.Component {
  render() { return ( <Form /> ); }
};

var Form = React.createClass({
  getInitialState: function() {
    return { str: '' };
  },

  searhChange: function(event) {
    this.setState({ str: event.target.value });
  },
  handleSubmit: function(event) {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: '/search',
      data: {'search': this.state.str},
      success: (response) => { console.log('it worked!', response)},
    })
  },

  render: function() {
    return (
      <form className="search-form" data-remote="true" onSubmit={this.handleSubmit}>
        <input placeholder="Search" autoFocus="autofocus" type="text" className="form-control" onChange={this.searhChange}/><br/>

        <button name="button" type="submit" hidden="true">Search!</button>
      </form>
    );
  },
});
