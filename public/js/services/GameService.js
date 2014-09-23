(function() {

	var app = angular.module("blackJackPro");

	app.factory("GameFactory", function() {

		var service = {};

		service.correctGuessString = function(guess) {

			switch (guess) {
				case 'H':
					return 'Hit';
				case 'S':
					return 'Stay';
				case 'SP':
					return 'Split';
				case 'D':
					return 'Double Down';
				default:
					return '';
			};
		};

		service.getCardUrl = function(card) {

			if (card) {
				var value = card.value;
				var suit = card.suit;
				var url = '';

				if (value == 'J') {
					value = 'jack';
				} else if (value == 'Q') {
					value = 'queen';
				} else if (value == 'K') {
					value = 'king';
				} else if (value == 'A') {
					value = 'ace';
				}

				url = 'img/cards/' + value + '_of_' + suit + 's.png'

				return url;

			} else {
				return 'img/cards/cardBack.png';
			}
		};

		service.getHand = function() {

			var dealerCard = deck[Math.floor(Math.random() * 52)];
			var userCard1 = deck[Math.floor(Math.random() * 52)];
			var userCard2 = deck[Math.floor(Math.random() * 52)];

			return [dealerCard, userCard1, userCard2];

		};

		service.getDeck = function(numberOfDecks) {

			var decks = [];
			for (i = 0; i < numberOfDecks; i++) {

				decks = decks.concat(deck);
			}
			return decks;
		};

		service.shuffle = function(deck) {

			var length = deck.length;

			for (i = 0; i < length; i++) {
				var temp = deck[i];
				var random = Math.floor(Math.random() * length);
				deck[i] = deck[random];
				deck[random] = temp;
			}

			return deck;
		};

		service.getUserValue = function(card1, card2) {

			var card1Value = 0;
			var card2Value = 0;

			if (isNaN(card1.value)) {
				card1Value = 10;
			} else {
				card1Value = parseInt(card1.value);
			}

			if (isNaN(card2.value)) {
				card2Value = 10;
			} else {
				card2Value = parseInt(card2.value);
			}

			if (card1.value == 'A') {
				card1Value = 11;
			}
			if (card2.value == 'A') {
				if (card1Value == 11) {
					card2Value = 1;
				} else {
					card2Value = 11;
				}

			}

			return card1Value + card2Value;
		};

		service.getDealerValue = function(dealerCard) {

			var dealerCardValue = dealerCard.value;

			if (isNaN(dealerCardValue) && dealerCardValue != 'A') {
				dealerCardValue = 10;
			} else if (dealerCardValue != 'A') {
				dealerCardValue = parseInt(dealerCardValue);
			}

			return dealerCardValue;
		};


		service.notAceOrPair = {
			2: {
				20: "S",
				19: "S",
				18: "S",
				17: "S",
				16: "S",
				15: "S",
				14: "S",
				13: "S",
				12: "H",
				11: "D",
				10: "D",
				9: "H",
				8: "H",
				7: "H",
				6: "H",
				5: "H",
				4: "H"
			},
			3: {
				20: "S",
				19: "S",
				18: "S",
				17: "S",
				16: "S",
				15: "S",
				14: "S",
				13: "S",
				12: "H",
				11: "D",
				10: "D",
				9: "D",
				8: "H",
				7: "H",
				6: "H",
				5: "H",
				4: "H"
			},
			4: {
				20: "S",
				19: "S",
				18: "S",
				17: "S",
				16: "S",
				15: "S",
				14: "S",
				13: "S",
				12: "S",
				11: "D",
				10: "D",
				9: "D",
				8: "H",
				7: "H",
				6: "H",
				5: "H",
				4: "H"
			},
			5: {
				20: "S",
				19: "S",
				18: "S",
				17: "S",
				16: "S",
				15: "S",
				14: "S",
				13: "S",
				12: "S",
				11: "D",
				10: "D",
				9: "D",
				8: "H",
				7: "H",
				6: "H",
				5: "H",
				4: "H"
			},
			6: {
				20: "S",
				19: "S",
				18: "S",
				17: "S",
				16: "S",
				15: "S",
				14: "S",
				13: "S",
				12: "S",
				11: "D",
				10: "D",
				9: "D",
				8: "H",
				7: "H",
				6: "H",
				5: "H",
				4: "H"
			},
			7: {
				20: "S",
				19: "S",
				18: "S",
				17: "S",
				16: "H",
				15: "H",
				14: "H",
				13: "H",
				12: "H",
				11: "D",
				10: "D",
				9: "H",
				8: "H",
				7: "H",
				6: "H",
				5: "H",
				4: "H"
			},
			8: {
				20: "S",
				19: "S",
				18: "S",
				17: "S",
				16: "H",
				15: "H",
				14: "H",
				13: "H",
				12: "H",
				11: "D",
				10: "D",
				9: "H",
				8: "H",
				7: "H",
				6: "H",
				5: "H",
				4: "H"
			},
			9: {
				20: "S",
				19: "S",
				18: "S",
				17: "S",
				16: "H",
				15: "H",
				14: "H",
				13: "H",
				12: "H",
				11: "D",
				10: "D",
				9: "H",
				8: "H",
				7: "H",
				6: "H",
				5: "H",
				4: "H"
			},
			10: {
				20: "S",
				19: "S",
				18: "S",
				17: "S",
				16: "H",
				15: "H",
				14: "H",
				13: "H",
				12: "H",
				11: "D",
				10: "H",
				9: "H",
				8: "H",
				7: "H",
				6: "H",
				5: "H",
				4: "H"
			},
			A: {
				20: "S",
				19: "S",
				18: "S",
				17: "S",
				16: "H",
				15: "H",
				14: "H",
				13: "H",
				12: "H",
				11: "H",
				10: "H",
				9: "H",
				8: "H",
				7: "H",
				6: "H",
				5: "H",
				4: "H"
			}
		};

		service.oneAce = {
			2: {
				10: 'S',
				9: 'S',
				8: 'S',
				7: 'S',
				6: 'H',
				5: 'H',
				4: 'H',
				3: 'H',
				2: 'H'
			},
			3: {
				10: 'S',
				9: 'S',
				8: 'S',
				7: 'D',
				6: 'H',
				5: 'H',
				4: 'H',
				3: 'H',
				2: 'H'

			},
			4: {
				10: 'S',
				9: 'S',
				8: 'S',
				7: 'D',
				6: 'D',
				5: 'D',
				4: 'D',
				3: 'H',
				2: 'H'

			},
			5: {
				10: 'S',
				9: 'S',
				8: 'S',
				7: 'D',
				6: 'D',
				5: 'D',
				4: 'D',
				3: 'D',
				2: 'D'

			},
			6: {
				10: 'S',
				9: 'S',
				8: 'S',
				7: 'D',
				6: 'D',
				5: 'D',
				4: 'D',
				3: 'D',
				2: 'D'

			},
			7: {
				10: 'S',
				9: 'S',
				8: 'S',
				7: 'S',
				6: 'H',
				5: 'H',
				4: 'H',
				3: 'H',
				2: 'H'

			},
			8: {
				10: 'S',
				9: 'S',
				8: 'S',
				7: 'H',
				6: 'H',
				5: 'H',
				4: 'H',
				3: 'H',
				2: 'H'

			},
			9: {
				10: 'S',
				9: 'S',
				8: 'S',
				7: 'H',
				6: 'H',
				5: 'H',
				4: 'H',
				3: 'H',
				2: 'H'

			},
			10: {
				10: 'S',
				9: 'S',
				8: 'S',
				7: 'H',
				6: 'H',
				5: 'H',
				4: 'H',
				3: 'H',
				2: 'H'

			},
			A: {
				10: 'S',
				9: 'S',
				8: 'S',
				7: 'H',
				6: 'H',
				5: 'H',
				4: 'H',
				3: 'H',
				2: 'H'

			}
		};

		service.pair = {
			2: {
				A: 'SP',
				10: 'S',
				9: 'SP',
				8: 'SP',
				7: 'SP',
				6: 'SP',
				5: 'D',
				4: 'H',
				3: 'SP',
				2: 'SP'
			},
			3: {
				A: 'SP',
				10: 'S',
				9: 'SP',
				8: 'SP',
				7: 'SP',
				6: 'SP',
				5: 'D',
				4: 'H',
				3: 'SP',
				2: 'SP'

			},
			4: {
				A: 'SP',
				10: 'S',
				9: 'SP',
				8: 'SP',
				7: 'SP',
				6: 'SP',
				5: 'D',
				4: 'H',
				3: 'SP',
				2: 'SP'

			},
			5: {
				A: 'SP',
				10: 'S',
				9: 'SP',
				8: 'SP',
				7: 'SP',
				6: 'SP',
				5: 'D',
				4: 'SP',
				3: 'SP',
				2: 'SP'

			},
			6: {
				A: 'SP',
				10: 'S',
				9: 'SP',
				8: 'SP',
				7: 'SP',
				6: 'SP',
				5: 'D',
				4: 'SP',
				3: 'SP',
				2: 'SP'

			},
			7: {
				A: 'SP',
				10: 'S',
				9: 'S',
				8: 'SP',
				7: 'SP',
				6: 'H',
				5: 'D',
				4: 'H',
				3: 'SP',
				2: 'SP'

			},
			8: {
				A: 'SP',
				10: 'S',
				9: 'SP',
				8: 'SP',
				7: 'H',
				6: 'H',
				5: 'D',
				4: 'H',
				3: 'H',
				2: 'H'

			},
			9: {
				A: 'SP',
				10: 'S',
				9: 'SP',
				8: 'SP',
				7: 'H',
				6: 'H',
				5: 'D',
				4: 'H',
				3: 'H',
				2: 'H'

			},
			10: {
				A: 'SP',
				10: 'S',
				9: 'S',
				8: 'SP',
				7: 'H',
				6: 'H',
				5: 'H',
				4: 'H',
				3: 'H',
				2: 'H'

			},
			A: {
				A: 'SP',
				10: 'S',
				9: 'S',
				8: 'SP',
				7: 'H',
				6: 'H',
				5: 'H',
				4: 'H',
				3: 'H',
				2: 'H'

			}
		};


		var deck = [{
			"value": "A",
			"suit": "Heart"
		}, {
			"value": "2",
			"suit": "Heart"
		}, {
			"value": "3",
			"suit": "Heart"
		}, {
			"value": "4",
			"suit": "Heart"
		}, {
			"value": "5",
			"suit": "Heart"
		}, {
			"value": "6",
			"suit": "Heart"
		}, {
			"value": "7",
			"suit": "Heart"
		}, {
			"value": "8",
			"suit": "Heart"
		}, {
			"value": "9",
			"suit": "Heart"
		}, {
			"value": "10",
			"suit": "Heart"
		}, {
			"value": "J",
			"suit": "Heart"
		}, {
			"value": "Q",
			"suit": "Heart"
		}, {
			"value": "K",
			"suit": "Heart"
		}, {
			"value": "A",
			"suit": "Diamond"
		}, {
			"value": "2",
			"suit": "Diamond"
		}, {
			"value": "3",
			"suit": "Diamond"
		}, {
			"value": "4",
			"suit": "Diamond"
		}, {
			"value": "5",
			"suit": "Diamond"
		}, {
			"value": "6",
			"suit": "Diamond"
		}, {
			"value": "7",
			"suit": "Diamond"
		}, {
			"value": "8",
			"suit": "Diamond"
		}, {
			"value": "9",
			"suit": "Diamond"
		}, {
			"value": "10",
			"suit": "Diamond"
		}, {
			"value": "J",
			"suit": "Diamond"
		}, {
			"value": "Q",
			"suit": "Diamond"
		}, {
			"value": "K",
			"suit": "Diamond"
		}, {
			"value": "A",
			"suit": "Club"
		}, {
			"value": "2",
			"suit": "Club"
		}, {
			"value": "3",
			"suit": "Club"
		}, {
			"value": "4",
			"suit": "Club"
		}, {
			"value": "5",
			"suit": "Club"
		}, {
			"value": "6",
			"suit": "Club"
		}, {
			"value": "7",
			"suit": "Club"
		}, {
			"value": "8",
			"suit": "Club"
		}, {
			"value": "9",
			"suit": "Club"
		}, {
			"value": "10",
			"suit": "Club"
		}, {
			"value": "J",
			"suit": "Club"
		}, {
			"value": "Q",
			"suit": "Club"
		}, {
			"value": "K",
			"suit": "Club"
		}, {
			"value": "A",
			"suit": "Spade"
		}, {
			"value": "2",
			"suit": "Spade"
		}, {
			"value": "3",
			"suit": "Spade"
		}, {
			"value": "4",
			"suit": "Spade"
		}, {
			"value": "5",
			"suit": "Spade"
		}, {
			"value": "6",
			"suit": "Spade"
		}, {
			"value": "7",
			"suit": "Spade"
		}, {
			"value": "8",
			"suit": "Spade"
		}, {
			"value": "9",
			"suit": "Spade"
		}, {
			"value": "10",
			"suit": "Spade"
		}, {
			"value": "J",
			"suit": "Spade"
		}, {
			"value": "Q",
			"suit": "Spade"
		}, {
			"value": "K",
			"suit": "Spade"
		}];

		return service;

	});

})();