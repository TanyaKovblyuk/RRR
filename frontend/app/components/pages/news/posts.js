import React, { PropTypes } from 'react';
import './style.scss'

import MinAvatar from '../resources/image/min_avatar';

export default class News extends React.Component{
  render() {
    return (
      <div className="news-show">
        {this.props.posts.map(function(post, index){
          return (
              <div className="news" key={index}>
                < MinAvatar img={post.img}
                            user={{name: post.user_name, id: post.user_id}}
                            setProfile={this.props.setProfile} />
                <p className="name">{post.user_name}</p>
                <p className="time">{post.post.created_at}</p>
                <hr />
                <p className="text">{post.post.text}</p>
              </div>
          )}, this)}
      </div>
    );
  }
};
