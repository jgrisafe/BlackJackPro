
var mongoose = require('mongoose');

module.exports = mongoose.model('HighScore', {
	name: String,
	score: Number
});