import React, { PropTypes } from 'react';
import './style.scss'

export default class Nav extends React.Component {
  navChange = (url, location, event) => {
    $.ajax({
      type: "GET",
      url: url,
      success: (response) => {
        if (response.status) { this.props.addContactPage(location);
                               this.props.addContactData(response.data);}
      },
    })
  }
  navNewsChange = (url, location, event) => {
    $.ajax({
      type: "GET",
      url: url,
      success: (response) => {
        if (response.status) { this.props.addContactNewsData(response.data);
                               this.props.addContactPage(location);}
      },
    })
  }
  navFriendsChange = (url, location, event) => {
    $.ajax({
      type: "GET",
      url: url,
      success: (response) => {
        if (response.status) { this.props.addContactFriendsData(response.data);
                               this.props.addContactPage(location);}
      },
    })
  }
  navImgChange = (url, location, event) => {
    $.ajax({
      type: "GET",
      url: url,
      success: (response) => {
        if (response.status) { this.props.addContactImgData(response.data);
                               this.props.addContactPage(location);}
      },
    })
  }

  render() {
    return (
      <div className="main-menu">
        <ul>
          <a onClick={this.navChange.bind(this, "/users/"+this.props.id, 'profile')}>
            <li>Profile</li>
          </a>
          <a onClick={this.navChange.bind(this, "/users/"+this.props.id+"/messages", 'message')}>
            <li>Messages</li>
          </a>
          <a onClick={this.navNewsChange.bind(this, "/users/"+this.props.id+"/posts", 'news')}>
            <li>News</li>
          </a>
          <a onClick={this.navFriendsChange.bind(this, "/users/"+this.props.id+"/friends", 'friends')}>
            <li>Friends</li>
          </a>
          <a onClick={this.navImgChange.bind(this, "/users/"+this.props.id+"/images", 'gallery')}>
            <li>Gallery</li>
          </a>
        </ul>
      </div>
    );
  }
};
