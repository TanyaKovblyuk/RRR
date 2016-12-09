import React, { PropTypes } from 'react';
import './message.scss'

export default class NewMessage extends React.Component {
  componentDidUpdate() {
    this.refs.messageTextarea.focus()
  }
  handleClose = (event) => {
    event.preventDefault();
    this.props.ContactGetShow(false)
  }
  handleSend = (event) => {
    event.preventDefault();
    this.refs.messageTextarea.value.length>0?
      axios({
        method: "POST",
        url: '/be/users/'+this.props.id+'/messages',
        data: {'text': this.refs.messageTextarea.value}
      }) : ''
    this.refs.messageTextarea.value=''
    this.props.ContactGetShow(false)
  }

  render() {
    return (
      <div className="send-message"
           style={{display: (this.props.show? "block" : "none")}}>
        <form data-remote="true">
          <textarea className="message-create-body"
                    placeholder="Write your message"
                    ref="messageTextarea"
                    type="text"
                    onChange={this.textChange}/><br/>
          <hr className="comment-margin" />
          <button name="button" onClick={this.handleSend}>Send</button>
          <button name="button" onClick={this.handleClose}>Close</button>
        </form>
      </div>
    );
  }
};
