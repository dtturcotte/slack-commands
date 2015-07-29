var express = require('express');
var bodyParser = require('body-parser');
var hellobot = require('./hellobot');
var dantebot = require('./dantebot');

var app = express();
var port = process.env.PORT || 3002;

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
	res.status(200).send('Hello world!')
});

/*
	/sdc is the main endpoint
 */
app.get('/sdc', hellobot);
app.get('/dante', dantebot);

// error handler
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(400).send(err.message);
});

app.listen(port, function () {
	console.log('Slack bot listening on port ' + port);
});
