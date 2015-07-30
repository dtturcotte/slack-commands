var request = require('request');

module.exports = function (req, res, next) {
	return res.status(200).json('success');
	var botPayload = {};
	botPayload.text = '';
	botPayload.username = 'my_new_bot';
	botPayload.icon_url = 'http://i.imgur.com/IciaiJt.png';
	botPayload.channel = '#smash-bros';
	//botPayload.channel = req.body.channel_id;
	var query = req.query.text;
	var bodytext = req.body.text;

	if (typeof query !== 'undefined') {

		botPayload.userToGet = query.split(',')[0];

		getUserData(botPayload, function (error, status, body) {

			if (error) {
				return next(error);
			} else if (status !== 200) {
				return next(new Error('Incoming WebHook: ' + status + ' ' + body));
			} else {

				var userDataArray = JSON.parse(body);
				var profileFound = false;
				for (var i = 0; i < userDataArray.members.length; i++) {
					if (!profileFound) {
						if (userDataArray.members[i].name === botPayload.userToGet) {
							botPayload.userID = userDataArray.members[i].id;
							botPayload.username = userDataArray.members[i].name;
							botPayload.icon_url = userDataArray.members[i].profile.image_48;
							botPayload.text = query.substring(req.body.text.lastIndexOf(',') + 1, query.length);
							profileFound = true;
						}
					}
				}
				postToSlack(botPayload, function (error, status, body) {
					if (error) {
						return next(error);
					} else if (status !== 200) {
						return next(new Error('Incoming WebHook: ' + status + ' ' + body));
					} else {
						return res.status(200).json('success');
					}
				});
			}
		});
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
