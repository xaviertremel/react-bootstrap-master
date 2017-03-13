import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Router, Route, browserHistory } from 'react-router';

function DisplayUserInfo(props) {
  return (
    <ul className="list-group">
      <li className="list-group-item">ID: {props.user.id}</li>
      <li className="list-group-item">Name: {props.user.name}</li>
      <li className="list-group-item">Username: {props.user.username}</li>
      <li className="list-group-item">Email: {props.user.email}</li>
      <li className="list-group-item">Address:
        <p>{props.useraddress.street}<br/>
        {props.useraddress.suite}<br/>
        {props.useraddress.city}<br/>
        {props.useraddress.zipcode}</p></li>
      <li className="list-group-item">Coordinates:
        <p>{props.usergeo.lat}<br/>
        {props.usergeo.lng}</p></li>
      <li className="list-group-item">Phone: {props.user.phone}</li>
      <li className="list-group-item">Website: {props.user.website}</li>
      <li className="list-group-item">Company:
        <p>{props.usercompany.name}<br/>
        {props.usercompany.catchPhrase}<br/>
        {props.usercompany.bs}</p></li>
    </ul>
  );
}

class FetchUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      useraddress: [],
      usergeo: [],
      usercompany: [],
    };
  }

  componentDidMount() {
    var userId = this.props.userId
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        const user = res.data[userId-1]
        const useraddress = res.data[userId-1].address
        const usergeo = res.data[userId-1].address.geo
        const usercompany = res.data[userId-1].company
        this.setState({ user });
        this.setState({ useraddress })
        this.setState({ usergeo })
        this.setState({ usercompany })
        console.log(user);
      });
  }

  render() {
    console.log(this.state.useraddress.street);

    return (
      <div>
      <DisplayUserInfo user={this.state.user} usercompany={this.state.usercompany} useraddress={this.state.useraddress} usergeo={this.state.usergeo} />
      </div>
    );
  }
}


class UserPage extends Component {

    render() {
        return (
            <div>
                <h1>User info</h1>
                <FetchUser userId={this.props.params.id} />
                AuthorPage!
            </div>
        );
    }
}

export default connect((state) => {
  return {};
})(UserPage);
