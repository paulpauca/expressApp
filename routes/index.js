var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('index', 
		{title: "Best Movie Characters of all Time"});
});

module.exports = router;
