var request = require('request');

module.exports = function (req, res, next) {
	var botPayload = {};
	botPayload.username = 'trivia';
	botPayload.icon_url = 'http://i.imgur.com/AwFZGEa.png';
	botPayload.text = 'AH AH AH, YOU DIDN\'T SAY THE MAGIC WORD!';
	botPayload.channel = req.body.channel_id;

	var userName = req.body.user_name;

	var botPayload = {
		text : 'Hello IM JOAO!'
	};

	// avoid infinite loop
	if (userName !== 'slackbot') {
		return res.status(200).json(botPayload);
	} else {
		return res.status(200).end();
	}

};


function postToSlack (payload, callback) {
	request({
		headers: {
			'content-type': 'application/json'
		},
		uri: 'https://hooks.slack.com/services/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',
		body: JSON.stringify(payload),
		method: 'POST'
	}, function (error, response, body) {
		if (error) {
			return callback(error);
		}
		callback(null, response.statusCode, body);
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
};
