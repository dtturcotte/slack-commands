var request = require('request');

module.exports = function (req, res, next) {

	console.log(req);
	
	var botPayload = {};
	botPayload.text = "dantebot!";
	botPayload.username = 'dicebot';
	botPayload.channel = req.body.channel_id;

	//return res.send({
	//
	//});

	//request({
	//	uri: uri,
	//	method: 'POST',
	//	body: JSON.stringify(payload)
	//}, function (error, response, body) {
	//	if (error) {
	//		return callback(error);
	//	}
	//
	//	callback(null, response.statusCode, body);
	//});

	return res.status(200).json(botPayload);

};

function roll () {

}

function send () {
}
