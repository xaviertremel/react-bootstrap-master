import React from 'react';
import { Route } from 'react-router';
import { dispatch } from 'redux';

// Container
import App from './containers/app';

// Components
import Home from './components/Home';

export default (
	<div>
		<Route component={App}>
			<Route component={Home} path="/" />
		</Route>
	</div>
);
