import React, { PropTypes } from 'react';
import './message.scss'

export default class NewMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  textChange = (event) => {
    this.setState({ text: event.target.value })
  }
  handleClose = (event) => {
    event.preventDefault();
    this.setState({ show: !(this.state.show) })
    this.props.ContactGetShow(false)
  }
  handleSend = (event) => {
    event.preventDefault();
    this.state.text.length>0?
      axios({
        method: "POST",
        url: '/be/users/'+this.props.id+'/messages',
        data: {'text': this.state.text}
      }) : ''
    this.setState({ text: '' })
    this.props.ContactGetShow(false)
  }

  render() {
    return (
      <div className="send-message" style={{display: (this.props.show? "block" : "none")}}>
        <form data-remote="true">
          <textarea className="message-create-body"
                    placeholder="Write your message"
                    autoFocus={this.state.show}
                    value={this.state.text.length==0? '' : this.state.text}
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
