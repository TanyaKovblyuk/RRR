import React, { PropTypes } from 'react';
import './style.scss'

import MinAvatar from '../image/min_avatar';

export default class Post extends React.Component {
  handleDelete = (event) => {
    event.preventDefault();
    $.ajax({
      type: "DELETE",
      url: "users/"+this.props.author.id+"/posts/"+this.props.post.id,
      success: (response) => {
        if (response.status) {
          this.props.addContactPosts(response.posts)
          this.props.addContactComments(response.comments)
        }
      },
    })
  }

  render() {
    return (
      <div className="post">
        < MinAvatar img={this.props.img} user={this.props.author} />
        <p className="author">{this.props.author.name+' '+this.props.author.surname}</p>
        <p className="date">{this.props.post.created_at}</p>
        <hr className="line" />
        {this.props.src==''? '' : <img src={this.props.src} className="with" id={(new Date()).getTime()} />}
        <div className="post-content">
          <p className="post-text">{this.props.post.text}</p>
        </div>
        <a data-remote="true"
           style={{display: (this.props.current? "block" : "none")}}
           className="edit-post"
           onClick={this.handleDelete}>Delete</a>
      </div>
    );
  }
};
