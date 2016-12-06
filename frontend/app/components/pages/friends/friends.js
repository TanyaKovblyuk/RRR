import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
//------------------------------------------------------------------------------
import * as profileActions from '../../../actions/ProfileActions';
//------------------------------------------------------------------------------
import './friend.scss';

import AvatarIco from '../resources/image/ico_list';

class Friends extends React.Component{
  navVisit = (id, event) => {
    const { setProfile } = this.props.profileActions
    axios.get('/be/users/'+id)
    .then((response) => { setProfile(response.data.data) })
  }

  render() {
    var title = (browserHistory.getCurrentLocation().pathname
                               .includes('followers')? 'Followers' : 'Friends')
    return (
      <div className="show-all-friends">
        <h1>{title}</h1>
        <hr/>
        <div className="friends">
          {this.props.friends.map(function(friend, index){
            return (
              <div className="one-friend" key={index}>
                  <Link to={"/ant-eater/users/"+friend.user.id}
                        onClick={this.navVisit.bind(this, friend.user.id)}>
                    <figure key={(new Date()).getTime()}>
                      <img src={friend.avatar} />
                    <figcaption>{friend.user.name}</figcaption>
                  </figure>
                </Link>
              </div>
            )}, this)}
        </div>
        <hr className="bottom-border" />
      </div>
    );
  }
};

function mapStateToProps (state) {
  return {
    friends: state.friends.friends
  }
}

function mapDispatchToProps(dispatch) {
  return {
    profileActions: bindActionCreators(profileActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends)
