import React, { PropTypes } from 'react';
import './min_avatar.scss'

export default class MinAvatar extends React.Component {
  render() {
    return (
      <a href={"/users/"+String(this.props.user.id)} data-remote="true">
        <figure className="pfofile-friend">
          <p><img src={this.props.img} /></p>
        </figure>
      </a>
    );
  }
};
