import React, { PropTypes } from 'react';

import ImgView from '../image/img';

import './style.scss';

export default class ImgListView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {currentNum: this.props.begin};
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({currentNum: nextProps.begin})
  }
  showNext = (e) => {
    var n = this.state.currentNum + 1;
    (n<this.props.images.length)?
      this.setState({currentNum: n}) : this.setState({currentNum: 0})
  }
  showPrev = (e) => {
    var n = this.state.currentNum - 1;
    if (n > -1) {
      this.setState({currentNum: n})
    }
    else {
      this.setState({currentNum: (this.props.images.length-1)})
    }
  }
  imageHide = (e) => {
    this.props.getShow(false)
  }
  render() {
    var currentNum = this.state.currentNum
    var showNav = (this.props.images.length>1)
    return (
      <div className="show-image"
           style={{display: (this.props.show? "block" : "none")}}>
        <div className="to-center">
          <div className="wrap">
            <div className="img-nav"
                 onClick={this.showPrev}
                 style={{visibility: (showNav? "visible" : "hidden")}}>
              <div className="prev"></div>
            </div>
            <div className="img-view">
              <div className="left">
                <figure className="large-image">
                  <img src={this.props.images[currentNum]} />
                </figure>
              </div>
            </div>
          </div>
          <div className="img-nav"
               onClick={this.showNext}
               style={{visibility: (showNav? "visible" : "hidden")}}>
            <div className="next"></div>
          </div>
        </div>
        <div className="img-hide" onClick={this.imageHide}></div>
      </div>
    );
  }
};
