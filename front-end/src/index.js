import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reduxPromise from 'redux-promise';
// React Router stuff
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import Search from './containers/Search';
import AuctionItem from './containers/AuctionItem';

import {Provider} from 'react-redux';

import { createStore, applyMiddleware } from 'redux'; 

import reducers from './reducers/index.js';

const theStoreWithMiddleware = applyMiddleware(reduxPromise)(createStore)(reducers)

ReactDOM.render(
	<Provider store={theStoreWithMiddleware}>	
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/search/:term" component={Search} />
				<Route path="/auction/:auctionId" component={AuctionItem} />

			</Route>
  		</Router>
  	</Provider>,
  document.getElementById('root')
);