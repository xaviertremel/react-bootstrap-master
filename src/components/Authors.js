import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios'

class FetchAuthors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      author: []
    };
  }

  componentDidMount() {
    var userId = this.props.userId
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        const names = res.data[userId-1].name
        this.setState({ names });
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
    const isClicked = this.state.isClicked;

    return (
      <div>
      By: <a href='#' onClick={this.onClick}>{this.state.names}</a>
      {isClicked ? this.state.names : '' }
      </div>
    );
  }
}

class AuthorPage extends Component {

    render() {
        return (
            <div>
                <FetchAuthor />
                AuthorPage!
            </div>
        );
    }
}

//export default connect((state) => {
//  return {};
//})(Home);