import React, { PropTypes } from 'react';

import ImgListView from '../image_view/img';

import './post_images.scss'

export default class PostImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: false,
                  pos: 0};
  }
  getContactShowFullSizePostImages = (show) => {
    this.setState({show: show})
  }
  toShowImage = (num, e) => {
    this.setState({show: true, pos: num})
  }
  render() {
    var length=this.props.images.length
    var images=this.props.images
    return (
      <div className="post-images-list"
           style={{display: (length==0? "none" : "block")}}>
      < ImgListView images={images}
                    begin={this.state.pos}
                    show={this.state.show}
                    getShow={this.getContactShowFullSizePostImages} />
        {(() => {
          switch (length) {
            case 1:
              return (
                <div>
                  <img src={images[0]}
                       className="one-image"
                       onClick={this.toShowImage.bind(this, 0)}/>
                </div>
              )
            case 2:
              return (
                <div>
                  <img src={images[0]}
                       className="first-image"
                       onClick={this.toShowImage.bind(this, 0)}/>
                  <img src={images[1]}
                       className="second-image"
                       onClick={this.toShowImage.bind(this, 1)}/>
                </div>
              )
            case 3:
              return (
                <div>
                  <img src={images[0]}
                       className="main-image"
                       onClick={this.toShowImage.bind(this, 0)}/>
                  <div className='other-images-two'>
                  <img src={images[1]}
                       onClick={this.toShowImage.bind(this, 1)}/>
                  <img src={images[2]}
                       onClick={this.toShowImage.bind(this, 2)}/>
                  </div>
                </div>
              )
            case 4:
              return (
                <div>
                  <img src={images[0]}
                       className="main-image"
                       onClick={this.toShowImage.bind(this, 0)}/>
                  <div className='other-images-three'>
                    <img src={images[1]}
                         onClick={this.toShowImage.bind(this, 1)}/>
                    <img src={images[2]}
                         onClick={this.toShowImage.bind(this, 2)}/>
                    <img src={images[3]}
                         onClick={this.toShowImage.bind(this, 3)}/>
                  </div>
                </div>
              )
            default:
              return '';
          }
        })()}
        <hr/>
      </div>
    );
  }
};
