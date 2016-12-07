import React, { PropTypes } from 'react';

import PostListImages from './post_list_images';

import './post.scss'

export default class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: false,
                  fileName: '',
                  uri: []};
  }
  componentDidUpdate() {
    this.refs.postTextarea.focus()
  }
  handleShow = (event) => {
    this.setState({ show: !(this.state.show) });
  }
  selectImage = (e) => {
    this.setState({fileName: e.target.value})

    if (this.state.uri.length<4) {
      var images=this.state.uri;
      var count=(e.target.files.length>4? 4 : e.target.files.length)
      for (var i=0;i<count;i++) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);

        reader.onload = (upload) => {
          images.push(upload.target.result);
          this.setState({ uri: images });
        };
      }
      this.setState({ uri: images, fileName: '' });
    }
  }
  getNumToDelete = (num) => {
    var images = this.state.uri
    images.splice( num, 1 )
    if (images.length==0) { images=[] }
    this.setState({uri: images})
  }
  handlePost = (event) => {
    event.preventDefault();
    if (this.refs.postTextarea.value.length>5||this.state.uri.length>0) {
      axios({
        method: "POST",
        url: '/be/users/'+this.props.id+'/posts',
        data: {'text': this.refs.postTextarea.value, image: this.state.uri}
      })
      .then((response) => {
        if (response.data.status) {this.props.setPosts(response.data.posts)}
      })
    }
    this.setState({ show: false, fileName: '', uri: []})
    this.refs.postTextarea.value=''
  }

  render() {
    return (
      <div className="NewPost"
           style={{display: (this.props.user_id==this.props.id? "block" : "none")}}>
        <div className="to-create-post"
             style={{display: (this.state.show? "none" : "block")}}>
          <button className="new-post"
                  onClick={this.handleShow}>Write your new post</button>
        </div>
        <div className="post-forms create-post"
             style={{display: (this.state.show? "block" : "none")}}>
          < PostListImages images={this.state.uri}
                           setNumToDelete={this.getNumToDelete}/>
          <form data-remote="true">
            <textarea className="post-create-body"
                      placeholder="Write your new post"
                      ref="postTextarea"
                      type="text" />
            <br/>

            <label htmlFor="upload-images">Add image</label>
            <input type="file"
                   id="upload-images"
                   name="file"
                   value={this.state.fileName}
                   className="inputFile"
                   onChange={this.selectImage}
                   multiple />

            <button name="button" onClick={this.handlePost}>Send</button>
          </form>
        </div>
      </div>
    );
  }
};
