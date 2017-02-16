import $ from 'jquery';

export default function(registerData){
	var thePromise = $.ajax({
		method: "POST",
		url: "http://localhost:3000/register",
		data: registerData
	});
	//promise is info from ajax request at above url
	//sending registerData to request
	return{
		type: "REGISTER",
		payload: thePromise
	}
}

// actions return an object! that object must have a type! payload is optional
//payload can only be 1) username is taken or 2) username inserted