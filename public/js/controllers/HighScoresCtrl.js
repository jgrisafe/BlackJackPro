(function() {

	angular.module('blackJackPro').controller('HighScoresController', ['$scope', '$resource',
		function($scope, $resource) {

			var HighScore = $resource('/api/highScores');

			$scope.highScores = [];

			HighScore.query(function(results) {
				$scope.highScores = results;
			});


		}
	]);

})();


// $scope.addHighScore = function() {

// 	var highScore = new HighScore();
// 	highScore.name = $scope.name;
// 	highScore.score = $scope.score;
// 	console.log(highScore);
// 	highScore.$save(function(result) {
// 		$scope.highScores.push(result);
// 	});
// };