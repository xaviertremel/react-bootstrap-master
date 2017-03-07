import React, {Component} from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        return (
            <div>
                Homepage!
            </div>
        );
    }
}

export default connect((state) => {
	return {};
})(Home);