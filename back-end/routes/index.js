var express = require('express');
var router = express.Router();
var config = require ('../config/config');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});
connection.connect();

/* GET top 10 auctions */
router.get('/getHomeAuctions', function(req, res, next) {
	var auctionsQuery = "SELECT * FROM auctions INNER JOIN images ON images.auction_id = auctions.id limit 10";
	connection.query(auctionsQuery, (error, results, fields)=>{
		if (error) throw error;
		res.json(results);
	});
  	// res.render('index', { title: 'Express' });
  	//avoid using res.render in express!
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
			connection.query(insertUserQuery,[req.body.username,req.body.password],(error2,results2)=>{
				res.json({
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

module.exports = router;
//we can access json data posted from the body so req.body
