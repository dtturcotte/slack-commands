module.exports = function (req, res, next) {

	console.log("CALLED");
	console.log(req.body);
	var userName = req.body.user_name;

	//var botPayload = {
	//	text : 'Hello, ' + userName + '!'
	//};
	//
	//// avoid infinite loop
	//if (userName !== 'slackbot') {
	//	return res.status(200).json(botPayload);
	//} else {
	//	return res.status(200).end();
	//}
};
