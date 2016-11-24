import React, { PropTypes } from 'react';
require("./header.scss")
require("url-loader?mimetype=image/png!./header.png");

import Dropdown from './menu/dropdown';
import Search from './search/form';

export default class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <a href={this.props.id=='0' ? "/" : "/users/"+this.props.id } data-remote="true" id="logo">Ant-eater</a>

        <Search />

        <nav>
          <ul className="header-nav">
            {this.props.id=='0' ? < Reload /> : < Dropdown id={this.props.id}
                                                           surname={this.props.current_user.surname}
                                                           addContactId={this.props.addContactId}
                                                           addContactPage={this.props.addContactPage} />}
          </ul>
        </nav>
      </div>
    );
  }
};

var Reload = React.createClass({
  render: function() {
    return (
      <a href="/" data-remote="true">
        <li className="log-in">Log in</li>
      </a>
    );
  },
});
