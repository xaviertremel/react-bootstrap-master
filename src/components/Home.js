import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import {Link} from 'react-router';


function DisplayAuthorInfo(props) {
  return (
    <ul>
      <li>ID: {props.id}</li>
      <li>Name: {props.name}</li>
      <li>Username: {props.username}</li>
      <li>Email: {props.email}</li>
      <li>Address:
        <p>{props.address.street}<br/>
        {props.address.suite}<br/>
        {props.address.city}<br/>
        {props.address.zipcode}</p></li>
      <li>Coordinates:
        <p>{props.address.geo.lat}<br/>
        {props.address.geo.lng}</p></li>
    </ul>
  );
}

function DisplayComments(props) {
  if (props.length > 3) {
    var numberofcomments = 3
  } else {
    var numberofcomments = props.length 
  }

  var comments = []

  for (var i = 0; i < numberofcomments; i++) {
    comments.push(props[i]);
  };

  return (
    <div>
    <hr/>
    {comments.length} comments:
      <ul>
        {comments.map(comment =>
          <li key={comment.id}><h3>{comment.title}</h3>{comment.body}</li>
        )}
      </ul>
    </div>
  );
}


class FetchAuthors extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);

    this.state = {
      authors: [],
      isClicked: false
    };
  }

  componentDidMount() {
  	var userId = this.props.userId
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        const authors = res.data[userId-1]
        this.setState({ authors });
      });
  }

  onClick() {
  	const isClicked = this.state.isClicked;
  	if (isClicked == true) {
  		this.setState({isClicked : false })
  	} else {
  		this.setState({isClicked : true })
  	}
  }	


  render() {
    var userId = this.props.userId
  	const isClicked = this.state.isClicked;
    const authors = this.state.authors
    const name = this.props.attribute
    const authorname = this.state.authors.name

    return (
    	<div>
    	By: <Link to="/" onClick={this.onClick}>{authorname}</Link>
    	{isClicked ? DisplayAuthorInfo(authors) : '' }
    	</div>
    );
  }
}


class Post extends React.Component {
  constructor(props) {
    super(props);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onClick = this.onClick.bind(this);

    this.state = {
      onMouseOver: false,
      isClicked: false,
    };
  }

  onClick() {
    const isClicked = this.state.isClicked;
    if (isClicked == true) {
      this.setState({isClicked : false })
    } else {
      this.setState({isClicked : true })
    }
  } 

  onMouseOver() {
    this.setState({onMouseOver: true});
  }

  render() {
    const MouseOver = this.state.onMouseOver;
    const isClicked = this.state.isClicked;
    const comments = this.props.comments;
    const post = this.props.post;

    return (
        <div>
            <h3 onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave} onClick={this.onClick}>Title: <a href='#'>{post.title}</a></h3>
            <FetchAuthors userId={post.userId} attribute="name" />
            <p>Body: {post.body}</p>
            {isClicked ? DisplayComments(comments) : ''}
        </div>
    );
  }
}


class FetchPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: [],
      comments: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts/'+this.props.postId)
      .then(res => {
        const post = res.data
        this.setState({ post, loading: false });
      });
    axios.get('https://jsonplaceholder.typicode.com/comments?postId='+this.props.postId)
      .then(res => {
        const comments = res.data
        this.setState({ comments });
      });
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  renderPost() {
  	return (
  		<div>
        <Post post={this.state.post} comments={this.state.comments} />
  		</div>
    );
  }

  render() {
    return (
      <div>
        {this.state.loading ?
          this.renderLoading()
          : this.renderPost()}
      </div>
    );
  }
}

class FetchAllPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts/')
      .then(res => {
        const posts = res.data
        this.setState({ posts });
      });
  }

  render() {
    const numbers = this.state.posts.length
    const posts = this.state.posts
    const listPosts = posts.map((post) => <FetchPost key={post.id.toString()} postId={post.id}/>)

    return (
      <div>
        {this.state.posts.length} Posts fetched:
        <ul>
          {listPosts}
        </ul>
      </div>
    );
  }
}

class Home extends Component {

    render() {
        return (
            <div>
              <FetchAllPosts />
              Homepage!
            </div>
        );
    }
}

export default connect((state) => {
	return {};
})(Home);