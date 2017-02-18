import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';//imported to be able to use mapStateToProps and mapDispatchToProps
import GetAuctionDetail from '../actions/GetAuctionDetail';
// import Auction from '../components/Auction';
import SubmitBidAction from '../actions/SubmitBidAction';

class AuctionItem extends Component {
	constructor(props) {
		super(props);
		this.submitBid = this.submitBid.bind(this);
	}
	componentDidMount() {
		var auctionId = this.props.params.auctionId;
		this.props.getThisAuction(auctionId); //we want it to know the ID of the item we want to get
	}
	submitBid(event){
		event.preventDefault();
		console.log(this.props.userToken);
		// console.dir(event.target[0].value);
		if(this.props.userToken === undefined){
			//Route user to login because they haven't logged in
		}else{
			var bidAmount = Number(event.target[0].value);
			//input types always come back as strings so we need to turn them into numbers using Number()
			// console.log(typeof(bidAmount));
			var auctionItem = this.props.auctionItemDetail[0];
			if(auctionItem.current_bid === 'No bids yet'){
				auctionItem.current_bid = Number(auctionItem.starting_bid - 0.01);
			}
			console.log(bidAmount);
			// console.log(auctionItem.current_bid);
			if(bidAmount < auctionItem.current_bid){
				console.log("Bid too low");
			}else{
				console.log("Submit to Express");
				//To update, Express needs to know: bidAmount, auctionItem.id, who we are
				this.props.submitBidToExpress(bidAmount, auctionItem.id, this.props.userToken)//need to make this into an action to make submitBid work
				//get auctionItem.id from the the login piece of state
				//when we logged in, we got a token so we can use this to identify ourselves to Express. This was saved in the state (thePromise)
			}
		}
	}
	render(){
		//On load, this.props.auctionItemDetail exists but the [0] element is undefined. As a result, we needed the if statement. or, we can do componentDidMount
		if (this.props.auctionItemDetail.length === 0){
			return(<h1>Loading...</h1>);
		}
		var auctionItem = this.props.auctionItemDetail[0];
		//mySQL always returns an object, even if it's only one object
		if(auctionItem.current_bid === null){
			// show starting bid
			auctionItem.current_bid = "No bids yet";
			// auctionItem.high_bidder_id = "No high bidders yet";
		}

		return(
			<div className="auction-detail-page">
				<h1>{auctionItem.title}</h1>
				<p>{auctionItem.desc}</p>
				<p>Current High Bid: {auctionItem.current_bid}</p>
				<p>High Bidder: {auctionItem.high_bidder_id}</p>
				<p>Starting Bid: {auctionItem.starting_bid}</p>
				{/* don't call function here. just pass it as submitBid*/}
				<form onSubmit={this.submitBid}>
					<input type="number" placeholder="Enter your bid" />
					<button type="submit">Bid</button>
				</form>
			</div>

		);
	}
}

function mapStateToProps(state){

	//Map state(state.auctionItem) to props(auctionItemDetail)
	return{
		auctionItemDetail: state.auctionItem, //root reducer knows about state.auctionItem
		userToken: state.login.token //we got a token when we logged in. we can use this to identify ourselves to Express
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getThisAuction: GetAuctionDetail,
		submitBidToExpress: SubmitBidAction 
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionItem);