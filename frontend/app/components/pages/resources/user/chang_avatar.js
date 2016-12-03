import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//------------------------------------------------------------------------------
import * as profileActions from '../../../../actions/ProfileActions';
//------------------------------------------------------------------------------
import './chang_avatar.scss'

class ChangAvatar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {uri: null};
  }
  selectImage = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (upload) => {
      axios.post("/be/users/"+this.props.id+"/images", {avatar: upload.target.result})
      .then((response) => {
        const { setProfile } = this.props.profileActions
        var profile=this.props.profile
        profile.avatar=response.data.avatar
        setProfile(profile)
      })
    };
    e.target.files[0]='';
  }
  render() {
    return (
      <div className="new-avatar" style={{display: (this.props.user_id==this.props.id? "block" : "none")}}>
        <label htmlFor="files">New avatar</label>
        <input id="files" type="file" onChange={this.selectImage}/>
      </div>
    )
  }
};
//------------------------------------------------------------------------------
function mapStateToProps (state) {
  return {
    id: state.current_user.id,
    user_id: state.profile.user.id,
    profile: state.profile
  }
}

function mapDispatchToProps(dispatch) {
  return {
    profileActions: bindActionCreators(profileActions, dispatch)
  }
}
//------------------------------------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(ChangAvatar)
