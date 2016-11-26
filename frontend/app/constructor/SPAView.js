import { render } from "react-dom";
import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//------------------------------------------------------------------------------
import * as userActions from '../actions/UserActions';
import * as imagesActions from '../actions/ImagesActions';
import * as profileActions from '../actions/ProfileActions';
import * as newsActions from '../actions/NewsActions';
import * as friendsActions from '../actions/FriendsActions';
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
//------------------------------------------------------------------------------
import './style.scss'
//------------------------------------------------------------------------------
class SPAView extends React.Component{
  render() {
    const { setId } = this.props.userActions
    const { setCurrentUser } = this.props.userActions
    const { setProfile } = this.props.profileActions
    const { setStatus } = this.props.profileActions
    const { setPosts } = this.props.profileActions
    const { setComments } = this.props.profileActions
    const { setImages } = this.props.imagesActions
    const { setNews } = this.props.newsActions
    const { setFriends } = this.props.friendsActions
    var id = this.props.current_user.id
    var current_user = this.props.current_user
    return (
      <div>
        < Header id={id} current_user={current_user} setCurrentUser={setCurrentUser} />
        <div className="main-content">

          <div className="content">
            <div className="menu">
              {id=='0'?  < Login  setCurrentUser={setCurrentUser} /> : < Nav id={id}
                                                                             setId={setId}
                                                                             setProfile={setProfile}
                                                                             setNews={setNews}
                                                                             setImages={setImages}
                                                                             setFriends={setFriends} />}
            </div>
            <div className="yield_pages">
              < Profile profile={this.props.profile}
                        id={id}
                        setProfile={setProfile}
                        setPosts={setPosts}
                        setComments={setComments}
                        setStatus={setStatus} /><Friends friends={this.props.friends} setProfile={setProfile}/>
            </div>
          </div>
        </div>
        < Footer id={id} />
      </div>
    );
  }
};
//< Profile profile={this.props.profile} id={id} setProfile={setProfile}/>
//<Home />
//<EditUser user={current_user} />
//<Gallery images={this.props.images} />
//<News posts={this.props.news} setProfile={setProfile}/>
//<Friends friends={this.props.friends} setProfile={setProfile}/>
//------------------------------------------------------------------------------
function mapStateToProps (state) {
  return {
    current_user: state.current_user,
    images: state.images.images,
    profile: state.profile,
    news: state.news.news,
    friends: state.friends.friends
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    imagesActions: bindActionCreators(imagesActions, dispatch),
    profileActions: bindActionCreators(profileActions, dispatch),
    newsActions: bindActionCreators(newsActions, dispatch),
    friendsActions: bindActionCreators(friendsActions, dispatch)
  }
}
//------------------------------------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(SPAView)
