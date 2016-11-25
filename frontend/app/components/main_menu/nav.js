import React, { PropTypes } from 'react';
import './style.scss'

export default class Nav extends React.Component {
  navChange = (url, location, event) => {
    axios.get('/be'+url)
    .then((response) => {console.log(response);
      switch (location) {
        case 'profile':
          return this.props.setProfile(response.data.data)

        case 'news':
          return this.props.setNews(response.data.posts)

        case 'gallery':
          return this.props.setImages(response.data.images)

        case 'friends':
          return this.props.setFriends(response.data.friends)

        case 'messages':
          return this.props.setMessages(response.data.messages)

        default:
          return NUL;
      }

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
          <a onClick={this.navChange.bind(this, "/users/"+this.props.id+"/posts", 'news')}>
            <li>News</li>
          </a>
          <a onClick={this.navChange.bind(this, "/users/"+this.props.id+"/friends", 'friends')}>
            <li>Friends</li>
          </a>
          <a onClick={this.navChange.bind(this, "/users/"+this.props.id+"/images", 'gallery')}>
            <li>Gallery</li>
          </a>
        </ul>
      </div>
    );
  }
};
