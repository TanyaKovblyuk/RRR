import React, { PropTypes } from 'react';

import ImgView from '../image/img';

import './style.scss';

export default class Gallery extends React.Component{
  constructor(props) {
    super(props);
    this.state = {current_num: this.props.begin};
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({current_num: nextProps.begin})
  }
  showNext = (e) => {
    var n = this.state.current_num + 1;
    (n<this.props.images.length)? this.setState({current_num: n}) : this.setState({current_num: 0})
  }
  showPrev = (e) => {
    var n = this.state.current_num - 1;
    (n > -1)? this.setState({current_num: n}) : this.setState({current_num: (this.props.images.length-1)})
  }
  imageHide = (e) => {
    this.props.getShow(false)
  }
  render() {
    var current_num = this.state.current_num
    return (
      <div className="show-image" style={{display: (this.props.show? "block" : "none")}}>
        <div className="to-center">
          <div className="wrap">
            <div className="img-nav"  onClick={this.showPrev}><div className="prev"></div></div>
            <div className="img-view">
              <div className="left">
                <figure className="large-image">
                  <img src={this.props.images[current_num]} />
                </figure>
              </div>
            </div>
          </div>
          <div className="img-nav"  onClick={this.showNext}><div className="next"></div></div>
        </div>
        <div className="img-hide"  onClick={this.imageHide}></div>
      </div>
    );
  }
};
