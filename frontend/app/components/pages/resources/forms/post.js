import React, { PropTypes } from 'react';
import './post.scss'

export default class NewPost extends React.Component {
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
  handlePost = (event) => {
    event.preventDefault();
    this.state.text.length>5?
      axios({
        method: "POST",
        url: '/be/users/'+this.props.id+'/posts',
        data: {'text': this.state.text}
      })
      .then((response) => { this.props.setPosts(response.data.posts) }) : ''
    this.setState({ show: false })
    this.setState({ text: '' })
  }

  render() {
    return (
      <div className="NewPost" style={{display: (this.props.user_id==this.props.id? "block" : "none")}}>
        <div className="to-create-post" style={{display: (this.state.show? "none" : "block")}}>
          <button className="new-post" onClick={this.handleShow}>Write your new post</button>
        </div>
        <div className="post-forms create-post" style={{display: (this.state.show? "block" : "none")}}>
          <form data-remote="true">
            <textarea className="post-create-body"
                      placeholder="Write your new post"
                      autoFocus={this.state.show}
                      value={this.state.text.length==0? '' : this.state.text}
                      type="text"
                      onChange={this.textChange}/><br/>

            <button name="button" onClick={this.handlePost}>Send</button>
          </form>
        </div>
      </div>
    );
  }
};
