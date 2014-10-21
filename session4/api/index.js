var express = require('express'),
	router = express.Router(),
	fs = require('fs');

router.get('/', function(req, res, next) {
	fs.readFile(__dirname + '/../data/students.json', function(err, buffer) {
		if (err) throw err;
		res.status(200).send(buffer.toString());
	});
});

router.post('/', function(req, res, next) {
	fs.writeFile(__dirname + '/../data/students.json', JSON.stringify(req.body), function(err) {
		if (err) {
			res.status(500).send(JSON.stringify(err));
		} else {
			res.status(204).send('');
		}
	});
});

module.exports = router;



