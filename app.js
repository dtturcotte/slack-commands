var express = require('express');
var bodyParser = require('body-parser');
var dantebot = require('./dantebot');
var suki = require('./suki');

var app = express();
var port = process.env.PORT || 3004;

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.status(200).send('Slack Imposter Bot')
});

/*
	/sdc is the main endpoint
 */
app.post('/sdc', dantebot);
app.get('/sdc', dantebot);
app.post('/suki', suki);
app.get('/suki', suki);

// error handler
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(400).send(err.message);
});

app.listen(port, function () {
	console.log('Slack bot listening on port ' + port);
});
