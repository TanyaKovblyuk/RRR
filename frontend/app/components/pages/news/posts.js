import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//------------------------------------------------------------------------------
import * as profileActions from '../../../actions/ProfileActions';
import * as newsActions from '../../../actions/NewsActions';
//------------------------------------------------------------------------------
import MinAvatar from '../resources/image/min_avatar';
import PostImages from '../resources/post/post_images';
//------------------------------------------------------------------------------
import './style.scss'

class News extends React.Component{
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
                <div className="news-images" style={{display: (post.src==''? "none" : "block")}}>
                  < PostImages images={post.src} />
                  <hr/>
                </div>
                <p className="text">{post.post.text}</p>
              </div>
          )}, this)}
          <hr className='bottom-news'/>
      </div>
    );
  }
};
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
