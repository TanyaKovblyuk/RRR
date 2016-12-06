import React, { PropTypes } from 'react';
import './style.scss'

import MinAvatar from '../image/min_avatar';
import Rating from '../rating/show';
import PostImages from './post_images';

export default class Post extends React.Component {
  handleDelete = (event) => {
    event.preventDefault();
    axios({
      method: "DELETE",
      url: "/be/users/"+this.props.author.id+"/posts/"+this.props.post.id
    })
    .then((response) => { this.props.setPosts(response.data.posts) })
  }

  render() {
    return (
      <div className="post">
        < MinAvatar img={this.props.img}
                    user={this.props.author}
                    setProfile={this.props.setProfile} />
        <p className="author">{this.props.author.name+' '+this.props.author.surname}</p>
        <p className="date">{this.props.post.created_at}</p>
        <hr className="line" />
        < PostImages images={this.props.src} />
        <div className="post-content">
          <p className="post-text">{this.props.post.text}</p>
        </div>
        <a data-remote="true"
           style={{display: (this.props.current? "block" : "none")}}
           className="edit-post"
           onClick={this.handleDelete}>
           Delete
        </a>
        <Rating rating={this.props.rating} item={'post'} id={this.props.post.id} />
      </div>
    );
  }
};
