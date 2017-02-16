import React,{Component} from 'react';

class Auction extends Component{
	render(){
		console.log(this.props.item);
		var auctionItem = this.props.item
		return(
			<div>
				<h1>An auction</h1>
				<div className="Title">
					{auctionItem.title}
				</div>
				<div className="auctionImage">
					<img src={auctionItem.url} />
				</div>				
			</div>

		);
	}
}

export default Auction;

