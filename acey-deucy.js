//holds the balance
var gamePot;
//holds users balance
var userPot;
//holds the state of the game
var gameOver;

//array that holds order of cards
var deckCards = {
    arrayOfCards: [],
    map: {}
}
var sizeOfDeck;

function createCardArray() {
    for (var i = 0; i < 52; i++) {
        deckCards.arrayOfCards[i] = i;
    }

}
function mapCards() {
    var jArray = ["Jack ", "Queen ", "King ", "Ace"];
    var sArr = [" of Diamonds", " of Spades", " of Hearts", " of Clubs"];
    var cardIndex = 0;
    var jCounter = 0;
    var suitsCounter = 0;

    do {
        for (var i = 2; i < 15; i++) {
            if (i == 11) {
                deckCards.map[cardIndex] = jArray[jCounter] + sArr[suitsCounter];
                jCounter++;
                cardIndex++;
            }
            else if (i == 12) {
                deckCards.map[cardIndex] = jArray[jCounter] + sArr[suitsCounter];
                jCounter++;
                cardIndex++;
            }
            else if (i == 13) {
                deckCards.map[cardIndex] = jArray[jCounter] + sArr[suitsCounter];
                jCounter++;
                cardIndex++;
            } else if (i == 14) {
                deckCards.map[cardIndex] = jArray[jCounter] + sArr[suitsCounter];
                jCounter = 0;
                cardIndex++;
            }
            else {
                deckCards.map[cardIndex] = i + sArr[suitsCounter];
                cardIndex++;
            }
        }
        suitsCounter++;
    } while (suitsCounter < 4);
}

//function that deals cards and ends game if not enough cards
function dealCards() {
    var indexArray = [];
    if (sizeOfDeck >= 2) {
        indexArray[0] = deckCards.arrayOfCards[sizeOfDeck - 1];
        deckCards.arrayOfCards.pop();
        indexArray[1] = deckCards.arrayOfCards[sizeOfDeck - 2];
        deckCards.arrayOfCards.pop();
        return indexArray;
    } else {
        //boolean that we check periodically
        shuffleCards();
    }
}

function dealCard() {
    var a = deckCards.arrayOfCards[deckCards.arrayOfCards.length - 1];
    deckCards.arrayOfCards.pop();
    return a;

}

//make a list of random numbers that we can use as a deck
function shuffleCards() {
    for (var i = 0; i < 52; i++) {
        var randIndex = getRand();
        if (i == 0) {
            deckCards.arrayOfCards[i] = randIndex;
        } else {
            while (deckCards.arrayOfCards.indexOf(randIndex) != -1) {
                randIndex = getRand();
            }
            deckCards.arrayOfCards[i] = randIndex;
        }
    }
}

//print the deckCards array
function printDeck() {
    var result = "[";
    for (var i = 0; i < deckCards.arrayOfCards.length; i++) {
        result += deckCards.arrayOfCards[i] + ", ";
    }
    result += "]";
    return result;
}

//updates the user pot and its balance
function updateUserPot(change) {
    userPot += change;
}
//updates the game pot and its balance
function updateGamePot(change) {
    gamePot += change;
}
//prints the strings for the string repres of the deck
function printStringsDeck() {
    var result = "";
    for (var i = 0; i < 52; i++) {
        result += "Card ---> " + deckCards.arrayOfCards[i] + "\n";
    }
    return result;
}

//prints the money in the pot and the player pot
//function to get a random number from [0, 51]
function getRand() {
    return Math.floor(Math.random() * (52));
}
//put in three indices of three cards and compare them
function inBetween(cards, middle) {
    console.log(deckCards.map);
    //these are indices of cards
    var stringA = deckCards.map[cards[0]];
    var stringB = deckCards.map[cards[1]];
    var stringM = deckCards.map[middle];

    var indexA = findIndex(stringA);
    var indexB = findIndex(stringB);
    var indexM = findIndex(stringM);

    var valA = indexA % 13;
    var valB = indexB % 13;
    var valM = indexM % 13;

    console.log("String_A: " + stringA + " VAL_A: " + valA + " + INDEX_A: " + indexA);
    console.log("String_B: " + stringB + " VAL_B: " + valB + " + INDEX_B: " + indexB);
    console.log("String_M: " + stringM + " VAL_M: " + valM + " + INDEX_M: " + indexM);

    if (valA > valB) {
        if ((valB < valM) && (valM < valA)) {
            return true;
        } else {
            return false;
        }
    }
    else {
        if ((valA < valM) && (valA < valB)) {
            return true;
        } else {
            return false;
        }
    }
}
function isGameOver() {
    if (userPot <= 0) {
        gameOver = true;
    }
    else if (gamePot <= 0) {
        gameOver = true;

    } else if (sizeOfDeck < 3) {
        shuffleCards();

    }
}

