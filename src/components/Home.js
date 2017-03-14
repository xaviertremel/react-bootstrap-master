import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router';


function DisplayComments(props) {
  if (props.length > 3) {
    var numberofcomments = 3;
  } else {
    var numberofcomments = props.length;
  }

  var comments = [];

  for (var i = 0; i < numberofcomments; i++) {
    comments.push(props[i]);
  };

  return (
    <div>
    {comments.length} comments:
      <ul className="list-group">
        {comments.map(comment =>
          <li className="list-group-item" key={comment.id}><h3>{comment.title}</h3>{comment.body}</li>
        )}
      </ul>
    </div>
  );
}


class Post extends React.Component {
  constructor(props) {
    super(props);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onClick = this.onClick.bind(this);

    this.state = {
      comments: [],
      user: [],
      onMouseOver: false,
      isClicked: false,
    };
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/comments?postId='+this.props.postId)
      .then(res => {
        const comments = res.data
        this.setState({ comments });
      });
    axios.get('https://jsonplaceholder.typicode.com/users/'+this.props.userId)
      .then(res => {
        const user = res.data
        this.setState({ user });
      });
  }

  onClick() {
    const isClicked = this.state.isClicked;
    if (isClicked == true) {
      this.setState({isClicked : false })
    } else {
      this.setState({isClicked : true })
    }
    event.preventDefault()
  } 

  onMouseOver() {
    this.setState({onMouseOver: true});
  }

  render() {
    const MouseOver = this.state.onMouseOver;
    const isClicked = this.state.isClicked;
    const comments = this.state.comments;
    const post = this.props.post;
    const user = this.state.user;
    const username = this.state.user.name;
    const linkStyle = {cursor:"pointer",textDecoration:"underline"};

    return (
        <div className="panel panel-default">
            <div className="panel-heading" onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave} onClick={this.onClick} style={linkStyle}>{post.title}</div>
            <div className="panel-body">By: <Link to={'/user/'+user.id} key={user.id} activeClassName="active">{username} <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></Link>
            <p>{post.body}</p>
            {isClicked ? DisplayComments(comments) : ''}</div>
        </div>
    );
  }
}

class FetchPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts/')
      .then(res => {
        const posts = res.data
        this.setState({ posts, loading: false });
      });
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  renderPost() {
    const numbers = this.state.posts.length;
    const posts = this.state.posts;
    const listPosts = posts.map((post) => <Post key={post.id.toString()} postId={post.id} post={post} userId={post.userId} />);

    return (
      <div>
        {this.state.posts.length} Posts fetched:
          {listPosts}
      </div>
    );
  }
  
  render() {
    return (
      <div>
        {this.state.loading ? this.renderLoading() : this.renderPost()}
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <div>
        <FetchPosts />
        Homepage!
      </div>
    );
  }
}

export default connect((state) => {
	return {};
})(Home);