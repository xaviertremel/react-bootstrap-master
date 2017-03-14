import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

function DisplayUserInfo(props) {
  return (
    <ul className="list-group">
      <li className="list-group-item">ID: {props.id}</li>
      <li className="list-group-item">Name: {props.name}</li>
      <li className="list-group-item">Username: {props.username}</li>
      <li className="list-group-item">Email: {props.email}</li>
      <li className="list-group-item">Address:
        <p>{props.street}<br/>
        {props.suite}<br/>
        {props.city}<br/>
        {props.zipcode}</p></li>
      <li className="list-group-item">Coordinates:
        <p>{props.lat}<br/>
        {props.lng}</p></li>
      <li className="list-group-item">Phone: {props.phone}</li>
      <li className="list-group-item">Website: {props.website}</li>
      <li className="list-group-item">Company:
        <p>{props.name}<br/>
        {props.catchPhrase}<br/>
        {props.bs}</p></li>
    </ul>
  );
}

class FetchUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      name: '',
      username: '',
      email: '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: ''
        }
      },
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: '',
      },
      loading: true
    };
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/users/'+this.props.userId)
      .then(res => {
        const user = res.data
        this.setState({
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          address: {
            street: user.address.street,
            suite: user.address.suite,
            city: user.address.city,
            zipcode: user.address.zipcode,
            geo: {
              lat: user.address.geo.lat,
              lng: user.address.geo.lng
            }
          },
          phone: user.phone,
          website: user.website,
          company: {
            name: user.company.name,
            catchPhrase: user.company.catchPhrase,
            bs: user.company.bs
          },
          loading: false
        });
      });
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  renderUser() {
    return (
      <div>
        <DisplayUserInfo
          id = {this.state.id}
          name = {this.state.name}
          username = {this.state.username}
          email = {this.state.email}
          street = {this.state.address.street}
          suite = {this.state.address.suite}
          city = {this.state.address.city}
          zipcode = {this.state.address.zipcode}
          lat = {this.state.address.geo.lat}
          lng = {this.state.address.geo.lng}
          phone = {this.state.phone}
          website = {this.state.website}
          name = {this.state.company.name}
          catchPhrase = {this.state.company.catchPhrase}
          bs = {this.state.company.bs}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.loading ? this.renderLoading() : this.renderUser()}
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
