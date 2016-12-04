import { render } from "react-dom";
import React from "react";
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import Websocket from 'react-websocket';
//------------------------------------------------------------------------------
import Login from '../components/session/login';
import Header from '../components/frame/header';
import Footer from '../components/frame/footer';
import GoUp from '../components/up/go_up';
import Nav from '../components/main_menu/nav';
import Home from '../components/pages/index/new';
import Profile from '../components/pages/profile/profile';
import News from '../components/pages/news/posts';
import Friends from '../components/pages/friends/friends';
import EditUser from '../components/pages/resources/forms/edit_user';
import Gallery from '../components/pages/gallery/show';
import Messages from '../components/pages/messages/index';
//------------------------------------------------------------------------------
import './style.scss'
//------------------------------------------------------------------------------
class SPAView extends React.Component{
  render() {
    return (
      <div>
        < Header />
        <div className="main-content">
          <div className="content">

            <div className="menu">
              {this.props.id=='0'?  < Login /> : < Nav />}
            </div>
            <div className="yield_pages">
              {this.props.children}
            </div>
          </div>
        </div>
        < Footer />
        <Websocket url='ws://localhost:3000/cable' onMessage={function(){}} />
      </div>
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
export default connect(mapStateToProps)(SPAView)
