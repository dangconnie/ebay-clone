import $ from 'jquery';

export default function(auctionId){
	// console.log(auctionId);
	var thePromise = $.getJSON('http://localhost:3000/getAuctionItem/' +auctionId);//make a GET route for this

	//react can't get anything from DB. React can ask express to get info from mySQL via thePromise.

	//make new reducer to put "GET_AUCTION_DETAIL in"
	return{
		type: "GET_AUCTION_DETAIL",
		payload: thePromise
	}
}