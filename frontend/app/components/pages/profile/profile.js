import React, { PropTypes } from 'react';

import Avatar from '../resources/image/avatar';
import AvatarIco from '../resources/image/ico_list';
import UserInfo from '../resources/user/info';
import UserActions from '../resources/user/actions';
import NewMessage from '../resources/forms/message';
import NewPost from '../resources/forms/post';
import Post from '../resources/post/post';
import NewComment from '../resources/forms/comment';
import Comment from '../resources/comment/comment';

import './style.scss'

export default class Profile extends React.Component{
  constructor(props) {
    super(props);
    this.state = {show: false};
  }
  addContactGetShow = (contact) => {
    this.setState({show: contact})
  }

  render() {
    var profile = this.props.profile
    return (
      <div className="user-show">
        <div className="profile-static">
          < Avatar src={profile.avatar} />
          <hr />
          < UserActions id={this.props.id}
                        user_id={profile.user.id}
                        is_friend={profile.is_friend}
                        setStatus={this.props.setStatus}
                        ContactGetShow={this.addContactGetShow} />
          < NewMessage id={profile.user.id}
                       show={this.state.show}
                       ContactGetShow={this.addContactGetShow} />
          <div className="friends">
            <p className="friends-h1">Friends<a>Show all</a></p>
            {(profile.friends==undefined? [] : profile.friends).map(function(friend, index) {
              return (
                < AvatarIco user={friend.user}
                            img={friend.avatar}
                            setProfile={this.props.setProfile}
                            key={index} /> )}, this)}
          </div>
          <hr className="bottom" />
        </div>
        <div className="profile-activity">
          < UserInfo user={profile.user} statistics={profile.statistics} />
          < NewPost id={this.props.id}
                    user_id={profile.user.id}
                    setPosts={this.props.setPosts} />
          {profile.posts.map(function(post, index){
            return (
              <div key={(new Date()).getTime()+100*index}>
                < Post author={profile.user}
                               img={profile.avatar}
                               current={this.props.id==profile.user.id}
                               src={post.img}
                               post={post.post}
                               rating={post.rating}
                               key={post.post.id}
                               setProfile={this.props.setProfile}
                               setPosts={this.props.setPosts} />
                {(profile.comments[index]==undefined? [] : profile.comments[index]).map(function(comment, index) {
                  return (
                    < Comment comment={comment.comment}
                              author={comment.user}
                              rating={comment.rating}
                              current={this.props.id==comment.user.id}
                              setProfile={this.props.setProfile}
                              setComments={this.props.setComments}
                              key={index}
                              img={comment.avatar} /> )}, this)}
                < NewComment key={(new Date()).getTime()+index}
                             post_id={post.post.id}
                             id={this.props.id}
                             setComments={this.props.setComments} />
              </div>
            )}, this)}
        </div>
      </div>
    );
  }
};
