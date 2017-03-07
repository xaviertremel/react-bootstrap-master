import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';

class App extends Component {
    render() {
        return (
            <div>
            <h1>This is A Bootstrap for react-redux</h1> <br/>
            <Link to="/">Home</Link>
            {this.props.children}
            </div>
        );
    }
}

export default connect((state) => {
	return {};
})(App);
