var request = require('request');

module.exports = function (req, res, next) {

	console.log(req.body);

	var botPayload = {};
	botPayload.text = "";
	botPayload.username = req.body.user_name;
	botPayload.channel = req.body.channel_id;

	/*
		Get all user IDs first...
	 */
	getUserData(botPayload, function (error, status, body) {
		//console.log('BODY',body);
		if (error) {
			return next(error);
		} else if (status !== 200) {
			return next(new Error('Incoming WebHook: ' + status + ' ' + body));
		} else {

			getUserByID(botPayload, function (error, status, body) {
				if (error) {
					return next(error);
				} else if (status !== 200) {
					return next(new Error('Incoming WebHook: ' + status + ' ' + body));
				} else {
					var name = JSON.parse(body).user.name;
					var no_quotes = name.slice(0, name.length);

					console.log('BODY', no_quotes);
					//botPayload.text = body.real_name;
					return res.status(200).json(no_quotes);
				}

			});
		}
	});
};


function getUserData (payload, callback) {

	request({
		uri: 'https://slack.com/api/users.list?token=xoxp-2697721554-7445793969-8170611990-31095b&pretty=1',
		method: 'GET',
		body: JSON.stringify(payload)
	}, function (error, response, body) {
		if (error) {
			return callback(error);
		}
		callback(null, response.statusCode, body);
	});
}

function getUserByID (payload, callback) {

	request({
		uri: 'https://slack.com/api/users.info?token=xoxp-2697721554-7445793969-8170611990-31095b&user=U07870WEB&pretty=1',
		method: 'GET',
		body: JSON.stringify(payload)
	}, function (error, response, body) {
		if (error) {
			return callback(error);
		}
		callback(null, response.statusCode, body);
	});
}
