var HighScore = require('../models/highScores.js');

module.exports.create = function(req, res) {
	var highScore = new HighScore(req.body);
	highScore.save(function(err, result) {
		res.json(result);
	});
};
module.exports.list = function(req, res) {
	HighScore.find({}, function(err, results) {
		res.json(results);
	});
};