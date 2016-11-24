import React, { PropTypes } from 'react';
import './ico_list.scss'

export default class AvatarIco extends React.Component {
  navVisit = (url, location, event) => {
    $.ajax({
      type: "GET",
      url: "/users/"+String(this.props.user.id),
      success: (response) => {
        if (response.status) { this.props.addContactPage('profile'),
                               this.props.addContactData(response.data)}
      },
    })
  }

  render() {
    return (
      <a onClick={this.navVisit}>
        <figure className="pfofile-friend">
          <p><img src={this.props.img} /></p>
          <figcaption>{this.props.user.name}</figcaption>
        </figure>
      </a>
    );
  }
};
