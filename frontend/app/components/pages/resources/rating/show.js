import React, { PropTypes } from 'react';
import './style.scss'

export default class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {like: this.props.rating.like,
                  dislike: this.props.rating.dislike};
  }

  sendRating = (value, event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "/be/rating",
      data: (this.props.item=='post'? {like: value, 'post_id': this.props.id} :
                                      {like: value, 'comment_id': this.props.id})
    })
    .then((response) => {
      this.setState({like: response.data.rating.like})
      this.setState({dislike: response.data.rating.dislike})
    })
  }

  render() {
    return (
      <div className="rating">
        <span className="like" onClick={this.sendRating.bind(this, true)}>
          {this.state.like}
        </span>
        <span className="dislike" onClick={this.sendRating.bind(this, false)}>
          {this.state.dislike}
        </span>
      </div>
    );
  }
};
