



// the player can hit forever
// there is no win counter/bet system
	// *must place bets before cards are dealt
	// *various bet amount options
	// *rolling bank amount
	// *

// there is no deck to drw from
// the cards aren't red or black like they should/could be
// the cards are lame. find images
// there is no delay on showing the cards... it's instant.
// you can see the dealers 2nd card on deal. THat's unfair (to the house)
var theBank = 500;
var theBet = 0;
var theDeck = [];
var playersHand = [];
var dealersHand = [];
var playerTotal = 0;
var dealerTotal = 0;
var topOftheDeck = 4;
var cardsDealt = false;
var firstDealerCard = false;
// var card-reverse = false;

$(document).ready(function(){

	$('.bet-amounts button').click(function(){
		placeBet(this);
		console.log(theBet);
	});

	$('.deal-button').click(function(){
		if(cardsDealt == false){
			createDeck(); // Run a function that creates an array of 1H-13C
			shuffleDeck();
			cardsDealt = true;
			$('.dealer-total-number').addClass('hidden-text');

			// Push onto the playersHand array, the new card. then place it in the DOM
			playersHand.push(theDeck[0]);
			placeCard('player', 'one', theDeck[0]);

			// playersHand.push('1c');
			// placeCard('player', 'one', '1c');

			dealersHand.push(theDeck[1]);
			placeCard('dealer', 'one', theDeck[1]);
			$('.dealer-cards .card-one').addClass('hidden-text');
			$('.dealer-cards .card-one').addClass('firstCard');
			$('.dealer-cards .card-one').children().hide();


			playersHand.push(theDeck[2]);
			placeCard('player', 'two', theDeck[2]);

			dealersHand.push(theDeck[3]);
			placeCard('dealer', 'two', theDeck[3]);

			calculateTotal(playersHand, 'player');
			calculateTotal(dealersHand, 'dealer');
		}
	})

	$('.hit-button').click(function(){
		var slotForNewCard = '';
		var newCard = theDeck[topOftheDeck]
		if (playerTotal >= 21){
			$(".stand-button").trigger("click");
		}else if(playerTotal <= 21){
			if (playersHand.length == 2){slotForNewCard = "three";}
			else if(playersHand.length == 3){slotForNewCard = "four";}
			else if(playersHand.length == 4){slotForNewCard = "five";}
			else if(playersHand.length == 5){slotForNewCard = "six";}
			placeCard('player', slotForNewCard, theDeck[topOftheDeck]);
			playersHand.push(theDeck[topOftheDeck]);
			calculateTotal(playersHand, 'player');
			topOftheDeck++;
		}
		// if(playerTotal > 21 && playerAces > 0){
		// 	playerTotal = playerTotal - playerAces;
		// }
		if(playerTotal >= 21){
			$(".stand-button").trigger("click");
		}
		// if(playerTotal > 21){
		// 	checkWin();
		// }
	});



	$('.stand-button').click(function(){
		// Player clicked on stand, What happens to the player? nothing
		var slotForNewCard = "";
		dealerTotal = calculateTotal(dealersHand, 'dealer');
		while(dealerTotal<17){
			// Dealerhasless than 17. hit away!
			if(dealersHand.length == 2){slotForNewCard = "three";}
			else if(dealersHand.length == 3){slotForNewCard = "four";}
			else if(dealersHand.length == 4){slotForNewCard = "five";}
			else if(dealersHand.length == 5){slotForNewCard = "six";}
			placeCard('dealer', slotForNewCard,theDeck[topOftheDeck]);
			dealersHand.push(theDeck[topOftheDeck]);
			dealerTotal = calculateTotal(dealersHand, 'dealer');
			topOftheDeck++;
		}
		$('.dealer-cards .card-one').removeClass('hidden-text');
		$('.dealer-cards .card-one').removeClass('firstCard');
		$('.dealer-cards .card-one').children().show();
		// Dealer has at least 17 Check to see who won.
		checkWin();
	});


});

function checkWin(){
	// var dealerT = calculateTotal(dealersHand, 'dealer');
	// var playerT = calculateTotal(playersHand, 'player');
	$('.dealer-cards .card-one').removeClass('hidden-text');
	$('.dealer-cards .card-one').children().show();
	$('.dealer-cards .card-one').removeClass('firstCard');
	$('.dealer-total-number').removeClass('hidden-text');

	if(playerTotal > 21){
		// player has busted
		// Set a message somewhere that says this
		$('.update-message').html("You busted");

	}else if(dealerTotal > 21){
		// Dealer has busted
		// set a message somewhere that says this
		$('.update-message').html("You won! the dealer busted");
	}else{
		// Meither player has more than 21
		if(playerTotal > dealerTotal){
			console.log(dealerTotal);
			// Player won. Say this somewhere
			$('.update-message').html("You beat the dealer");
		}else if(dealerTotal > playerTotal){
			// Dealer won. say this somewhere
			$('.update-message').html("The Dealer won");
		}else{
			$('.update-message').html("Push");
			// Push. (tie) say this somewhere
		}
	}
	$('.reset-option').html('<button class="reset-button">Reset Game</button>');
	$('.reset-button').click(function(){
		adjustBank();
	});

}

