var express = require('express');
var router = express.Router();
var config = require ('../config/config');
var mysql = require('mysql');
var randtoken = require('rand-token');
var connection = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});
connection.connect();

var bcrypt = require('bcrypt-nodejs');

// var hashedPassword = bcrypt.hashSync("x");//use hashSync when user first registers pw
// console.log(hashedPassword);
// var checkHash = bcrypt.compareSync("x", hashedPassword);//compareSync used to authenticate pw
// console.log(checkHash);
// checkHash = bcrypt.compareSync("bacon", hashedPassword);
// console.log(checkHash);

/* GET top 10 auctions */
router.get('/getHomeAuctions', function(req, res, next) {
	var auctionsQuery = "SELECT * FROM auctions INNER JOIN images ON images.auction_id = auctions.id LIMIT 10";
	connection.query(auctionsQuery, (error, results, fields)=>{
		if (error) throw error;
		res.json(results);
	});
  	// res.render('index', { title: 'Express' });
  	//avoid using res.render in express!
});

//Get a single auction's data based on the ID in the URL
router.get('/getAuctionItem/:auctionId', (req,res,next)=>{
	var theAuctionId = req.params.auctionId;//we can get the auctionId from req.params.auctionId. We need the auctionId b/c that is what user clicked on to see more info.

	var getAuctionQuery = "SELECT * FROM auctions WHERE id = ?";
	connection.query(getAuctionQuery, [theAuctionId], (error, results, fields)=>{
		res.json(results);
	});

	// res.json(theAuctionId);//you can test this in the backend browser to make sure it works
});


// Make a register post route to handle registration!
router.post('/register', (req, res, next)=>{
	checkDupeUserQuery = "SELECT * FROM users WHERE username = ?";
	connection.query(checkDupeUserQuery,[req.body.username],(error,results,fields)=>{
		// console.log("$$$$$$$$$$");
		// console.log(results);
		// console.log("$$$$$$$$$$");
		if(results.length === 0){
			//Go ahead and register user b/c they don't exist in database
			var insertUserQuery = "INSERT INTO users (username, password) VALUES " +
				"(?, ?)";
	connection.query(insertUserQuery,[req.body.username, bcrypt.hashSync(req.body.password)],(error2,results2)=>{				res.json({
					msg:"userInserted"
				});
			});
		}else{
			res.json({
				msg: "userNameTaken"
			})
		}
	})
});

router.post('/login', (req, res, next)=>{
	var username = req.body.username;
	var password = req.body.password;
	var findUserQuery = "SELECT * FROM users WHERE username = ?";
	connection.query(findUserQuery, [req.body.username], (error, results, fields)=>{
		if(results.length === 0){
			res.json({
				//This is an invalid username
				msg: "badUsername"
			});
		}else{
			//This is a valid username. We know because results. length > 0
			checkHash = bcrypt.compareSync(password, results[0].password);
			console.log(checkHash);
			if (checkHash === false){
				res.json({
					msg: "badPassword"
				})
			}else{
				//We have a match on username and the hash password checks out.
				//This is the droid we're looking for
				var token = randtoken.uid(40);//uid = unique userid. you can also use randtoken.generate(40)
				insertToken = "UPDATE users SET token=?, token_exp=DATE_ADD(NOW(), INTERVAL 1 HOUR) "+
                    "WHERE username=?";
                connection.query(insertToken,[token, username], (error, results)=>{
					//now state.login will have msg and token
					console.log(token);
					res.json({
						msg: "foundUser",
						token: token
					});
				})
			}
		}
	});
	// res.json(req.body);
});

router.post('/submitBid', (req, res, next)=>{
	var selectQuery = "SELECT current_bid, starting_bid FROM auctions WHERE id = ?";
	connection.query(selectQuery,[req.body.auctionItemId], (error, results, fields)=>{
		if((req.body.bidAmount < results[0].current_bid) || (req.body.bidAmount < results[0].starting_bid)){
			//check if amt we got back is less than the amount from the query we just ran
			//results will be an array even if there is only one row
			res.json({msg: "bidToLow"});
		}else{
			//Bid has passed server validation...it's high enough! 
			//Update the bid_history table and the auctions table
				// -auctions table:
				// 	-update high_bidder_id and current_bid
				// -bid_history:
				// 	-update auction_id, bidder_id, amount

				// Query we need to write:
				// update auctions high_bidder_id and bid 
				// where auction ID = whatever was passed

			var getUserId = "SELECT id FROM users WHERE token = ?";
			connection.query(getUserId,[req.body.userToken], (error2, results2, fields2)=>{
				if(results2.length > 0){//Token in the db, valid token, move on!
					var updateAuctionsQuery = "UPDATE auctions SET high_bidder_id = ?, current_bid=? WHERE id = ?";
					connection.query(updateAuctionsQuery, [results2[0].id, req.body.bidAmount, req.body.auctionItemId],(error, results, fields)=>{
						if(error) throw error;
						res.json({
							msg: "bidAccepted",
							newBid: req.body.bidAmount
						})
					})
				}else{
					res.json({
						msg: "badToken"
					})
				}
			})

			var updateAuctionsQuery = "UPDATE auctions SET high_bidder_id = ?, current_bid=? WHERE id = ?";
			// res.json({msg: "Bid High Enough!"});
			connection.query(updateAuctionsQuery, ["", req.body.bidAmount, req.body.auctionItemId],(error, results, fields)=>{

			})
		}
	});


	// These things are available inside req.body:
	// 	bidAmount,
	// 	auctionItemId,
	// 	userToken

	// res.json(req.body);
});

module.exports = router;
//we can access json data posted from the body so req.body
