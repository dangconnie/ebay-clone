import React,{Component} from 'react';
// import { Button } from 'react-bootstrap';
import {Link} from 'react-router';

class Auction extends Component{
	render(){
		console.log(this.props.item);
		var auctionItem = this.props.item;
		var auctionLink = "/auction/" + auctionItem.id;
		return(
			<div>
				<div className="home-auction">
					<div className="auctionItemTitle">
						<h2><Link to={auctionLink}>{auctionItem.title}</Link></h2>
					</div>

					<div className="col-sm-3 row">
						<div className="auctionImage">
							<img src={auctionItem.url} alt=""/>
						</div>
					</div>	


					<div className="auctionItemDescr">
						<h3>Category: {auctionItem.category}</h3>
					</div>	
					<div className="auctionItemDescr">
						<h3>Description: {auctionItem.desc}</h3>
					</div>	
				</div>
			</div>

		);
	}
}

export default Auction;

