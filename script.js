'use strict';

//Selecting elements
const score0El=document.querySelector('#score--0');
const score1El=document.getElementById('score--1');
//we want to hide this dice element by default
const diceEl=document.querySelector('.dice');

//setting elements to initial values
score0El.textContent=0;
score1El.textContent=0;
//we added .hidden class to css file and we want now to add this hidden class to .dice class in html file
diceEl.classList.add('hidden');


