'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new');
const btnCommit = document.querySelector('.btn--commit');
const totalEl = document.querySelector('.total');
const hintEl = document.querySelector('.hint');

let scores, activePlayer, playing;
// Starting conditions
const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  playing = true;
  document.getElementById('name--0').classList.remove('hidden');
  document.getElementById('name--1').classList.remove('hidden');
  document.querySelector('#score--0').textContent = '';
  document.querySelector('#score--1').textContent = '';

  totalEl.textContent = 0;
  totalEl.classList.add('hidden');
  hintEl.classList.remove('hidden');
  document.querySelector(`.btn--commit`).classList.remove('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  document
    .querySelector('.winner-image').classList.add('hidden');
  document
    .querySelector('.winner-player0').classList.add('hidden');
  document
    .querySelector('.winner-player1').classList.add('hidden');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  // document.querySelector('#').classList.add('hidden');
  document.getElementById("remove-0").classList.remove('hidden');
  document.getElementById("remove-1").classList.add('hidden');

  //Choose Events
  for (let i = 0; i < 2; i++) {
    for (let j = 1; j <= 10; j++) {
      document.getElementById(`current-p${i}-${j}`).addEventListener('click', function () {
        hintEl.classList.add('hidden');
        scores[i] = Number(totalEl.textContent) + j > 100 ? 100 : Number(totalEl.textContent) + j;
        document.querySelector(`#score--${i}`).textContent = scores[i];

      });
    }
  }
};
init();

const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  // document.querySelector('#').classList.add('hidden');
  document.getElementById(`remove-${activePlayer}`).classList.remove('hidden');
  document.getElementById(`remove-${Number(!activePlayer)}`).classList.add('hidden');
};




// Commit Score functionality
btnCommit.addEventListener('click', function () {
  if (playing) {
    // 1. Choose event
    // 2. Display score
    totalEl.classList.remove('hidden');
    hintEl.classList.add('hidden');

    totalEl.textContent = `${scores[activePlayer]}`;
    scores[Number(!activePlayer)] = scores[activePlayer]
    document.querySelector('#score--0').textContent = '';
    document.querySelector('#score--1').textContent = '';
    // check of Winner or switch Player
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      totalEl.classList.add('hidden');
      document.getElementById(`remove-${activePlayer}`).classList.add('hidden');
      document.querySelector(`.btn--commit`).classList.add('hidden');

      document.getElementById('name--0').classList.add('hidden');
      document.getElementById('name--1').classList.add('hidden');


      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector('.winner-image').classList.remove('hidden');
      document
        .querySelector(`.winner-player${activePlayer}`).classList.remove('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});


btnNew.addEventListener('click', init);
