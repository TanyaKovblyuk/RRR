import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import './min_avatar.scss'

export default class MinAvatar extends React.Component {
  navVisit = (event) => {
    axios.get("/be/users/"+this.props.user.id)
    .then((response) => { this.props.setProfile(response.data.data) })
  }

  render() {
    return (
      <Link to={"/user/"+this.props.user.surname} onClick={this.navVisit}>
        <figure className="pfofile-friend">
          <p><img src={this.props.img} /></p>
        </figure>
      </Link>
    );
  }
};
