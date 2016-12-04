import { render } from "react-dom";
import React from "react";
import axios from "axios";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
//------------------------------------------------------------------------------
import * as profileActions from '../actions/ProfileActions';
import * as userActions from '../actions/UserActions';
import * as imagesActions from '../actions/ImagesActions';
import * as newsActions from '../actions/NewsActions';
import * as friendsActions from '../actions/FriendsActions';
import * as messagesActions from '../actions/MessagesActions';
//------------------------------------------------------------------------------
import Home from '../components/pages/index/new';
import Profile from '../components/pages/profile/profile';
import News from '../components/pages/news/posts';
import Friends from '../components/pages/friends/friends';
import EditUser from '../components/pages/resources/forms/edit_user';
import Gallery from '../components/pages/gallery/show';
import Messages from '../components/pages/messages/index';
//------------------------------------------------------------------------------
import SPAView from './SPAView';

var contact;

class Routing extends React.Component{
  componentWillMount() {
    getNewState (this)
    contact=this
  }

  render() {
    return (
      < Router history={browserHistory} >
        < Route path="/ant-eater" component={SPAView} >
          < IndexRoute component={Home} />
          < Route path="profile" component={Profile} />
          < Route path="users/:id" component={Profile} />
          < Route path="/ant-eater/users/:id/messages" component={Messages} />
          < Route path="/ant-eater/users/:id/posts" component={News} />
          < Route path="/ant-eater/users/:id/friends" component={Friends} />
          < Route path="/ant-eater/users/:id/propose" component={Friends} />
          < Route path="people" component={Friends} />
          < Route path="/ant-eater/users/:id/images" component={Gallery} />
          < Route path="/ant-eater/users/:id/edit" component={EditUser} />
        </ Route >
      </ Router >
    );
  }
};

function location (link) {
  var res = 'profile';
  ['posts', 'propose', 'images', 'messages', 'friends', 'edit'].forEach(function(key) {
    if (link.includes(key)) { res = key }
  });
  return res;
};

function getNewState (e) {
  const { setCurrentUser } = e.props.userActions
  const { setProfile } = e.props.profileActions
  const { setImages } = e.props.imagesActions
  const { setNews } = e.props.newsActions
  const { setFriends } = e.props.friendsActions
  const { setMessages } = e.props.messagesActions
  axios.get('/be/start')
  .then((response) => {
    if (response.data.status==true) {
      setCurrentUser(response.data.current_user)
      var link = browserHistory.getCurrentLocation().pathname
      if (link.substr(11,30)=='') link='/ant-eater/profile'
      var url = link.substr(11,30)=='profile'? ('/ant-eater/users/'+response.data.current_user.id) : link
      axios.get('/be'+url.substr(10,100))
      .then((response) => {
        switch (location(link)) {
          case 'profile':
            return setProfile(response.data.data)
          case 'posts':
            return setNews(response.data.posts)
          case 'images':
            return setImages(response.data.images)
          case 'friends':
            return setFriends(response.data.friends)
          case 'propose':
            return setFriends(response.data.friends)
          case 'messages':
            return setMessages(response.data.messages)
          case 'edit':
            ''
          default:
            return undefined;
        }
      })
      browserHistory.replace(link)
    }
    else {
      browserHistory.replace('/ant-eater')
    }
  })
}
//------------------------------------------------------------------------------
window.onscroll = function(state) {
  if (document.getElementsByClassName("bottom-news").length!=0) {
    var bottom = document.getElementsByClassName("bottom-news")[0].getBoundingClientRect().top;
    var viewHeight = window.innerHeight;
    if (viewHeight==bottom+53) {
      const { setNews } = contact.props.newsActions
      axios.post('/be/set', {num: document.getElementsByClassName("news").length,
                             news: true})
      .then((response) => { setNews(response.data.posts) })
    }
  }
  if (document.getElementsByClassName("bottom").length!=0) {
    var bottom = document.getElementsByClassName("bottom")[1].getBoundingClientRect().top;
    var viewHeight = window.innerHeight;
    if (viewHeight==bottom+53) {
      const { setPosts } = contact.props.profileActions
      axios.post('/be/set', {num: document.getElementsByClassName("post").length,
                             user_id: contact.props.id})
      .then((response) => { setPosts(response.data.posts) })
    }
  }
}
//------------------------------------------------------------------------------
function mapStateToProps (state) {
  return {
    id: state.current_user.id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    profileActions: bindActionCreators(profileActions, dispatch),
    imagesActions: bindActionCreators(imagesActions, dispatch),
    profileActions: bindActionCreators(profileActions, dispatch),
    newsActions: bindActionCreators(newsActions, dispatch),
    friendsActions: bindActionCreators(friendsActions, dispatch),
    messagesActions: bindActionCreators(messagesActions, dispatch)
  }
}
//------------------------------------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(Routing)