//initialize the game variables
function initGameVar() {
    //holds the balance
    gamePot = 200;
    //holds users balance
    userPot = 50;
    //holds the state of the game
    gameOver = false;


}

/*function printDealtCards(cards) {
 var i = cards[0];
 var j = cards[1];
 var a = (i) % 13;
 var b = (j) % 13;
 var printA = deckCards.arrayOfCards[i];
 var printB = deckCards.arrayOfCards[j];


 if (a < b) {
 return console.log(" " + printA +
 ", " + printB);

 }
 else if (b < a) {
 return console.log(" " + printB +
 ", " + printA);
 }

 }*/
function findIndex(strn) {
    var a = strn;
    var index;
    var i = 0;
    while (i < 52) {
        if (deckCards.map[i] === a) {
            index = i;
            return index;
        } else {
            i++;
        }
    }
}

function startNewRound() {
    mapCards();
    shuffleCards();
    sizeOfDeck = deckCards.arrayOfCards.length;
}

//////////////////////////////////////////////////////////////////////////////////////
/////////////////////Don't break the stuff below this/////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

initGameVar();
console.log("Press 'enter' to to continue, or '0' to Quit");
rl.setPrompt('AceyDeucy> ');
rl.prompt();
rl.on('line', function (line) {
        if (line == "0" || gameOver) {
            console.log("Game over");
            rl.close();
        }
        startNewRound();

        //initializes all the game var like userPot and gamePot and creates a shuffled deck
        var cardsDealt = dealCards();
        //let's deal and print two cards
        console.log("<------ GAME POT : " + gamePot + " ------>");
        console.log("<------ USER POT : " + userPot + " -------> \n");
        console.log("YOU'VE BEEN DEALT... " + deckCards.map[cardsDealt[0]] + " and " + deckCards.map[cardsDealt[1]] + "\n");

        rl.question("Enter a bet", function (bet) {
                isGameOver();
                var round = function () {
                    var dealt = dealCard();
                    console.log("\nYou got dealt the : " + deckCards.map[dealCard()] + "\n");
                    sizeOfDeck = deckCards.arrayOfCards.length;
                    if (inBetween(cardsDealt, dealt)) {
                        console.log("You won that bet!\n")
                        updateGamePot(-bet);
                        updateUserPot(+bet);
                        console.log("<------ GAME POT : $" + gamePot + " ------>");
                        console.log("<------ USER POT : $" + userPot + " ------->");
                        isGameOver();
                        if (gameOver) {
                            console.log("Game over");
                            rl.close();

                        }
                        console.log("Press 'enter' to continue, or '0' to Quit\n");

                        if (bet == "0") {
                            console.log("Game over");
                            rl.close();
                        }
                    } else {
                        console.log("You lost that bet...\n");
                        updateGamePot(+bet);
                        updateUserPot(-bet);
                        console.log("<------ GAME POT : $" + gamePot + " ------>");
                        console.log("<------ USER POT : $" + userPot + " ------->\n");
                        isGameOver();
                        if (gameOver) {
                            console.log("Game over");
                            rl.close();
                        }
                        console.log("Press 'enter' to continue, or '0' to Quit\n");
                        if (bet == "0") {
                            console.log("Game over");
                            rl.close();
                        }
                        isGameOver();
                    }
                }
                sizeOfDeck = deckCards.arrayOfCards.length;
                round();
                rl.prompt();
            }
        )
    }
).on('close', function () {
    console.log("Thanks!");
    process.exit(0);
});
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////Don't break the stuff above this////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////


/*if (gameOver) {
 console.log("~~~~~~~~~~~~~~~GAME OVER~~~~~~~~~~~~");
 }
 if (!gameOver) {
 isGameOver();
 if (!gameOver) {
 round();
 }
 }*/