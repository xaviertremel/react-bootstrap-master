import { applyMiddleware, compose, createStore } from 'redux';
import { reduxReactRouter } from 'redux-router';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import routes from './routes';
import { createHistory } from 'history';

let finalCreateStore;

if (process.env.NODE_ENV === 'production') {
	finalCreateStore = compose(
		applyMiddleware(thunkMiddleware),
		reduxReactRouter({ routes, createHistory })
	)(createStore);
} else {
	finalCreateStore = compose(
		applyMiddleware(thunkMiddleware),
		applyMiddleware(createLogger()),
		reduxReactRouter({ routes, createHistory }),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)(createStore);
}

export default finalCreateStore(rootReducer);
