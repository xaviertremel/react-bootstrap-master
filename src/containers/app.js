import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';

class App extends Component {
    
    render() {

        return (
            <div className="container">
            <h1>This is a very simple FetchApp with minimalistic design :)</h1><h3>(react-redux)</h3> <br/>
            <Link to="/" className="btn btn-default">Home</Link>
            {this.props.children}
            </div>
        );
    }
}

export default connect((state) => {
	return {};
})(App);
