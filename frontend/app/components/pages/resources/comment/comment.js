import React, { PropTypes } from 'react';
import './style.scss'

import MinAvatar from '../image/min_avatar';
import Rating from '../rating/show';

export default class Comment extends React.Component {
  handleDelete = (event) => {
    event.preventDefault();
    axios({
      method: "DELETE",
      url: "/be/users/"+this.props.author.id+"/comments/"+this.props.comment.id
    })
    .then((response) => { this.props.setComments(response.data.comments) })
  }

  render() {
    return (
      <div className="comment">
        < MinAvatar img={this.props.img}
                    user={this.props.author}
                    setProfile={this.props.setProfile} />
        <a href={"/ant-eater/users/"+this.props.author.id}
           className="author"
           data-remote="true">
           {this.props.author.name+' '+this.props.author.surname}
        </a>
        <hr className="line" />
        <p className="date">{this.props.comment.created_at}</p>
        <div className="comment-content">
          <p className="comment-text">{this.props.comment.text}</p>
        </div>
        <a data-remote="true"
           style={{display: (this.props.current? "block" : "none")}}
           className="edit-comment"
           onClick={this.handleDelete}>
           Delete
        </a>
        <Rating rating={this.props.rating}
                item={'comment'}
                id={this.props.comment.id} />
      </div>
    );
  }
};
