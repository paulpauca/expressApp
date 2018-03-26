var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', sam);

function sam(req, res, next) {
	res.render('index', 
		{title: "Best Movie Characters of all Time"});
}

module.exports = router;
