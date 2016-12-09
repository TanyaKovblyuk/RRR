var ReactTestUtils = require('react-addons-test-utils');
import React from 'react';
import renderer from 'react-test-renderer';
import { Link } from 'react-router';

it('renders correctly Post without utube url', () => {
  const tree = renderer.create(
    <Post img={''}
          author={{name: 'First', surname: 'Second', id: 5}}
          post={{created_at: '07.11', text: 'Long text'}}
          current={true}/>
  ).toJSON();
  expect(tree.type).toContain("div");
  expect(tree.props.className).toContain("post");
  expect(tree.children[4].props).toBe(undefined);
  expect(tree.children[6].props.className).toContain("edit-post");
  expect(tree.children[6].props.style.display).toBe('block');
});

it('renders correctly Post with utube url', () => {
  const tree = renderer.create(
    <Post img={''}
          author={{name: 'First', surname: 'Second', id: 5}}
          post={{created_at: '07.11', text: 'Long text'}}
          utube={'some_url'}
          current={true}/>
  ).toJSON();
  expect(tree.type).toContain("div");
  expect(tree.props.className).toContain("post");
  expect(tree.children[4].props.className).toBe("utube");
  expect(tree.children[6].props.className).toContain("edit-post");
  expect(tree.children[6].props.style.display).toBe('block');
});

it('renders correctly Post as another user', () => {
  const tree = renderer.create(
    <Post img={''}
          author={{name: 'First', surname: 'Second', id: 5}}
          post={{created_at: '07.11', text: 'Long text'}}
          current={false}/>
  ).toJSON();
  expect(tree.type).toContain("div");
  expect(tree.props.className).toContain("post");
  expect(tree.children[4].props).toBe(undefined);
  expect(tree.children[6].props.style.display).toBe('none');
});

//------------------------------------------------------------------------------

class Post extends React.Component {
  handleDelete = (event) => {
    event.preventDefault();
    axios({
      method: "DELETE",
      url: "/be/users/"+this.props.author.id+"/posts/"+this.props.post.id
    })
    .then((response) => {
      this.props.setPosts(response.data.posts)
      this.props.setComments(response.data.comments)
    })
  }

  render() {
    var isUtube = this.props.utube!=undefined
    return (
      <div className="post">
        < MinAvatar img={this.props.img}
                    user={this.props.author}/>
        <p className="author">
          {this.props.author.name+' '+this.props.author.surname}
        </p>
        <p className="date">{this.props.post.created_at}</p>
        <hr className="line" />
        {isUtube? < Youtube utube={this.props.utube} /> : ''}
        <div className="post-content">
          <p className="post-text">{this.props.post.text}</p>
        </div>
        <a data-remote="true"
           style={{display: (this.props.current? "block" : "none")}}
           className="edit-post"
           onClick={this.handleDelete}>
           Delete
        </a>
      </div>
    );
  }
};

class Youtube extends React.Component {
  render() {
    return (
      <div className="utube">
        <iframe width="420"
                height="315"
                frameBorder="0"
                allowFullScreen
                src={this.props.utube||''}>
        </iframe>
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
