import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Img from '../resources/image/img';

import './style.scss';

class Gallery extends React.Component{
  render() {
    return (
      <div className="show-all-images">
        {this.props.images.map(function(image, index){
          return (
              <div className="one-img" key={index}>
                < Img src={image} />
              </div>
          )}, this)}
          <hr />
      </div>
    );
  }
};

function mapStateToProps (state) {
  return {
    images: state.images.images
  }
}

export default connect(mapStateToProps)(Gallery)
