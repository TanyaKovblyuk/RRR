import React, { PropTypes } from 'react';
require("./style.scss")
require("url-loader?mimetype=image/png!./up.png");
require("url-loader?mimetype=image/png!./setting.png");

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {disabled: false};
  }
  handleShow(event){
    event.preventDefault();
    this.setState({ disabled: !this.state.disabled });
  }
  logOutClick(event){
    this.props.addContactId('0')
    this.props.addContactPage('login')
  }
  editClick(event){
    this.props.addContactPage('edit')
  }

  render() {
    return (
      <li className="dropdown">
        <p onClick={this.handleShow}>
          <span>{this.props.surname}</span>
          <img src="/assets/setting.png" />
        </p>
        <div className="dropdown-up" style={{display: (this.state.disabled? "block" : "none")}}></div>
        <ul className="dropdown-menu" style={{display: (this.state.disabled? "block" : "none")}}>
          <a onClick={this.editClick}>
            <li>Edit profile</li>
          </a>
          <a href={"/logout"} data-method="delete" data-remote="true" onClick={this.logOutClick}>
            <li>Log out</li>
          </a>
        </ul>
      </li>
    );
  }
};
