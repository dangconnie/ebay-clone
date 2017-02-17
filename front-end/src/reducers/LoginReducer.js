export default function(state = [], action){
	// console.log(action.type);
	// console.log(action.payload);

	switch(action.type){
		case "LOGIN":
			return action.payload
		default:
		return state;
	}
}
