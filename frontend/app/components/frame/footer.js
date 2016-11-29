import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
//------------------------------------------------------------------------------
require("./footer.scss")
require("url-loader?mimetype=image/png!./footer.png");
require("url-loader?mimetype=image/png!./header.png");

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <Link to={this.props.id=='0' ? "/ant-eater" : "/ant-eater/profile" }
           data-remote="true" id="logo-footer">
           Ant-eater
        </Link>
      </div>
    );
  }
};

function mapStateToProps (state) {
  return {
    id: state.current_user.id
  }
}

export default connect(mapStateToProps)(Footer)
