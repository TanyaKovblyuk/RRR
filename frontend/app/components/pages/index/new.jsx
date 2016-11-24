import React, { PropTypes } from 'react';
import './style.scss'

import NewUser from '../resources/user/new';
require("url-loader?mimetype=image/png!./title.png");
require("url-loader?mimetype=image/png!./title2.png");

export default class Home extends React.Component {
  render() { return ( <User /> ); }
};

var User = React.createClass({
  render: function() {
    return (
      <div className="root-page">
        <div className="root-content">
        </div>
        <div className="create-user">
          <span className="click-to-create"> New user? </span>
          < NewUser />
        </div>
      </div>
    );
  },
});
