import React, { PropTypes } from 'react';
import { Link } from 'react-router';

require("./style.scss")

export default class Dropdown extends React.Component {
  logOutClick = (event) => {
    axios({
      method: 'delete',
      url: "/be/logout"
    });
    localStorage.clear()
    location.reload()
  }
  render() {
    return (
      <li className="dropdown">
        <p>
          <span>{this.props.surname}</span>
          <span className="img"></span>
        </p>
        <ul className="dropdown-menu">
          <Link to={"/ant-eater/users/"+this.props.id+"/edit"}>
            <li>Edit profile</li>
          </Link>
          <Link to="/ant-eater" onClick={this.logOutClick}>
            <li>Log out</li>
          </Link>
        </ul>
      </li>
    );
  }
};
