
// Set messages after game over XXXXXXXXXXX
// the table/game looks like rob made it. change this/
// what about those stupid 11, 12, 13
// what about aces
// the player can hit forever
// there is no win counter/bet system
// there is no deck to drw from
// the cards aren't red or black like they should/could be
// the cards are lame. find images
// there is no delay on showing the cards... it's instant.
// you can see the dealers 2nd card on deal. THat's unfair (to the house)

var theDeck = [];
var playersHand = [];
var dealersHand = [];
var playerTotal = 0;
var dealerTotal = 0;
var topOftheDeck = 5;

$(document).ready(function(){


	$('.deal-button').click(function(){
		createDeck(); // Run a function that creates an array of 1H-13C
		shuffleDeck();

		// Push onto the playersHand array, the new card. then place it in the DOM
		// playersHand.push(theDeck[0]);
		// placeCard('player', 'one', theDeck[0]);

		playersHand.push('1c');
		placeCard('player', 'one', '1c');

		dealersHand.push(theDeck[1]);
		placeCard('dealer', 'one', theDeck[1]);

		playersHand.push(theDeck[2]);
		placeCard('player', 'two', theDeck[2]);

		dealersHand.push(theDeck[3]);
		placeCard('dealer', 'two', theDeck[3]);

		calculateTotal(playersHand, 'player');
		calculateTotal(dealersHand, 'dealer');
	})
	$('.hit-button').click(function(){
		// placeCard('player', 'three', theDeck[4]);
		var slotForNewCard = '';
		var newCard = theDeck[topOftheDeck]
		if (playersHand.length == 2){slotForNewCard = "three";}
		else if(playersHand.length == 3){slotForNewCard = "four";}
		else if(playersHand.length == 4){slotForNewCard = "five";}
		else if(playersHand.length == 5){slotForNewCard = "six";}
		placeCard('player', slotForNewCard, theDeck[topOftheDeck]);
		playersHand.push(theDeck[topOftheDeck]);
		calculateTotal(playersHand, 'player');
		topOftheDeck++;
		if(playerTotal > 21){
			checkWin();
		}
	});



	$('.stand-button').click(function(){
		// Player clicked on stand, What happens to the player? nothing
		var slotForNewCard = "";
		var dealerTotal = calculateTotal(dealersHand, 'dealer');
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

		// Dealer has at least 17 Check to see who won.
		checkWin();
	});


});

function checkWin(){
	dealerTotal = calculateTotal(dealersHand, 'dealer');
	playerTotal = calculateTotal(playersHand, 'player');

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
}

function placeCard(who, where, cardToPlace){
	var classSelector = '.'+who+'-cards .card-'+where;
	$(classSelector).html(cardToPlace);
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
	var cardValue = 0;
	var total = 0;
	for(var i = 0; i < hand.length; i++){
		cardValue = Number(hand[i].slice(0, -1))
		console.log(theAce());
		if(cardValue == 1 && theAce() == false){
			cardValue = 11;
		}else if(cardValue > 10){
			cardValue = 10;
		}else if(cardValue == 1 && theAce() == true){
			cardValue = 1;
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

function theAce(array){

	for(var i = 0; i < playersHand.length; i++){
		// console.log(parseInt(playersHand[i]));
		if((playerTotal > 21) && (parseInt(playersHand[i]) == 1)){
			return true;
		}else {
			return false;
		}
	}
}


















