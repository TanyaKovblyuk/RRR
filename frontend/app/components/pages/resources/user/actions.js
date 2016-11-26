import React, { PropTypes } from 'react';
import './actions.scss'

export default class UserActions extends React.Component {
  changStatus = (elem) => {
    if (this.props.is_friend) {
      axios({
        method: "DELETE",
        url: '/be/delete_friend',
        data: {id: this.props.user_id}
      })
      .then((response) => { this.props.setStatus(response.data.is_friend) })
    }
    else {
      axios.post('/be/add_friend', {id: this.props.user_id})
      .then((response) => { this.props.setStatus(response.data.is_friend) })
    }
  }
  handleShow = (event) => {
    event.preventDefault();
    this.props.ContactGetShow(true)
  }

  render() {
    return (
      <div className="user-actions"
           style={{display: (this.props.user_id==this.props.id? "none" : "block")}}>

        <button className="friend-action" onClick={this.handleShow}>
          Send message
        </button>
        <button className="friend-action" onClick={this.changStatus}>
          {this.props.is_friend? "Delete friend" : "Add to friends"}
        </button>
        <hr />
      </div>
    );
  }
};
