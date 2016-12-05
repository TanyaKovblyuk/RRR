import React, { PropTypes } from 'react';

import './post_list_images.scss'

export default class PostListImages extends React.Component {
  toDelete = (num, e) => {
    this.props.setNumToDelete(num)
  }
  render() {
    var length=this.props.images.length
    var images=this.props.images
    return (
      <div className="post-images-list" style={{display: (length==0? "none" : "block")}}>
        {(() => {
          switch (length) {
            case 1:
              return (
                <div>
                  <div className="delete" onClick={this.toDelete.bind(this, 0)}>
                    <img src={images[0]} className="one-image" />
                  </div>
                </div>
              )
            case 2:
              return (
                <div>
                  <div className="delete-two" onClick={this.toDelete.bind(this, 0)}>
                    <img src={images[0]} className="first-image" />
                  </div>
                  <div className="delete-two" onClick={this.toDelete.bind(this, 1)}>
                    <img src={images[1]} className="second-image" />
                  </div>
                </div>
              )
            case 3:
              return (
                <div>
                  <div className="delete-main" onClick={this.toDelete.bind(this, 0)}>
                    <img src={images[0]} className="main-image" />
                  </div>
                  <div className='other-images-two'>
                    <div className="delete" onClick={this.toDelete.bind(this, 1)}>
                      <img src={images[1]} />
                    </div>
                    <div className="delete" onClick={this.toDelete.bind(this, 2)}>
                      <img src={images[2]} />
                    </div>
                  </div>
                </div>
              )
            case 4:
              return (
                <div>
                  <div className="delete-main" onClick={this.toDelete.bind(this, 0)}>
                    <img src={images[0]} className="main-image" />
                  </div>
                  <div className='other-images-three'>
                    <div className="delete" onClick={this.toDelete.bind(this, 1)}>
                      <img src={images[1]} />
                    </div>
                    <div className="delete" onClick={this.toDelete.bind(this, 2)}>
                      <img src={images[2]} />
                    </div>
                    <div className="delete" onClick={this.toDelete.bind(this, 3)}>
                      <img src={images[3]} />
                    </div>
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
