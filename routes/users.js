var express = require('express');
var router = express.Router();
const PDFDocument = require('pdfkit');
// Load the data model
//var usersModel = require('../models/usersModel');
var dbtools = require('../models/sqliteTools');

//*************************************************//
// All of these routes are relative to /users      //
//*************************************************//

// GET to Add Character page
router.get('/addcharacter', index);

// POST data from 
router.post('/record', record_data);


//
// Functions responding to HTTP requests
//
function index(req, res, next) {

	// Read data from the database
	usersModel = dbtools.readUserData( function(err,rows) {
		if (err) {
			throw err;
		}
		console.log(rows);
		
		usersModel = rows;

		// parameters for res.render(par1, par2)
		// par1 : a view in the views folder
		// par2 : data to be used when rendering the view
  		res.render(
  			'users', 
  			{ title: 'Add Character', 
  	  			users: usersModel
  			}
  		);
  	});
}

function record_data(req, res, next) {
	console.log(req.body); // show in the console what the user entered
	//usersModel.push(req.body); // Add the user data to the users_data dataset

	// This block is for creating a PDF document
	/*
	const doc = new PDFDocument();
	let name = req.body.name;
	res.setHeader('Content-disposition', 'inline; filename="' + name + '"')
  	res.setHeader('Content-type', 'application/pdf');
  	doc.y = 300;
  	doc.text(name, 50, 50);
  	doc.pipe(res);
  	doc.end();
	*/
	
	// Save to database
	dbtools.saveUser(req.body, () => {
		res.redirect('/users/addcharacter');
	});

}

// Export the router, required in app.js
module.exports = router;
