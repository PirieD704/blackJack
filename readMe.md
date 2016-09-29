#BlackJack game using jQuery/JavaScript, HTML, and CSS

###Overview:
The game has three primary buttons. Deal, hit, and stand. There is a reset button that appears at the completion of each hand. This is when the total for the bank gets the bet added to it if the player won. There are four separate amounts that can be bet (5, 10, 50, 100).  Your bet is subtracted from the bank and displayed above the table.

###Implementation and Details:
The table is setup with Boostrap. Some features to note on it is that you cannot go beyond the limit that is in your bank.  You cannot continue to bet or redeal after the cards are dealt until the hand is finished.  You cannot view the dealer's first card or their total until you have completed your decisions. The communication with the DOM relies almost entirely on Jquery. 

###Challenges
A notable challenge was creating the deck and shuffling it each time a hand is dealt.  this occurs within the shuffleDeck and createDeck functions. There is an array named theDeck that stores our cards. Create deck runs nested for-loops with the top loop controlling the suits and pulling from array 'suits' and the inner loops assigning a value of 1-13 for each of the four suits.  ShuffleDeck then does to random number generations between 1 and 52 inside of a for-loop running for 1000 instances.  The var temp takes the indice the array element from 'theDeck' of whatever is produced from 'card1' and switches it with the array element from 'theDeck' of whatever is produced from 'card2'... 1000 times! (that's a good shuffle!).

the code:
```	
javascript
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

Another challenge included defining the ace properly so that accurate score was kept for both the dealer and the user.  In blackjack, the ace can carry two possible values, 1 or 11, depending on the current total in your hand. Since the goal is to hit 21, if you have a 3 and an ace and therefore standing at 14, you would want to hit. If you were to get a face card like a king, your ace would now carry a value of 1 to prevent you from busting.  