function reset(){
	theDeck = [];
	playersHand = [];
	dealersHand = [];
	topOftheDeck = 4;
	$('.card').html('<img src="img/cardBack.jpg">');
	$('.update-message').html('Good luck');
	$('.reset-button').remove('.reset-button');
	calculateTotal(playersHand, 'player');
	calculateTotal(dealersHand, 'dealer');
	cardsDealt = false;
}


function placeCard(who, where, cardToPlace){

	var classSelector = '.'+who+'-cards .card-'+where;

	var cardPass = cardToPlace.slice(0, -1);
	if (cardPass == 11){
		cardPass = "J";
	}else if(cardPass == 12){
		cardPass = "Q";
	}else if(cardPass == 13){
		cardPass = "K";
	}else if(cardPass == 1){
		cardPass = "A";
	}

	$(classSelector).html(cardPass);


	if (cardToPlace.indexOf('h') > -1){
		$(classSelector).append('<img style="width:30px;height:30px;display:block;margin:auto;" src="img/heart.jpg">');
	}else if (cardToPlace.indexOf('c') > -1){
		$(classSelector).append('<img style="width:30px;height:30px;display:block;margin:auto;" src="img/club.jpg">');
	}else if (cardToPlace.indexOf('d') > -1){
		$(classSelector).append('<img style="width:30px;height:30px;display:block;margin:auto;" src="img/diamond.jpg">');
	}else if (cardToPlace.indexOf('s') > -1){
		$(classSelector).append('<img style="width:30px;height:30px;display:block;margin:auto;" src="img/spade.jpg">');
	}
}

function createDeck(){
	// fill the deck with 
	// - 52 cards
	// - 4 suits
	// -hearts, diamonds, clubs, spades
	var suits = ['h','s','d','c'];
	for(var s=0; s<suits.length; s++){
		for(var c=1; c<=13; c++){
			theDeck.push(c+suits[s]);
		}
	}
}

function shuffleDeck(){
	// [1]
	// [2]
	// [3]
	// ...
	// [50]
	// [51]
	// [52]
	for(var i=1; i<1000; i++){
		card1 = Math.floor(Math.random() * theDeck.length);
		card2 = Math.floor(Math.random() * theDeck.length);
		var temp = theDeck[card1];
		theDeck[card1] = theDeck[card2];
		theDeck[card2] = temp;
	}
}


function calculateTotal(hand, whosTurn){
	var hasAce = false; //initial Ace as false
	var cardValue = 0;
	var total = 0;
	for(var i = 0; i < hand.length; i++){
		cardValue = Number(hand[i].slice(0, -1))
		if((cardValue == 1) && ((total + 11) <= 21)){
			//This card is an Ace!! Check if 11 will fit. If not, it's a 1
			cardValue = 11;
			hasAce = true;
		}else if(cardValue > 10){
			cardValue = 10;
		}else if(((cardValue + total) > 21) && hasAce){
			total = total - 10;
			hasAce = false;
		}
		total += cardValue;
	}
	if (whosTurn == 'player'){
		playerTotal = total;
	}

	// Update the html with the new total
	var elementToUpdate = '.'+whosTurn+'-total-number';
	$(elementToUpdate).html(total);
	return total;
}

function placeBet(betButton){
	// var fiveD = $('.dollar5').attr("value");
	// var tenD = $('.dollar10').attr("value");
	// var fiftyD = $('.dollar50').attr("value");
	// var hundoD = $('.dollar100').attr("value");

	if(cardsDealt == false  && theBank > 0){
		var bet = $(betButton).attr("value");

		if(bet == "5"){
			theBank -= 5;
			theBet += 5;
		}else if(bet == "10"){
			theBank -= 10;
			theBet += 10;
		}else if(bet == "50"){
			theBank -= 50;
			theBet += 50;
		}else if(bet == "100"){
			theBank -= 100;
			theBet += 100;
		}
	}

	$('.bank').html('Bank: $'+theBank);
	$('.yourBet').html('YourBet: $'+theBet);
}

function adjustBank(){
	if(playerTotal > 21){
		// player has busted
		// Set a message somewhere that says this
		theBet = 0;
		$('.yourBet').html('yourBet: $'+theBet);
	}else if(dealerTotal > 21){
		// Dealer has busted
		// set a message somewhere that says this
		theBank = theBank + (theBet * 2);
		theBet = 0;
		$('.bank').html('Bank: $'+theBank);
		$('.yourBet').html('YourBet: $'+theBet);
	}else{
		// Meither player has more than 21
		if(playerTotal > dealerTotal){
			// Player won. Say this somewhere
			theBank = theBank + (theBet * 2);
			theBet = 0;
			$('.bank').html('Bank: $'+theBank);
			$('.yourBet').html('YourBet: $'+theBet);			
		}else if(dealerTotal > playerTotal){
			// Dealer won. say this somewhere
			theBet = 0;
			$('.yourBet').html('yourBet: $'+theBet);
		}else{
			theBank = theBank + theBet;
			theBet = 0;
			$('.bank').html('Bank: $'+theBank);
			$('.yourBet').html('YourBet: $'+theBet);			
			// Push. (tie) say this somewhere
		}
	}
	reset();
}




		// if (playerTotal == 21){
		// 	checkWin();
		// }else 











