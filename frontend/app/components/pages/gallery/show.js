import React, { PropTypes } from 'react';
import './style.scss'

import Img from '../resources/image/img';

export default class Gallery extends React.Component{
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
