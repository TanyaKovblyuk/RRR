import React, { PropTypes } from 'react';

import Login from '../components/session/login';
import Header from '../components/frame/header';
import Footer from '../components/frame/footer';
// import GoUp from '../components/up/go_up';
// import Nav from '../components/main_menu/nav';
// import Home from '../components/pages/index/new';
// import Profile from '../components/pages/profile/profile';
// import News from '../components/pages/news/posts';
// import Friends from '../components/pages/friends/friends';
// import EditUser from '../components/pages/resources/forms/edit_user';
// import Gallery from '../components/pages/gallery/show';

import './style.scss'

export default class SPAView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {data: this.props.data,
                  newsData: {},
                  friendsData: {},
                  imgData: {},
                  id: this.props.id,
                  nav: (this.props.id=='0'? 'login' : 'profile')};
  }
  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
  }

  addContactGetData(contact){
    this.setState({data: contact});
  }
  addContactGetPage(contact){
    this.setState({nav: contact});
  }

  render() {
    return (
      <div>
        < Header id={this.state.id} current_user={this.props.user} />
        <div className="main-content">

          <div className="content">
            <div className="menu">

              {this.props.id=='0'?

                        < Login /> :

                                                    < Nav id={this.state.id} />}


            </div>

            <div className="yield_pages">
            </div>
          </div>
        </div>
        < Footer id={this.props.id} />
      </div>
    );
  }
};
