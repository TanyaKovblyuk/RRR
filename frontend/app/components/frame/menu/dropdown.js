import React, { PropTypes } from 'react';
import { Link } from 'react-router';
require("./style.scss")

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {disabled: false};
  }
  handleShow = (event) => {
    event.preventDefault();
    this.setState({ disabled: !this.state.disabled });
  }
  logOutClick = (event) => {
    axios({
      method: 'delete',
      url: "/be/logout"
    });
    this.props.setCurrentUser({id: '0'})
    localStorage.clear()
  }

  render() {
    return (
      <li className="dropdown">
        <p onClick={this.handleShow}>
          <span>{this.props.surname}</span>
          <span className="img"></span>
        </p>
        <div className="dropdown-up"
             style={{display: (this.state.disabled? "block" : "none")}}>
        </div>
        <ul className="dropdown-menu"
            style={{display: (this.state.disabled? "block" : "none")}}>
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
