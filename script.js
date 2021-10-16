'use strict';

//Selecting elements

//We are going to select section 1 and section 2,because we want to change background color for the active player.
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//We want to select elements for main scores
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

//We want to show current score
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//we want to hide this dice element by default
const diceEl = document.querySelector('.dice');

//now we are going to select all 3 buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Because this 4 variables:scores,currentScore,activePlater and playnig are not accessible in our Event Listeners for ROOL button and HOLD button.
//To solve this problem we need to declare these 4 variables outside the function without any values.
let scores, currentScore, activePlayer, playing;

const init = function () {
  //We need to delete let in all 4 variables, because we want to reassign them in line of code above.

  //We will stored scores of both players in array
  //This is the reason why we named player 1 as player 0 and player 2 as player 1
  //Because array index starts with 0...
  scores = [0, 0];

  //this is variable for the current score (current score+current dice)
  currentScore = 0;

  //In this variable we will hold the active player.
  //If is currently playing player 1 (player 0)it will be 0.
  //If is currently playing player 2 (player 1)it will be 1.
  activePlayer = 0;

  //We want to create a variable to hold the state of the game, to know if we are still playing or not.Because we don’t want to be able to click on buttons, even though the game is over.
  //This variable will be boolean and will have true value, because at the beginning of the game of course we are playing.
  playing = true;

  //setting total score elements to 0
  score0El.textContent = 0;
  score1El.textContent = 0;

  //setting current score elements to 0
  current0El.textContent = 0;
  current1El.textContent = 0;

  //we added .hidden class to css file and we want now to add this hidden class to .dice class in html file
  diceEl.classList.add('hidden');

  //Because we don't know which player has won the game, we need to remove player--winner class for both elements.
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  //We need to set first player as a active player
  player0El.classList.add('player--active');
  //We need to remove player active class from the second elements, because he will never be the first who play the game.
  player1El.classList.remove('player--active');
};

//Now we need to call this init method, because we want when we start the game to automatically loads all the initial values.
init();

//we are going to create a method for switching player, because we need touse this method 2x.
const switchPlayer = function () {
  //switch to next player

  //Before we switch to the next player, we need to set current score of the active player to the 0 (text content).Need to rest current score in user interface.
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  //We need to set variable currentScore to the 0 ie. need to reset current score in our program
  currentScore = 0;

  //We are goind to use here ternary operator to switch to the next player, actually we are going to set (re-assign) here variable activePlayer
  activePlayer = activePlayer === 0 ? 1 : 0;

  //Toggle method will remove class player--active if it's there, and if it's not he will add that class.
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//we are going to implement here rooling dice functionality
btnRoll.addEventListener('click', function () {
  //We just want to be able to click a buttons if the game isn't over.
  if (playing) {
    //We want to be able to click on button only
    //1.Generate a random dice number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.Display dice
    //removing hidden class
    diceEl.classList.remove('hidden');

    //On this way we dynamically loading one of this 6 pictures
    diceEl.src = `dice-${dice}.png`;

    //3.Check for rolled 1
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;

      //we just want to display now currentScore, but later we will change this
      //current0El.textContent = currentScore;

      //Now we are changing above line of code, because we want to dynamically select an element (current score).
      //This is also a reason why we used variable activePlayer with values 0 and 1,because we can now use that variable to build class names current--0 and current--0.
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

//We are going to implement here hold button functionality
btnHold.addEventListener('click', function () {
  //We just want to be able to click a buttons if the game isn't over.
  if (playing) {
    //1.We will store main score-TOTAL VALUE in array scores.
    //Total score is:scores[1]=scores[1]+currentScore;
    scores[activePlayer] += currentScore;

    //We want to dynamically select an element score--0 or score--1 and assign it a score of active player
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.Check if player's score is >=100
    //Finish the game
    if (scores[activePlayer] >= 100) {
      //Here we will re-assign playing variable to false,because the game is over, we have a winner.
      playing = false;

      //We just want to hide the dice if the game is over.
      diceEl.classList.add('hidden');

      //FIRST WE NEED TO SELECT ACTIVE PLAYER(section element and class player--0 or player--1) AND WE WANT TO ADD WINNER CLASS TO CHANGE BACKGROUND COLOR OF THE PLAYER WHO WIN.
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      //We also want to remove player-active class, because we will have now 2 classes:player--winner and player--active.
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3.Switch to the next player
      switchPlayer();
    }
  }
});

//We are going to implement here new game button functionality.We are going to make init function, because we have initial values in 2 situations.
//First when we start the game and second when we press the button new game.We then want to set all initial values.
btnNew.addEventListener('click', init);
