import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
//------------------------------------------------------------------------------
import * as profileActions from '../../../../actions/ProfileActions';
import * as userActions from '../../../../actions/UserActions';
//------------------------------------------------------------------------------
import './new.scss'

class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '',
                  surname: '',
                  gender: '',
                  email: '',
                  password: '',
                  password_confirmation: '',
                  errors: {},
                  status: true};
  }

  fieldChange = (name, event) => {
    this.setState({ [''+name]: event.target.value });
  }
  radioClick = (event) => {
    this.setState({ 'gender': event.target.value });
  }
  handleSend = (event) => {
    event.preventDefault();
    const { setProfile } = this.props.profileActions
    const { setCurrentUser } = this.props.userActions
    axios.post('/be/users',
            {'name': this.state.name,
             'surname': this.state.surname,
             'gender': this.state.gender,
             'email': this.state.email,
             'password': this.state.password,
             'password_confirmation': this.state.password_confirmation,})
    .then((response) => {
      if (response.data.status) {
        setProfile(response.data.profile);
        setCurrentUser(response.data.current_user);
        browserHistory.push('/ant-eater/profile');

      }
      else {
        this.setState({ errors: response.data.errors })
        this.setState({ status: response.data.status })
      }
    })
  }

  render() {
    return (
      <div className="registration">
        <form data-remote="true">
          <input placeholder="Your name"
                 type="text"
                 onChange={this.fieldChange.bind(this, 'name')}
                 id="user_name" />
          <br/>

          <input placeholder="Your surname"
                 type="text"
                 onChange={this.fieldChange.bind(this, 'surname')} />
          <br/>

          <p>
            <input type="radio"
                   name="gender"
                   value="male"
                   onClick={this.radioClick}
                   id="user_gender_male" />
          Male
          </p>

          <input type="radio"
                 name="gender"
                 value="female"
                 onClick={this.radioClick}
                 id="user_gender_female" />
          Female
          <br/>

          <input placeholder="Your email"
                 type="text"
                 onChange={this.fieldChange.bind(this, 'email')} />
          <br/>

          <input placeholder="Your password"
                 type="password"
                 onChange={this.fieldChange.bind(this, 'password')} />
          <br/>

          <input placeholder="Confirm password"
                 type="password"
                 onChange={this.fieldChange.bind(this, 'password_confirmation')} />
          <br/>


          {this.state.status? "" : this.state.errors.map(function(name, index){
            return < ErrorMsg msg={name} key={index} />;})}

          <button name="button" onClick={this.handleSend}>Its ok!</button>
        </form>
      </div>
    )
  }
};

var ErrorMsg = React.createClass({
  render: function() {
    return (
      <h3 className="error">{this.props.msg}</h3>
    );
  },
});

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

export default connect(mapStateToProps, mapDispatchToProps)(NewUser)
