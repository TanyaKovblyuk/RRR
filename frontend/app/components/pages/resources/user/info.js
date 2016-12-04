import React, { PropTypes } from 'react';
import './info.scss'

export default class UserInfo extends React.Component {
  render() {
    return (
      <div className="UserInfo">
        <p className="profile-name">
          {this.props.user.name+' '+this.props.user.surname}
          <span>{this.props.user.presence}</span>
        </p>
        <hr />
        <p className="activity">
          Users activity:
          friends {this.props.statistics.friends};
          posts {this.props.statistics.posts};
          images {this.props.statistics.images};
          comments {this.props.statistics.comments}.
        </p>
        <hr />
      </div>
    );
  }
};
