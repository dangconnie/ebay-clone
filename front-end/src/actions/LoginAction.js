import $ from 'jquery';

export default function(loginData){
	var thePromise = $.ajax({
		method: "POST",
		url: "http://localhost:3000/login",
		data: loginData
	});

	return{
		type: "REGISTER",
		payload: thePromise
	}
}
//thePromise contains our token