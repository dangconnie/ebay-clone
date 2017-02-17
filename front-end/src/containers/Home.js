import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';//imported to be able to use mapStateToProps and mapDispatchToProps
// import actions
import GetHomeAction from '../actions/GetHomeAction';
import Auction from '../components/Auction';

class Home extends Component {

	componentDidMount() {
		this.props.getHomeData()//we had to move this into componentDidMount b.c otherwise, we'll constantly re-render. AJAX requests go here
	}

	render(){
	// this.props.getHomeData(); //class Home is a blueprint. this.props.getHomeData needs to be inside a function like now. It can't be outside.
	// console.log(this.props.homeData);
	var homeAuctions = [];
		this.props.homeData.map((auction, index)=>{
		// homeAuctions.push(<li>{auction.starting_bid}</li>);
		//will be changed to:
		return homeAuctions.push(<Auction key={index} item={auction} />);
		});
		return(
			<div className="col-sm-12">
				{homeAuctions}
			</div>

		);
	}
}

function mapStateToProps(state){

	//Map state(state.home) to props(homeData)
	return{
		homeData: state.home //root reducer knows about state.home
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getHomeData: GetHomeAction
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);