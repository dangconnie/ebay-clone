import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RegisterAction from '../actions/RegisterAction';


//submit handler to get username and pw. need to make sure username isn't taken or user isn't already registered.
//1) get username and pw
//2) when username and pw are changed

class Register extends Component {
	constructor(props) {
		super(props);
		this.registrationSubmit = this.registrationSubmit.bind(this);
		this.state = {
			registrationResponse: ""
		}
	}
	registrationSubmit(event){
		event.preventDefault();
		// console.dir(event.target);
		// event.target.children.map()
		// var username = event.target[0].value;
		// var password = event.target[1].value;
		// console.log(username, password);
		this.props.registerAction({
			username: event.target[0].value,
			password: event.target[1].value
		});
	}

	render(){
		// this.props.registerResponse({message:"Test"});
		if(this.props.registerResponse.msg === "userNameTaken"){
			var message = "User Name is Taken";
		}else if(this.props.registerResponse.msg === "userInserted"){
			var message = "User was inserted!";
		}else{
			var message = "";
		}
		return(
			<div className="registration">
				<h1>{message}</h1>
				<form onSubmit={this.registrationSubmit}>
					<input type="text" name="username" placeholder="Username" />
					<input type="password" name="password" placeholder="Password" />
					<input type="submit" value="Register!" />
				</form>
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		registerResponse: state.register
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		//in this step, import bindActionCreators from react-redux above
		//we now have access to registerAction through this.props.registerAction
		//posting is an ajax request. infor will come back as thePromise (payload)
		registerAction: RegisterAction
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
// export default Register;