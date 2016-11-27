var ReactTestUtils = require('react-addons-test-utils');
import React from 'react';
import renderer from 'react-test-renderer';

it('renders correctly EditUser', () => {
  const tree = renderer.create(
    <EditUser user={{name: 'Some', surname: 'Thing'}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.type).toContain("div");
  expect(tree.props.className).toContain("EditUser");
  expect(tree.children[0].type).toContain("div");
  expect(tree.children[0].props.className).toContain("nav-name-content");
  expect(tree.children[1].type).toContain("div");
  expect(tree.children[1].props.className).toContain("nav-pass-content");
});

it('edit name renders correctly', () => {
  const tree = renderer.create(
    <EditUser user={{name: 'Some', surname: 'Thing'}} />
  ).toJSON();
  expect(tree.children[0].children[0].type).toContain("h1");
  expect(tree.children[0].children[0].children[0]).toContain("Chang your name");
  expect(tree.children[0].children[1].type).toContain("form");
  expect(tree.children[0].children[1].children[0].type).toContain("input");
  expect(tree.children[0].children[1].children[0].props.defaultValue).toContain("Some");
  expect(tree.children[0].children[1].children[0].props.id).toContain("user_name");
  expect(tree.children[0].children[1].children[1].type).toContain("br");
  expect(tree.children[0].children[1].children[2].type).toContain("input");
  expect(tree.children[0].children[1].children[2].props.defaultValue).toContain("Thing");
  expect(tree.children[0].children[1].children[4].type).toContain("button");
  expect(tree.children[0].children[1].children[4].children[0]).toContain("Send");
});

it('edit password renders correctly', () => {
  const tree = renderer.create(
    <EditUser user={{name: 'Some', surname: 'Thing'}} />
  ).toJSON();
  expect(tree.children[1].children[0].type).toContain("h1");
  expect(tree.children[1].children[0].children[0]).toContain("Chang your password");
  expect(tree.children[1].children[1].type).toContain("form");
  expect(tree.children[1].children[1].children[0].type).toContain("input");
  expect(tree.children[1].children[1].children[0].props.placeholder).toContain("Your password");
  expect(tree.children[1].children[1].children[1].type).toContain("br");
  expect(tree.children[1].children[1].children[2].type).toContain("br");
  expect(tree.children[1].children[1].children[3].type).toContain("input");
  expect(tree.children[1].children[1].children[3].props.placeholder).toContain("New password");
  expect(tree.children[1].children[1].children[4].type).toContain("br");
  expect(tree.children[1].children[1].children[5].type).toContain("input");
  expect(tree.children[1].children[1].children[5].props.placeholder).toContain("Confirm new password");
  expect(tree.children[1].children[1].children[6].type).toContain("br");
  expect(tree.children[1].children[1].children[7].type).toContain("button");
  expect(tree.children[1].children[1].children[7].children[0]).toContain("Send");
});

//------------------------------------------------------------------------------

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
            <input placeholder="Your password" type="password" onChange={this.fieldChange.bind(this, 'old_password')}/><br/><br/>

            <input placeholder="New password" type="password" onChange={this.fieldChange.bind(this, 'password')}/><br/>
            <input placeholder="Confirm new password" type="password" onChange={this.fieldChange.bind(this, 'password_confirmation')}/><br/>

            <button name="button" onClick={this.handlePass}>Send</button>
          </form>
        </div>
      </div>
    );
  }
};
