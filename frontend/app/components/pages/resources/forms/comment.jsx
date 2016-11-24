import React, { PropTypes } from 'react';
import './comment.scss'

export default class NewComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: '',
                  show: false};
  }

  textChange = (event) => {
    this.setState({ text: event.target.value });
  }
  handleShow = (event) => {
    this.setState({ show: !(this.state.show) });
  }
  handleComment = (event) => {
    event.preventDefault();
    this.state.text.length>0?
      $.ajax({
        type: "POST",
        url: '/users/'+this.props.id+'/comments',
        data: {'text': this.state.text,
               'post_id': this.props.post_id },
        success: (response) => {
          response.status==true ? this.props.addContactComments(response.comments) : ''
        },
      }) : ''
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

        <div className="comment-forms" style={{display: (this.state.show? "block" : "none")}}>
          <form data-remote="true">
            <textarea placeholder="Write your new post"
                      autoFocus="autofocus"
                      type="text"
                      onChange={this.textChange}/><br/>

            <button name="button" onClick={this.handleComment}>Send</button>
          </form>
        </div>
      </div>
    );
  }
};
