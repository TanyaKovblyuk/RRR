import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//------------------------------------------------------------------------------
import * as profileActions from '../../../actions/ProfileActions';
import * as newsActions from '../../../actions/NewsActions';
//------------------------------------------------------------------------------
import './style.scss'

import MinAvatar from '../resources/image/min_avatar';

var contact;

class News extends React.Component{
  componentWillMount() {
    contact=this;
  }
  render() {
    const { setProfile } = this.props.profileActions
    return (
      <div className="news-show">
        {this.props.posts.map(function(post, index){
          return (
              <div className="news" key={index}>
                < MinAvatar img={post.img}
                            user={{name: post.user_name, id: post.user_id}}
                            setProfile={setProfile} />
                <p className="name">{post.user_name}</p>
                <p className="time">{post.post.created_at}</p>
                <hr />
                <p className="text">{post.post.text}</p>
              </div>
          )}, this)}
          <hr className='bottom-news'/>
      </div>
    );
  }
};
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
      const { setPosts } = contactProfile.props.profileActions
      axios.post('/be/set', {num: document.getElementsByClassName("post").length,
                             user_id: contactProfile.props.id})
      .then((response) => { setPosts(response.data.posts) })
    }
  }
}
//------------------------------------------------------------------------------
function mapStateToProps (state) {
  return {
    posts: state.news.news,
    id: state.current_user.id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    profileActions: bindActionCreators(profileActions, dispatch),
    newsActions: bindActionCreators(newsActions, dispatch)
  }
}
//------------------------------------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(News)
