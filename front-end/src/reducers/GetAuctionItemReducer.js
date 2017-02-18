export default function(state = [], action){
	// console.log(action.type);
	switch(action.type){
		case "GET_AUCTION_DETAIL":
			return action.payload
		default:
			return state;
	}	
}

