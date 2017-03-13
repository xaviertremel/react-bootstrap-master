import React from 'react';
import { Route, browserHistory } from 'react-router';
import { dispatch } from 'redux';

// Container
import App from './containers/app';

// Components
import Home from './components/Home';
import UserPage from './components/UserPage';

export default (
	<div>
		<Route component={App} history={browserHistory}>
			<Route component={Home} path="/" />
			<Route component={UserPage} path="/user/:id" />
		</Route>
	</div>
);
