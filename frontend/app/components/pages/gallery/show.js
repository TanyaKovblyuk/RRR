import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Img from '../resources/image/img';
import ImgListView from '../resources/image_view/img';

import './style.scss';

class Gallery extends React.Component{
  constructor(props) {
    super(props);
    this.state = {show: false,
                  pos: 0};
  }
  setPosCurrentImage = (index, event) => {
    this.setState({show: true, pos: index})
  }
  getShow = (show) => {
    this.setState({show: show})
  }
  render() {
    return (
      <div className="show-all-images">
        < ImgListView images={this.props.images}
                      begin={this.state.pos}
                      show={this.state.show}
                      getShow={this.getShow} />
        {this.props.images.map(function(image, index){
          return (
              <div className="one-img"
                   key={index}
                   onClick={this.setPosCurrentImage.bind(this, index)}>
                < Img src={image} />
              </div>
          )}, this)}
          <hr className="bottom-gallery"/>
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
