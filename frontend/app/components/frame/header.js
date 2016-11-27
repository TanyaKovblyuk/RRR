import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//------------------------------------------------------------------------------
import * as userActions from '../../actions/UserActions';
import * as friendsActions from '../../actions/FriendsActions';
import { Link } from 'react-router';
//------------------------------------------------------------------------------
require("./header.scss")
require("url-loader?mimetype=image/png!./header.png");

import Dropdown from './menu/dropdown';
import Search from './search/form';

class Header extends React.Component {
  render() {
    const { setCurrentUser } = this.props.userActions
    const { setFriends } = this.props.friendsActions
    var id = this.props.id
    return (
      <div className="header">
        <Link to={this.props.id=='0' ? "/" : "/profile" }
           data-remote="true" id="logo">
           Ant-eater
        </Link>

        {id!='0'? <Search setFriends={setFriends} /> : ''}

        <nav>
          <ul className="header-nav">
            {id=='0' ? < Reload /> : < Dropdown id={id}
                                                surname={this.props.current_user.surname}
                                                setCurrentUser={setCurrentUser} />}
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

//------------------------------------------------------------------------------
function mapStateToProps (state) {
  return {
    current_user: state.current_user,
    id: state.current_user.id,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    friendsActions: bindActionCreators(friendsActions, dispatch)
  }
}
//------------------------------------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(Header)
