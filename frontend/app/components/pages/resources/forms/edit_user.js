import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//------------------------------------------------------------------------------
import * as userActions from '../../../../actions/UserActions';
//------------------------------------------------------------------------------
import './edit_user.scss'

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: this.props.user.name,
                  surname: this.props.user.surname,
                  old_password: '',
                  password: '',
                  password_confirmation: ''};
  }

  fieldChange = (name, event) => {
    this.setState({ [''+name]: event.target.value });
  }
  handleName = (event) => {
    const { setCurrentUser } = this.props.userActions
    event.preventDefault();
    axios({
      method: "PATCH",
      url: '/be/users/'+this.props.user.id,
      data: {'name': this.state.name,
             'surname': this.state.surname}
      })
      .then((response) => { setCurrentUser(response.data) })
  }
  handlePass = (event) => {
    const { setCurrentUser } = this.props.userActions
    event.preventDefault();
    axios({
      method: "POST",
      url: '/be/edit_pass',
      data: {'old_password': this.state.old_password,
             'password': this.state.password,
             'password_confirmation': this.state.password_confirmation}
      })
      .then((response) => { setCurrentUser(response.data) })
  }

  render() {
    return (
      <div className="EditUser">
        <div className="nav-name-content">
          <h1>Chang your name</h1>
          <form data-remote="true">
            <input defaultValue={this.props.user.name}
                   type="text"
                   onChange={this.fieldChange.bind(this, 'name')}
                   id="user_name" /><br/>

            <input defaultValue={this.props.user.surname}
                   type="text"
                   onChange={this.fieldChange.bind(this, 'surname')} /><br/>

            <button name="button" onClick={this.handleName}>Send</button>
          </form>
        </div>

        <div className="nav-pass-content">
          <h1>Chang your password</h1>
          <form data-remote="true">
            <input placeholder="Your password"
                   type="password"
                   onChange={this.fieldChange.bind(this, 'old_password')}/>
            <br/><br/>

            <input placeholder="New password"
                   type="password"
                   onChange={this.fieldChange.bind(this, 'password')}/>
            <br/>
            <input placeholder="Confirm new password"
                   type="password"
                   onChange={this.fieldChange.bind(this, 'password_confirmation')}/>
            <br/>

            <button name="button" onClick={this.handlePass}>Send</button>
          </form>
        </div>
      </div>
    );
  }
};

function mapStateToProps (state) {
  return {
    user: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}
//------------------------------------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(EditUser)
