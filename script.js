'use strict';

//Selecting elements
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

//setting elements to initial values
score0El.textContent = 0;
score1El.textContent = 0;
//we added .hidden class to css file and we want now to add this hidden class to .dice class in html file
diceEl.classList.add('hidden');

//this is variable for the current score (current score+current dice)
let currentScore = 0;

//we are going to implement here rooling dice functionality
btnRoll.addEventListener('click', function () {
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
    current0El.textContent = currentScore;
  } else {
    //switch to next player
  }
});
