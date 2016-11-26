import React, { PropTypes } from 'react';

import MinAvatar from '../resources/image/min_avatar';
import NewMessage from '../resources/forms/message';

import './style.scss'

export default class Messages extends React.Component{
  constructor(props) {
    super(props);
    this.state = {show: false, id: 0};
  }
  addContactGetShow = (contact) => {
    this.setState({show: contact})
  }
  handleShow = (id, event) => {
    this.setState({show: !this.state.show})
    this.setState({id: id})
  }

  render() {
    return (
      <div className="messages">
        {this.props.messages.map(function(msg, index){
          return (
            <div className="message" key={index}>
              < NewMessage id={msg.user.id}
                           show={this.state.show&&(this.state.id==msg.message.id)}
                           ContactGetShow={this.addContactGetShow} />
              < MinAvatar img={msg.img}
                          user={msg.user}
                          setProfile={this.props.setProfile} />
              <div className="message-block" onClick={this.handleShow.bind(this, msg.message.id)}>
                <p className="author">{msg.user.name+' '+msg.user.surname}</p>
                <p className="date">{msg.message.created_at}</p>
                <hr className="line" />
                <div className="text">{msg.message.text}</div>
              </div>
            </div>
          )}, this)}
      </div>
    );
  }
};
