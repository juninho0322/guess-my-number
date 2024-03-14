'use strict';

// .textContent to text divs
// document.querySelector('.message').textContent = 'Correct Number!';
// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 99;

// .value to input fields
// document.querySelector('.guess').value = 98;

let player = prompt('Player name:.');
document.querySelector('.player').textContent = player;

// gets a random number from 0 to 20
let secretNumber = Math.floor(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
let bestPlayer;
let worstScore = 20;
let isFirstTurn = true;

console.log(secretNumber);

function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

// when user click on butten reset
function reset() {
  secretNumber = Math.floor(Math.random() * 20) + 1;
  document.querySelector('.number').textContent = '?';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').style.fontSize = '6rem';
  document.querySelector('.guess').value = '';
  displayMessage('Start guessing...');
  score = 20;
  document.querySelector('.score').textContent = score;
  player = prompt('Player name:.');
  document.querySelector('.player').textContent = player;
  console.log(secretNumber);
}

// null the keyboard letters check .which documentation
document.querySelector('.guess').addEventListener('keypress', function (event) {
  if (event.which < 48 || event.which > 57) {
    event.preventDefault();
  }
});

// addEventListener has two argument here, first 'click' second is a function
document.querySelector('.check').addEventListener('click', function () {
  // number convert to number value
  const guess = Number(document.querySelector('.guess').value);

  // when a non number is insert
  if (!guess) {
    displayMessage('PLEASE TYPE A VALID NUMBER');
    return;
    //early return - if with return = same as  return = null;
  }

  // when the player wins style changed
  if (guess === secretNumber) {
    displayMessage(`You guessed - ${player}`);
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').style.fontSize = '10rem';

    // if is not the first turn do it
    if (!isFirstTurn) {
      // highscore become worst score here
      if (score > highScore && score <= worstScore) {
        worstScore = highScore;
        document.querySelector('.worst').textContent =
          bestPlayer + ` - ` + worstScore;

        console.log('if 1 ');
      }

      // score is the worst here - highscore keep being the highest
      // second turn if the score is the same that the higscore need to change to the new player name and keep the worst blank, it was populate the worst score when the highscore and score were the same in the second turn
      // it has been fixed adding && score < highscore here
      if (score < worstScore && score < highScore) {
        worstScore = score;
        document.querySelector('.worst').textContent =
          player + ` - ` + worstScore;
        console.log('if 2 ');
      }
    }

    // first turn - first highscore
    // name of the player has been fixed using the bestPlayer variable here.
    if (score >= highScore) {
      highScore = score;
      bestPlayer = player;
      document.querySelector('.highscore').textContent =
        bestPlayer + ` - ` + highScore;
      console.log('if 3 ');
    }

    // set the variable to false to indicate that is not the first turn
    if (isFirstTurn === true) {
      isFirstTurn = false;
    }

    // when the player is between best and worst score
    // this has been added too
    if (score < highScore && score > worstScore) {
      displayMessage(`Not BAD but Not BETTER - ${player}`);
      console.log('if 4 ');
    }
  }

  // when the number is wrong
  if (guess !== secretNumber) {
    displayMessage(guess > secretNumber ? 'Too High' : 'Too Low');

    score--;

    document.querySelector('.score').textContent = score;
  }

  // whent score getting to 0 low
  if (score < 1) {
    document.querySelector('.message').textContent = 'You lost the game';
    document.querySelector('.score').textContent = 0;
    document.querySelector('.check').textContent = 'Click Again!';
  }
});

// again function
document.querySelector('.again').addEventListener('click', function () {
  reset();
});
