var request = require('request');

module.exports = function (req, res, next) {

	console.log(req.body);

	var botPayload = {};
	botPayload.text = 'I wanna die!!!';
	botPayload.username = 'my_new_bot';
	//botPayload.channel = req.body.channel_id;
	botPayload.channel = '#crub';
	botPayload.icon_url = 'http://i.imgur.com/IciaiJt.png';

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
					console.log('JSON.parse(body)', JSON.parse(body));
					var name = JSON.parse(body).user.name;
					var no_quotes = name.slice(0, name.length);
					var image = JSON.parse(body).user.profile.image_48;

					botPayload.username = no_quotes;
					botPayload.icon_url = image;
					postToSlack(botPayload, function (error, status, body) {


					});


					console.log('BODY', no_quotes);



					//botPayload.text = body.real_name;
					//return res.status(200).json(botPayload);
				}

			});
		}
	});
};

function postToSlack (payload, callback) {
	var val = JSON.stringify(payload);
	console.log('PAYLOAD', val);
	request({
		headers: {
			'content-type': 'application/json'
		},
		uri: 'https://hooks.slack.com/services/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',
		body: val,
		method: 'POST'
	}, function (error, response, body) {
		if (error) {
			return callback(error);
		}
		console.log('RESPONSE', body);
		callback(null, response.statusCode, body);
	});
}


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
