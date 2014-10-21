var express = require('express'),
	bodyParser = require('body-parser'),
	api = require('./api'),
	app = express();

app.use(bodyParser.json());
app.use('/api', api);
app.use('/', express.static('site'));
app.use('/bower_components', express.static('bower_components'));

app.listen(3000, function() { console.log('ready'); });

