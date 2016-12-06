import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
//------------------------------------------------------------------------------
import * as profileActions from '../../actions/ProfileActions';
import * as userActions from '../../actions/UserActions';
//------------------------------------------------------------------------------
import './style.scss'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '',
                  password: '',
                  checked: false,
                  error: ''};
  }

  emailChange = (event) => {
    this.setState({ email: event.target.value });
  }
  passwordChange = (event) => {
    this.setState({ password: event.target.value });
  }
  check = (event) => {
    this.setState({ checked: !(this.state.checked) });
  }
  handleLogin = (event) => {
    event.preventDefault();
    const { setCurrentUser } = this.props.userActions
    const { setProfile } = this.props.profileActions
    axios.post('/be/login', {
      email: this.state.email,
      password: this.state.password,
      remember_me: (this.state.checked? '1' : '0')
    })
    .then((response) => {
      if (response.data.status==true) {
        setCurrentUser(response.data.current_user)
        setProfile(response.data.profile)
        browserHistory.push('/ant-eater/profile')
      }
      else {
        this.setState({error: "Invalid email/password"})
      }
    })
  }
  render() {
    return (
      <form className="login-form">
        <input placeholder="Email"
               autoFocus="autofocus"
               ref='email'
               type="text"
               onChange={this.emailChange.bind(this)}/>
        <br/>

        <input placeholder="Password"
               type="password"
               ref='password'
               onChange={this.passwordChange.bind(this)}/>
        <br/>

        <input type="checkbox"
               value="1"
               className="session_remember_me"
               onClick={this.check.bind(this)}/>
        <label className="remember-label"
               ref='remember_me'
               onClick={this.check.bind(this)}>
          Remember me
        </label>
        <br/>

        <p className="error">{this.state.error}</p>
        <button name="button"
                onClick={this.handleLogin.bind(this)}>
          Log in
        </button>
      </form>
    );
  }
};

function mapStateToProps (state) {
  return {
    id: state.currentUser.id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    profileActions: bindActionCreators(profileActions, dispatch)
  }
}
//------------------------------------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(Login)
