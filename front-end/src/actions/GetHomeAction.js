import $ from 'jquery';

//actions are functions that return an object. 
//the reducer is interested in the payload

export default function(){
	var thePromise = $.getJSON('http://localhost:3000/getHomeAuctions')//our data is coming from our database. we loaded up our getjson at the above url, so we're telling it to go there for the data.
	//redux promise will stop action from continuing. will go to reducer. that is why reducers will care about action.type ("GET_HOME")
	// console.log(thePromise); will get nothing b/c async. thePromise is not done running but you're console.log in the middle of it.
	return{
		type: "GET_HOME",
		payload: thePromise
	}
}