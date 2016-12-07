import React, { PropTypes } from 'react';
import './comment.scss'

export default class NewComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: false};
  }
  componentDidUpdate() {
    this.refs.commentTextarea.focus()
  }
  handleShow = (event) => {
    this.setState({ show: !(this.state.show) });
  }
  handleComment = (event) => {
    event.preventDefault();
    this.refs.commentTextarea.value.length>0?
      axios({
        method: "POST",
        url: '/be/users/'+this.props.id+'/comments',
        data: {'text': this.refs.commentTextarea.value,
               'post_id': this.props.post_id }
      })
      .then((response) => { this.props.setComments(response.data.comments) }) : ''
    this.setState({ show: false })
    this.setState({ text: '' })
  }

  render() {
    return (
      <div className="NewComment">
        <button className="new-comment"
                onClick={this.handleShow}
                style={{display: (this.state.show? "none" : "block")}}>
          Write your new comment
        </button>

        <div className="comment-forms"
             style={{display: (this.state.show? "block" : "none")}}>
          <form data-remote="true">
            <textarea placeholder="Write your new post"
                      ref="commentTextarea"
                      type="text" />
            <br/>

            <button name="button" onClick={this.handleComment}>Send</button>
          </form>
        </div>
      </div>
    );
  }
};
