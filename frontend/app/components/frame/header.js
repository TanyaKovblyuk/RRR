import React, { PropTypes } from 'react';
require("./header.scss")
require("url-loader?mimetype=image/png!./header.png");

import Dropdown from './menu/dropdown';
import Search from './search/form';

export default class Header extends React.Component {
  render() {
    var id = this.props.id
    return (
      <div className="header">
        <a href={id=='0' ? "/" : "/users/"+id } data-remote="true" id="logo">Ant-eater</a>

        {id!='0'? <Search setFriends={this.props.setFriends} /> : ''}

        <nav>
          <ul className="header-nav">
            {id=='0' ? < Reload /> : < Dropdown id={id}
                                                surname={this.props.current_user.surname}
                                                setCurrentUser={this.props.setCurrentUser} />}
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
