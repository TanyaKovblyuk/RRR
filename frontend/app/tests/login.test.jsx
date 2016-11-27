var ReactTestUtils = require('react-addons-test-utils');
import React from 'react';
import renderer from 'react-test-renderer';

it('renders correctly Login', () => {
  const tree = renderer.create(
    <Login />
  ).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.type).toContain("form");
  expect(tree.props.className).toContain("login-form");
});

it('Forms children renders correctly', () => {
  const tree = renderer.create(
    <Login />
  ).toJSON();
  expect(tree.children[0].props.type).toContain("text");
  expect(tree.children[0].props.placeholder).toContain("Email");
  expect(tree.children[1].type).toContain("br");
  expect(tree.children[2].props.type).toContain("password");
  expect(tree.children[2].props.placeholder).toContain("Password");
  expect(tree.children[3].type).toContain("br");
  expect(tree.children[4].props.type).toContain("checkbox");
  expect(tree.children[4].props.className).toContain("session_remember_me");
  expect(tree.children[5].children[0]).toContain("Remember me");
  expect(tree.children[5].type).toContain("label");
  expect(tree.children[5].props.className).toContain("remember-label");
});

//------------------------------------------------------------------------------

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
        browserHistory.push('/profile')
      }
      else {
        this.setState({error: "Invalid email/password"})
      }
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
