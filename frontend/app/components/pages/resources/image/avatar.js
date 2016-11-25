import React, { PropTypes } from 'react';
import './avatar.scss'

export default class Avatar extends React.Component {
  render() {
    return (
      <figure className="avatar">
        <p><img src={this.props.src} className="with" id={(new Date()).getTime()} /></p>
      </figure>
    );
  }
};
