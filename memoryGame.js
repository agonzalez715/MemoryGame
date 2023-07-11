const gameContainer = document.getElementById("game");//holds the DOM element with the ID of game that we can use later to append to 
let card1 = null;// variable to hold first card picked 
let card2 = null; //variable to hold second card picked 
let cardsFlipped = 0;// keeps track of the number of cards that have been successfully matched 
let noClicking = false;// a boolean variable that prevents furthur clicks on the cards when set to true, as of this moment, clicking is allowed because the boolean is set to false, we want this to keep the player from clicking too many cards at once 

//COLORSis an array contianing the different colots used for the game cards, there are 2 of each color since we need to pair card1 with card2
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

//this is a shuffle function that uses the Fisher-Yates algorithm to shuffle the elements of the COLORS array, takes an array as its input 
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);// holds the shuffled array of colors (COLORS) retreived by calling the "shuffle" function on the "COLORS" array that is  passed through

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {//starts the loop over the COLORS array
    const newDiv = document.createElement("div");//creates a new div element for each element looped over
    newDiv.classList.add(color);//adds the current  color from the loop iteration of colorArray as a class list to the new div created. this will determine the visual representaiton of the card
    newDiv.addEventListener("click", handleCardClick);//adds an event listener "click" to the new div element created. when clicked the "handleCardCLick" function will be called
    gameContainer.append(newDiv);//appends the new div element as a child to the gameContainer identified from the beggning 

  }
}

//this function helps to flip and match cards, performs the actual logic 
function handleCardClick(e) {//takes an event object as the parameter, in this case a click event since that what we want to trigger the logic when clicking the game
  if (noClicking) return;//checks to see if the noClicking variable is true, if so, the user is not allowed to click on more cards
  if (e.target.classList.contains("flipped")) return;// checks to nsee if the clicked card "e.target" already has a class of "flipped", to check if cards are already matched or not 
  

  let currentCard = e.target;//currentCard variable assigned as the event target for the click event in the previous function, the element that triggered the event 
  currentCard.style.backgroundColor = currentCard.classList[0];//when clicked, the background color of the card is set to the color based on the assigned class, in this case the first class with the index of 0 since we have multiple classes attached 


  if (!card1 || !card2) {//if card1 or card2 is not assigned, neither cards have been flipped yet
    currentCard.classList.add("flipped");//add the flipped class to the current card which will flip the card and reveal the color for that card
    card1 = card1 || currentCard;//assign current card to card1 if card1 has not been assigned yet 
    card2 = currentCard === card1 ? null : currentCard;//otherwise, assign currentCard to card2
  }

  if (card1 && card2) {//check to see if card1 and card2 have been assigned and not null, if true, continue with logic 
    noClicking = true; //if true, continue wtih logic, if false, no action taken and disable clicking for a set time if the cards do not match 
    // debugger
    let gif1 = card1.className;//setting class names of card1 to variable
    let gif2 = card2.className;//setting class names of card2 to gif2

    if (gif1 === gif2) {//check to see if the classNames of gif1 and gif2 are the same
      cardsFlipped += 2;//if true, the number of cards flipped changes to 2 (using the counter)
      card1.removeEventListener("click", handleCardClick);//if matched, we are then removing the clickEvent to prevent those cards from being clicked on again
      card2.removeEventListener("click", handleCardClick);//if matched, we are then removing the clickEvent to prevent those cards from being clicked on again
      card1 = null;//reset card to null to indicate that no cards are currently selected
      card2 = null;//reset card to null to indicate that no cards are currently selected
      noClicking = false;//re-enable clicking on cards to allow for more clicks
    } else {//if the cards dont match
      setTimeout(function() {//setTimout function 
        card1.style.backgroundColor = "";//setbackground color to "blank"
        card2.style.backgroundColor = "";//setbackground color to "blank"
        card1.classList.remove("flipped");//remove the "flipped class" to undo the flip
        card2.classList.remove("flipped");//remove the "flipped class" to undo the flip
        card1 = null;//reset the cards to null so no cards are selected
        card2 = null;
        noClicking = false;//allow for additional clicks 
      }, 1000);//this logic will perform after a 1 second delay
    }
  }

  if (cardsFlipped === COLORS.length) alert("YOU'VE WON!");//if the number of cardsFlipped equals the length of the COLORS array, then the game is over with an alert to indicate all of the cards have been flipped 
}

//the function needs to be in the global scope to initiate the whole game
function startGame () {
    shuffledColors = shuffle(COLORS);//the function will call the shuffledColors function 
    gameContainer.innerHTML = "";//reset the inner html
    createDivsForColors(shuffledColors);//create the div elements for the different colors 
    }

const startButton = document.getElementById("startButton");//grab the button element from the HTML
startButton.addEventListener("click", startGame);//add an event listener to the button that calls the start game function

//function to reset the game
function resetGame() {
  //reset variables
  card1 = null;
  card2 = null;
  cardsFlipped = 0;
  noClicking = false;

  //reset card styles
  const cards = document.querySelectorAll(".flipped");//selecting all cards with a class of "flipped"
    cards.forEach(card => {//cards is the variable we just created, the forEach method is used to loop over each element of the "cards" list, that will take a callback function as an argument which will be excecuted for each element in the list without having to write a traditional "for loop"
    card.style.backgroundColor = "";//resetting the card color to blank or "empty"
    card.classList.remove("flipped");//resetting the card to flipped, (removing the flipped class)
  });

  //reenable click event listeners
  const allCards = document.querySelectorAll(".game-card");
  allCards.forEach(card => {
    card.addEventListener("click", handleCardClick);
  });
}

//add event listener to the reset button
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGame);

