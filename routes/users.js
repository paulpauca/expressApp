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

	dbtools.saveUser(req.body);

	showPDF(req.body, res);


	
	// Save to database
	/*
	*/
}

function showPDF(data, res) {
	const doc = new PDFDocument();
	let name = data.name;
	res.setHeader('Content-disposition', 'inline; filename="' + name + '"')
  	res.setHeader('Content-type', 'application/pdf');

  	/*
  	let template = {
  		name: "Paul",
  		docType: "patent",
  		paragraph1: "The author, NAME, seeks a DOCTYPE for";
  	}
	*/

    var inputs = [data.name, "patent"];
	var paragraph = "This NAME is a person of interest for DOCTYPE and NAME";
	var keys = ['NAME', 'DOCTYPE'];

	for( var i = 0; i < keys.length; i++) {
		var re = new RegExp(keys[i], 'g');
		paragraph = paragraph.replace(re, inputs[i]);
	}

  	doc.y = 300;
  	doc.text(paragraph, 50, 50);

  	doc.pipe(res);
  	doc.end();
}

// Export the router, required in app.js
module.exports = router;
