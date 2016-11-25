import React, { PropTypes } from 'react';
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
  }

  render() {
    return (
      <li className="dropdown">
        <p onClick={this.handleShow}>
          <span>{this.props.surname}</span>
          <span className="img"></span>
        </p>
        <div className="dropdown-up" style={{display: (this.state.disabled? "block" : "none")}}></div>
        <ul className="dropdown-menu" style={{display: (this.state.disabled? "block" : "none")}}>
          <a>
            <li>Edit profile</li>
          </a>
          <a onClick={this.logOutClick}>
            <li>Log out</li>
          </a>
        </ul>
      </li>
    );
  }
};
