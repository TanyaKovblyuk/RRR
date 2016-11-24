import React, { PropTypes } from 'react';
import './friend.scss'

import AvatarIco from '../resources/image/ico_list';

export default class Friends extends React.Component{
  navVisit = (id, event) => {
    $.ajax({
      type: "GET",
      url: "/users/"+id,
      success: (response) => {
        if (response.status) { this.props.addContactPage('profile'),
                               this.props.addContactData(response.data)}
      },
    })
  }

  render() {
    return (
      <div className="show-all-friends">
        <h1>Friends</h1>
        <hr/>
        <div className="friends">
          {this.props.friends.map(function(friend, index){
            return (
              <div className="one-friend" key={index}>
                  <a onClick={this.navVisit.bind(this, friend.user.id)}>
                    <figure key={(new Date()).getTime()}>
                      <img src={friend.avatar} />
                    <figcaption>{friend.user.name}</figcaption>
                  </figure>
                </a>
              </div>
            )}, this)}
        </div>
        <hr className="bottom" />
      </div>
    );
  }
};
