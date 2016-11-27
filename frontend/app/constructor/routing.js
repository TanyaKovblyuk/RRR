import { render } from "react-dom";
import React from "react";
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
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

class Routing extends React.Component{
  render() {
    return (
      < Router history={browserHistory} >
        < Route path="/" component={SPAView} >
          < IndexRoute component={Home} />
          < Route path="profile" component={Profile} />
          < Route path="user/:name" component={Profile} />
          < Route path="messages" component={Messages} />
          < Route path="news" component={News} />
          < Route path="friends" component={Friends} />
          < Route path="friendship" component={Friends} />
          < Route path="people" component={Friends} />
          < Route path="gallery" component={Gallery} />
          < Route path="edit" component={EditUser} />
        </ Route >
      </ Router >
    );
  }
};


//------------------------------------------------------------------------------
function mapStateToProps (state) {
  return {
    id: state.current_user.id
  }
}
//------------------------------------------------------------------------------
export default connect(mapStateToProps)(Routing)
