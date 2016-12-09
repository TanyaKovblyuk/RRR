var ReactTestUtils = require('react-addons-test-utils');
import React from 'react';
import renderer from 'react-test-renderer';
import { Link } from 'react-router';

it('renders correctly Comment', () => {
  const tree = renderer.create(
    <Comment img={'url'}
             author={{name: 'First', surname: 'Second', id: 5}}
             comment={{created_at: '07.11', text: 'Long text'}}
             current={true}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.type).toContain("div");
  expect(tree.props.className).toContain("comment");
  expect(tree.children[0].children[0].children[0].children[0].props.src).toBe('url');
  expect(tree.children[5].props.className).toContain("edit-comment");
  expect(tree.children[5].props.style.display).toBe('block');
});

it('renders correctly Comment as another user', () => {
  const tree = renderer.create(
    <Comment img={'url'}
             author={{name: 'First', surname: 'Second', id: 5}}
             comment={{created_at: '07.11', text: 'Long text'}}
             current={false}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.type).toContain("div");
  expect(tree.props.className).toContain("comment");
  expect(tree.children[0].children[0].children[0].children[0].props.src).toBe('url');
  expect(tree.children[5].props.className).toContain("edit-comment");
  expect(tree.children[5].props.style.display).toBe('none');
});

//------------------------------------------------------------------------------

class Comment extends React.Component {
  handleDelete = (event) => {
    event.preventDefault();
    axios({
      method: "DELETE",
      url: "/be/users/"+this.props.author.id+"/comments/"+this.props.comment.id
    })
    .then((response) => { this.props.setComments(response.data.comments) })
  }

  render() {
    return (
      <div className="comment">
        < MinAvatar img={this.props.img}
                    user={this.props.author}
                    setProfile={this.props.setProfile} />
        <a href={"/ant-eater/users/"+this.props.author.id}
           className="author"
           data-remote="true">
           {this.props.author.name+' '+this.props.author.surname}
        </a>
        <hr className="line" />
        <p className="date">{this.props.comment.created_at}</p>
        <div className="comment-content">
          <p className="comment-text">{this.props.comment.text}</p>
        </div>
        <a data-remote="true"
           style={{display: (this.props.current? "block" : "none")}}
           className="edit-comment"
           onClick={this.handleDelete}>
           Delete
        </a>
      </div>
    );
  }
};

class MinAvatar extends React.Component {
  navVisit = (event) => {
    axios.get("/be/users/"+this.props.user.id)
    .then((response) => { this.props.setProfile(response.data.data) })
  }

  render() {
    return (
      <Link to={"/ant-eater/users/"+this.props.user.id} onClick={this.navVisit}>
        <figure className="pfofile-friend">
          <p><img src={this.props.img} /></p>
        </figure>
      </Link>
    );
  }
};
