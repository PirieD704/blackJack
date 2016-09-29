#BlackJack game using jQuery/JavaScript, HTML, and CSS

###Overview:
The game has three primary buttons. Deal, hit, and stand. There is a reset button that appears at the completion of each hand. This is when the total for the bank gets the bet added to it if the player won. There are four separate amounts that can be bet (5, 10, 50, 100).  Your bet is subtracted from the bank and displayed above the table.

###Implementation and Details:
The table is setup with Boostrap. Some features to note on it is that you cannot go beyond the limit that is in your bank.  You cannot continue to bet or redeal after the cards are dealt until the hand is finished.  You cannot view the dealer's first card or their total until you have completed your decisions. The communication with the DOM relies almost entirely on Jquery. 

###Challenges
A notable challenge was creating the deck and shuffling it each time a hand is dealt.  this occurs within the shuffleDeck and createDeck functions. There is an array named theDeck that stores our cards. Create deck runs nested for-loops with the top loop controlling the suits and pulling from array 'suits' and the inner loops assigning a value of 1-13 for each of the four suits.  ShuffleDeck then does to random number generations between 1 and 52 inside of a for-loop running for 1000 instances.  The var temp takes the indice the array element from 'theDeck' of whatever is produced from 'card1' and switches it with the array element from 'theDeck' of whatever is produced from 'card2'... 1000 times! (that's a good shuffle!).

the code:
```javascript
theDeck = [];
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
```

Another challenge included defining the ace properly so that accurate score was kept for both the dealer and the user.  In blackjack, the ace can carry two possible values, 1 or 11, depending on the current total in your hand. Since the goal is to hit 21, if you have a 3 and an ace and therefore standing at 14, you would want to hit. If you were to get a face card like a king, your ace would now carry a value of 1 to prevent you from busting. The 'calculateTotal' function takes two parameter, the current hand of either player and whos turn it is.  It loops through the hand identifying each card using the cardValue variable. If it finds and ace (cardValue == 1) then it determins what the current total value would be in both cases of the ace value (either 1 or 11) and sees if that would make the current total greater than 21. If so, then card gets counted as a value of 1. This function is usual because it identifies cards without changing anything in the arrays playersHand or dealersHand and therefore can be called in multiple other function without fear of breaking the code. 

```javascript
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
```





