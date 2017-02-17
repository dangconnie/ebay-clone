import React, {Component} from 'react';
import LoginAction from '../actions/LoginAction';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';

class Login extends Component {
	constructor(props) {
		super(props);
		this.loginSubmit = this.loginSubmit.bind(this);
	}

	loginSubmit(event){
		event.preventDefault();
		this.props.loginAction({
			username: event.target[0].value,
			password: event.target[1].value
		});
	}

	render(){
		console.log(this.props.loginResponse);
		var message = "";
		if(this.props.loginResponse === "badUsername"){
			message = "Username is not correct";
		}else if(this.props.loginResponse.msg === "badPassword"){
			message = "Bad pw!";
		}else if(this.props.loginResponse.msg === "foundUser"){
			browserHistory.push('/'); //redirect them to home page if username and password are correct
		}else{
			message = "";
		}

		return(
			<div>
				<h1>{message}</h1>
				<h1>Login</h1>
				{/*<form onSubmit={this.loginSubmit}>
					<input type="text" placeholder="Username" />
					<input type="password" placeholder="Password" />
					<input type="submit" value="Login!" />
				</form>*/}
				<form onSubmit={this.loginSubmit}>
				  <div className="form-group">
				  <label htmlFor="usernameInput">Username</label>
				  <input type="text" className="form-control" placeholder="Username" />
				  </div>			
				  <div className="form-group">
				    <label htmlFor="exampleInputEmail1">Email address</label>
				    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
				  </div>
				  <div className="form-group">
				    <label htmlFor="exampleInputPassword1">Password</label>
				    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
				  </div>
				  <button type="submit" className="btn btn-default">Submit</button>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		loginResponse: state.login
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ 
		loginAction: LoginAction
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// export default Login;