import React, { PropTypes } from 'react';
import './style.scss'
require("url-loader?mimetype=image/png!./go-up.png");

export default class GoUp extends React.Component {
  goUp = (e) => {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="go-up"
           onClick={this.goUp}>
      </div>
    )
  }
};
