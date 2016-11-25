import React, { PropTypes } from 'react';
import './friend.scss'

import AvatarIco from '../resources/image/ico_list';

export default class Friends extends React.Component{
  navVisit = (id, event) => {
    axios.get('/be/users/'+id)
    .then((response) => { this.props.setProfile(response.data.data) })
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
