import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
//------------------------------------------------------------------------------
import * as imagesActions from '../../actions/ImagesActions';
import * as profileActions from '../../actions/ProfileActions';
import * as newsActions from '../../actions/NewsActions';
import * as friendsActions from '../../actions/FriendsActions';
import * as messagesActions from '../../actions/MessagesActions';
//------------------------------------------------------------------------------
import './style.scss'

class Nav extends React.Component {
  linkEnter = (url, location, event) => {
    const { setProfile } = this.props.profileActions
    const { setImages } = this.props.imagesActions
    const { setNews } = this.props.newsActions
    const { setFriends } = this.props.friendsActions
    const { setMessages } = this.props.messagesActions

    axios.get('/be'+url)
    .then((response) => {
      switch (location) {
        case 'profile':
          return setProfile(response.data.data)
        case 'news':
          return setNews(response.data.posts)
        case 'gallery':
          return setImages(response.data.images)
        case 'friends':
          return setFriends(response.data.friends)
        case 'followers':
          return setFriends(response.data.friends)
        case 'messages':
          return setMessages(response.data.messages)
        default:
          return NUL;
      }
    })
  }

  render() {
    return (
      <div className="main-menu">
        <ul>
          <Link to="/ant-eater/profile"
                onClick={this.linkEnter.bind(this, "/users/"+this.props.id, 'profile')}>
            <li >
              Profile
            </li>
          </Link>
          <Link to={"/ant-eater/users/"+this.props.id+"/messages"}
                onClick={this.linkEnter.bind(this, "/users/"+this.props.id+"/messages", 'messages')}>
            <li >
                Messages
            </li>
          </Link>
          <Link to={"/ant-eater/users/"+this.props.id+"/posts"}
                onClick={this.linkEnter.bind(this, "/users/"+this.props.id+"/posts", 'news')}>
            <li >
                News
            </li>
          </Link>
          <Link to={"/ant-eater/users/"+this.props.id+"/friends"}
                onClick={this.linkEnter.bind(this, "/users/"+this.props.id+"/friends", 'friends')}>
            <li >
                Friends
            </li>
          </Link>
          <Link to={"/ant-eater/users/"+this.props.id+"/followers"}
                onClick={this.linkEnter.bind(this, "/users/"+this.props.id+"/followers", 'followers')}>
            <li >
                Followers
            </li>
          </Link>
          <Link to={"/ant-eater/users/"+this.props.id+"/images"}
                onClick={this.linkEnter.bind(this, "/users/"+this.props.id+"/images", 'gallery')}>
            <li >
                Gallery
            </li>
          </Link>
        </ul>
      </div>
    );
  }
};

function mapStateToProps (state) {
  return {
    id: state.current_user.id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    imagesActions: bindActionCreators(imagesActions, dispatch),
    profileActions: bindActionCreators(profileActions, dispatch),
    newsActions: bindActionCreators(newsActions, dispatch),
    friendsActions: bindActionCreators(friendsActions, dispatch),
    messagesActions: bindActionCreators(messagesActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
