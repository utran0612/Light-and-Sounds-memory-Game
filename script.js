// Global Constants
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1500; //how long to wait before starting playback of the clue sequence

//Global Variables
var pattern;
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5; //must be between 0.0 and 1.0
var guessCounter = 0;
var myTimeOut = 0;
var clueHoldTime = 1000; //how long to hold each clue's light/sound
var numMistake;

function startGame() {
  //initialize game variables
  pattern = getPattern();
  progress = 0;
  guessCounter = 0;
  gamePlaying = true;
  numMistake = 0;
  clueHoldTime = 1000;

  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");

  playClueSequence();
}

function stopGame() {
  gamePlaying = false;
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  stopTone();
  endCount();
}

// Sound Synthesis Functions that resemble 7 main musical notes
const freqMap = {
  1: 261.63,
  2: 293.665,
  3: 329.628,
  4: 349.228,
  5: 391.995,
  6: 440,
  7: 493,
};

function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  context.resume();
  tonePlaying = true;
  setTimeout(function () {
    stopTone();
  }, len);
}

function startTone(btn) {
  if (!tonePlaying) {
    context.resume();
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    context.resume();
    tonePlaying = true;
  }
}

function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}

function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

function displayImg(btn) {
  document.getElementById("button" + btn).classList.add("hidden");
  document.getElementById("img" + btn).classList.remove("hidden");
}

function hideImg(btn) {
  document.getElementById("button" + btn).classList.remove("hidden");
  document.getElementById("img" + btn).classList.add("hidden");
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

// Display timer
let timeSecond = 30;
const timeH = document.getElementById("timer");

function displayTime(second) {
  timeH.innerHTML = `00:${timeSecond < 10 ? "0" : ""}${timeSecond}`;
}

function endCount() {
  timeH.innerHTML = "00:30";
}

/*Determine whether the timer should be playing or not*/
let det = false;

function playClueSequence(det) {
  //Play the sequence
  clueHoldTime = clueHoldTime - 70; //play it faster every round
  context.resume();
  let delay = nextClueWaitTime; //set delay to initial wait time
  guessCounter = 0;
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
  //Start the timer every sequence
  timeSecond = 31;
  const countDown = setInterval(() => {
    timeSecond--;
    displayTime(timeSecond);
    if (timeSecond < 0) {
      clearInterval(countDown);
      loseGame();
      endCount();
    } else if (det) {
      clearInterval(countDown);
    } else if (!gamePlaying) {
      clearInterval(countDown);
      timeH.innerHTML = "00:30";
    }
  }, 1000);
}

//Alert when lose game
function loseGame() {
  stopGame();
  alert("Game Over. You lost :(");
}

//Alert when win game
function winGame() {
  stopGame();
  alert("Hurray! You won!");
}

//Count player's guesses
function guess(btn) {
  if (!gamePlaying) {
    return;
  }

  // add game logic here
  if (guessCounter < progress) {
    if (btn == pattern[guessCounter]) {
      guessCounter++;
    } else {
      // Increment mistake counts
      numMistake++;
      // Check if player crosses all 3 strikes, else show snackbar to notify them
      if (didLose(numMistake)) {
        loseGame();
      } else {
        notify(numMistake);
      }
    }
  } else if (guessCounter > progress) {
    numMistake++;
    if (didLose(numMistake)) {
      loseGame();
    } else {
      notify(numMistake);
    }
  } else if (guessCounter == progress) {
    if (btn == pattern[guessCounter]) {
      if (progress < pattern.length - 1) {
        progress++;
        det = true;
        playClueSequence(det);
      } else {
        guessCounter = 0;
        winGame();
      }
    } else {
      numMistake++;
      if (didLose(numMistake)) {
        loseGame();
      } else {
        notify(numMistake);
      }
    }
  } else {
    numMistake++;
    if (didLose(numMistake)) {
      loseGame();
    }
    notify(numMistake);
  }
}

//Get random pattern
function getPattern() {
  var p;
  pattern = [];

  let min = 1;
  let max = 7;

  for (let i = 0; i < 14; i++) {
    p = Math.floor(Math.random() * (max - min + 1)) + min;
    pattern.push(p);
  }
  return pattern;
}

// Count mistakes and return whether player has lost the game.
function didLose(num) {
  if (num > 2) {
    return true;
  } else {
    return false;
  }
}

// Show snackbar whenever player makes a wrong guess
function notify(numMistake) {
  // Get the snackbar DIV
  var bar1 = document.getElementById("snackbar1");
  var bar2 = document.getElementById("snackbar2");
  // If mistake count = 1, show snackbar 1
  if (numMistake == 1) {
    bar1.className = "show"; // Add the "show" class to DIV
    setTimeout(function () {
      bar1.className = bar1.className.replace("show", "");
    }, 1000); // After 1 second, remove the show class from DIV
    // If mistake count = 2, show snackbar 2
  } else if (numMistake == 2) {
    bar2.className = "show";
    setTimeout(function () {
      bar2.className = bar2.className.replace("show", "");
    }, 1000);
  }
}

