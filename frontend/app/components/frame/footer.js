import React, { PropTypes } from 'react';
require("./footer.scss")
require("url-loader?mimetype=image/png!./footer.png");
require("url-loader?mimetype=image/png!./header.png");

export default class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <a href={this.props.id=='0' ? "/" : "/users/"+this.props.id } data-remote="true" id="logo-footer">Ant-eater</a>
      </div>
    );
  }
};
