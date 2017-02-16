//THIS IS THE ROOT REDUCER. This is how redux knows about state.
//reducer is a function that returns a piece of state
//every reducer gets every action 

import { combineReducers } from 'redux';
import GetHomeReducer from './GetHomeReducer';
import RegisterReducer from './RegisterReducer';


//pass into the object, each particular reducer (new files in reducers folder) 
const rootReducer = combineReducers({
	home: GetHomeReducer,
	register: RegisterReducer
});

export default rootReducer; 