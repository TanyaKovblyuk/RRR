import React, { PropTypes } from 'react';
import './style.scss'

export default class Login extends React.Component {
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
    axios.post('/be/login', {
      email: this.state.email,
      password: this.state.password,
      remember_me: (this.state.checked? '1' : '0')
    })
    .then((response) => {
      if (response.data.status==true) {this.props.setCurrentUser(response.data.user)}
      else {this.setState({error: "Invalid email/password"})}
    })
  }
  render() {
    return (
      <form className="login-form">
        <input placeholder="Email" autoFocus="autofocus" ref='email' type="text" onChange={this.emailChange.bind(this)}/><br/>

        <input placeholder="Password" type="password" ref='password' onChange={this.passwordChange.bind(this)}/><br/>

        <input type="checkbox" value="1" className="session_remember_me" onClick={this.check.bind(this)}/>
        <label className="remember-label" ref='remember_me' onClick={this.check.bind(this)}>Remember me</label><br/>

        <p className="error">{this.state.error}</p>
        <button name="button" onClick={this.handleLogin.bind(this)}>Log in</button>
      </form>
    );
  }
};
