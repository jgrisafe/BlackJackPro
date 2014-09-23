(function(){

var app = angular.module("blackJackPro");

app.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/home");

	$stateProvider
		.state('home', {
			url: "/home",
			templateUrl: "views/home.html",
			controller: "HomeController"
		})
		.state('game', {
			url: "/game",
			templateUrl: "views/game.html",
			controller: "GameController"
		})
		.state('about', {
			url: "/about",
			templateUrl: "views/about.html",
			controller: "AboutController"
		})
		.state('highScores', {
			url: "/highScores",
			templateUrl: "views/highScores.html",
			controller: "HighScoresController"
		});
});

})();