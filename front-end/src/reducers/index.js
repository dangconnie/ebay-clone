//THIS IS THE ROOT REDUCER. This is how redux knows about state.
//reducer is a function that returns a piece of state
//every reducer gets every action. every reducer must be connected to root reducer 


import { combineReducers } from 'redux';
import GetHomeReducer from './GetHomeReducer';
import RegisterReducer from './RegisterReducer';
import LoginReducer from './LoginReducer';
import GetAuctionItemReducer from './GetAuctionItemReducer.js';
import BidReducer from './BidReducer.js';



//pass into the object, each particular reducer (new files in reducers folder) 
const rootReducer = combineReducers({
	home: GetHomeReducer,
	register: RegisterReducer,
	login: LoginReducer,
	auctionItem: GetAuctionItemReducer,
	bid: BidReducer
});

export default rootReducer; 