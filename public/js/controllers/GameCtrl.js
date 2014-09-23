(function() {

	var app = angular.module('blackJackPro');

	app.controller('GameController', function($resource, $scope, GameFactory) {

		var notAceOrPair = GameFactory.notAceOrPair;
		var oneAce = GameFactory.oneAce;
		var pair = GameFactory.pair;
		$scope.lastHand = {};
		$scope.gameOver = false;
		$scope.hasLastHand = false;
		$scope.getUserValue = GameFactory.getUserValue;
		$scope.getDealerValue = GameFactory.getDealerValue;
		$scope.getCardUrl = GameFactory.getCardUrl;
		$scope.getCorrectGuessString = GameFactory.correctGuessString;
		$scope.lastHandCorrect = false;

		var HighScore = $resource('/api/highScores');

		$scope.addHighScore = function() {

			var highScore = new HighScore();
			highScore.name = $scope.name;
			highScore.score = $scope.score;
			console.log(highScore);
			highScore.$save(function(result) {
				$scope.highScores.push(result);
			});
		};

		$scope.getName = function() {
			$scope.name = window.prompt("Enter your name");
		};

		$scope.submitScore = function() {
			if ($scope.score > 0) {
				$scope.getName();
				$scope.addHighScore();
			} else {
				window.alert('Must have a good score to submit');
			}
		};

		$scope.newHand = function() {

			if ($scope.deck.length < 4) {
				$scope.gameOver = true;
				return;
			}
			if ($scope.hasLastHand) {
				$scope.lastHand = JSON.parse(JSON.stringify($scope.hand));
				console.log($scope.lastHand);
			}

			$scope.userCard1 = $scope.deck.pop();
			$scope.dealerFaceDownCard = $scope.deck.pop();
			$scope.userCard2 = $scope.deck.pop();
			$scope.dealerFaceUpCard = $scope.deck.pop();
			$scope.userHandValue = $scope.getUserValue($scope.userCard1, $scope.userCard2);
			$scope.remainingCards = $scope.deck.length;

			$scope.hand = {
				dealerCard: $scope.dealerFaceUpCard,
				userCard1: $scope.userCard1,
				userCard2: $scope.userCard2,
				correctGuess: $scope.getCorrectGuess($scope.dealerFaceUpCard, $scope.userCard1, $scope.userCard2)
			};

		};

		$scope.getCorrectGuess = function(dealerCard, userCard1, userCard2) {

			var dealerCardValue = $scope.getDealerValue(dealerCard);
			var userHandValue = $scope.getUserValue(userCard1, userCard2);
			var userCard1Value = userCard1.value;
			var userCard2Value = userCard2.value;

			console.log("dealer card: " + dealerCardValue);
			console.log("userCard1: " + userCard1Value);
			console.log("userCard2: " + userCard2Value);


			if (userCard1Value == userCard2Value) {

				if (userCard1Value != 'A' && isNaN(userCard1Value)) {
					userCard1Value = 10;
				}
				console.log("from pair object");

				return pair[dealerCardValue][userCard1Value];

			} else if (userCard1Value == "A" || userCard2Value == 'A') {

				if (userCard1Value != 'A' && isNaN(userCard1Value)) {
					userCard1Value = 10;
				}
				if (userCard2Value != 'A' && isNaN(userCard2Value)) {
					userCard2Value = 10;
				}

				console.log("from one ace object");
				if (userCard1Value == 'A') {
					return oneAce[dealerCardValue][userCard2Value];
				} else {
					return oneAce[dealerCardValue][userCard1Value];
				}

			} else {
				console.log("from no pair or ace object");
				return notAceOrPair[dealerCardValue][userHandValue];
			}
		};

		$scope.userGuess = function(guess) {

			$scope.hasLastHand = true;

			if (!$scope.gameOver) {
				var correctGuess = $scope.getCorrectGuess($scope.dealerFaceUpCard, $scope.userCard1, $scope.userCard2);

				console.log(correctGuess);

				if (guess == correctGuess) {
					$scope.correct++;
					$scope.lastHandCorrect = true;

				} else {

					$scope.wrong++;
					$scope.lastHandCorrect = false;
				}

				$scope.score = $scope.correct - $scope.wrong;

				$scope.newHand();
			} else {
				$scope.addHighScore();
			}
		};

		$scope.init = function() {
			$scope.deck = GameFactory.getDeck(1);
			GameFactory.shuffle($scope.deck);
			$scope.hand = GameFactory.getHand();
			$scope.correct = 0;
			$scope.wrong = 0;
			$scope.gameOver = false;
			$scope.hasLastHand = false;
			$scope.score = 0;
			$scope.newHand();
			$scope.userHandValue = $scope.getUserValue($scope.userCard1, $scope.userCard2)
		};

		$scope.init();


	});

})();