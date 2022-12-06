// imports the wordList array from words.js, which has all the words to choose from
import { wordList , keyboardKeys} from "./words.js";

// initializing all variables i will be using for rest of code
const wordLength = 5; // length of all valid words
let totalGuesses = 6; // how many tries user has
let thisAttempt = 0; // keeps track of current guess
let thisLetterPos = 0; // keeps track of letter position
let thisWord=[]; // empty array to push contents in later
let stringWord=""; // empty string that joins array contents
let keys = keyboardKeys; // array of all letters

// makes the game board where user will input 6 words max
function makeGame(){
    const board = document.querySelector('#game');
    board.innerHTML = "";
    for (let i=0; i < totalGuesses; i++){
        // each row is for each guess
        let row = document.createElement("div");
        row.className = "row";
        row.id = i;
        board.appendChild(row);
        row.addEventListener("input", nextLetter);
        for (let j=0; j < wordLength; j++){
            // each column is for each letter of the guess
            let col = document.createElement("input");
            col.className = "col";
            col.type="text";
            col.maxLength=1;
            col.id = `${i}-${j}`;
            row.appendChild(col);
        }
    }
    // makes sure user starts at very first input box
    let firstSpot = document.getElementById("0-0");
    firstSpot.focus();
}
// spawn game on load
makeGame();

// automatically puts cursor at next letter spot in same word so user can easily type word in 
function nextLetter(e) {
    let input = e.target;
    if ((input.nextElementSibling && input.value)) {
        input.nextElementSibling.focus();
    }
    // moves the letter position as user inputs/deletes letters -- makes sure it never falls below 0
    if (thisLetterPos < 5){
        if (thisLetterPos < 0){
            thisLetterPos = 0;
        }
        thisLetterPos++;
    }   
}

// returns the word the user enters 
function submitWord(){
    let testWord="";
    // thisLetterPos = 0;
    for (let i=0; i<wordLength; i++){
        testWord = document.getElementById(`${thisAttempt}-${i}`).value;
        // pushes the word into an array
        thisWord.push(testWord);
        let dontClick = document.getElementById(`${thisAttempt}-${i}`)
        if (!dontClick){
            dontClick.pointerEvents="none";
        }
    }

    // makes sure array is empty from prior word entered and only looks at new word entered
    if (thisWord.length > 5){
        thisWord.splice(0, 5);
    }
    // joins contents of array into a string aka 1 word
    stringWord = thisWord.join('');
    return stringWord;
}
let submittedWord=[];

// makes sure user cannot tab into another input box
document.addEventListener("keydown", (e) => {
    if (e.key === "Tab"){
    e.preventDefault();
    }
})

// let thisLetId = document.activeElement; && (thisLetId.id$=`-4`)

// when user inputs key and lets go
document.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        // if user tries to enter a word less than 5 letters
        if (thisLetterPos < 5 ) {
            alert("Not a 5 letter word");
            return;
        }
        // if user enters a 5 letter word
        if (thisLetterPos === 5 && (thisAttempt < (totalGuesses))){
            submittedWord = submitWord();
            // check if inputted word is actually in wordlist
            if (wordList.includes(submittedWord) === false){
                alert("Not a real word. Try Again.");
                return;
            } else {
                // makes sure user can't type over previous word
                for (let i=0; i<5; i++){
                    document.getElementById(`${thisAttempt}-${i}`).readOnly = true;
                }
                thisAttempt++;
                compareWord(submittedWord);
            }
        } // if user can guess more, pushes focus to next work
            if (thisAttempt < 6){
                let nextGuess = document.getElementById(`${thisAttempt}-0`);
                nextGuess.focus();
            } // if user doesn't guess on last try, lose and reset game
            if (thisAttempt === 6){
                if (submittedWord !== answerWord){
                    alert("You lost, sorry! Word was: " + answerWord);
                    if (confirm("Press 'Ok' to try again."))
                        location.reload();
                    else
                        return;
                }
            }    
    }
})
    // all possible IDs last letter of word can be
    let endLetters = ["0-4","1-4","2-4","3-4","4-4","5-4"];
    // registers events as soon as backspace is entered
    document.addEventListener("keydown", (e) => {
    if (e.key === "Backspace"){
        let delKey = e.target;
        let isEndLetter = endLetters.includes(delKey.id);
        if (delKey.previousElementSibling){
            // makes sure focus stays in current box if last and not empty
            if (isEndLetter === true && (delKey.value !== "") ) {
                delKey.focus();
            } else {
                delKey.previousElementSibling.value="";
                delKey.previousElementSibling.focus();
            }    
        }
        // changes letter position as user deletes
        if (thisLetterPos > 0){
            thisLetterPos--;
            deleteLetter();
        }
    } 
})

// deletes unused letters from array if > 5 --- sometimes triggered
function deleteLetter(){
    let delLetter = document.getElementById(`${thisAttempt}-${thisLetterPos}`);
    if (thisWord.length > 5){
        thisWord.pop(delLetter);
    }
}

// chooses a random word from word list array
function pickWord(){
    let randIndex = Math.floor(Math.random() * (wordList.length));
    let randWord = wordList[randIndex];
    return randWord;
}
let answerWord = pickWord();
console.log("Answer: " + answerWord);

// checks if input is a valid word -> 5 letters and in word list
function checkValidity (submittedWord){
    let isValid = true;
    if (submittedWord.length !== 5){
        isValid = false;
    } else if (wordList.includes(submittedWord) === false){
        isValid = false;
    } 
    return isValid;
}

// checks if user guessed the word
function checkIfGuessed (word){
    let isGuessed = false;
    if (word === answerWord){
        isGuessed = true;
    }
    return isGuessed;
}

// function that fully checks word if valid input
// changes colors of letters in inputted word
// also changes colors of letters in keyboard
function checkWord (word){
    if (checkValidity(word) === false){
        return;
    } else if (checkIfGuessed(word) === false){
        for (let i=0; i<wordLength; i++){
            if (answerWord.includes(word[i]) === true){
                if (word[i] === answerWord[i]){
                    let rightSpot = document.getElementById(`${thisAttempt-1}-${i}`);
                    rightSpot.style.backgroundColor = "#549e74";
                    let right = rightSpot.value;
                    let rightLetter = document.getElementById(`${right}`);
                    rightLetter.style.backgroundColor = "#549e74";

                } else {
                    let wrongSpot = document.getElementById(`${thisAttempt-1}-${i}`);
                    wrongSpot.style.backgroundColor = "#f2eb96";
                    let wrong = wrongSpot.value;
                    let wrongLetter = document.getElementById(`${wrong}`);
                    wrongLetter.style.backgroundColor = "#f2eb96";
                }
            }
            else{
                let notLetter = document.getElementById(`${thisAttempt-1}-${i}`);
                notLetter.style.backgroundColor = "#8b8c8f";         
                let not = notLetter.value;
                let notThisLetter = document.getElementById(`${not}`);
                notThisLetter.style.backgroundColor = "#8b8c8f";
            }
        }
    }    
}

// checks if user guessed words and changes color of letters
let solved;
function compareWord(word){
    if (checkIfGuessed(submittedWord) === true){
        for (let i=0; i<wordLength; i++){
            solved = document.getElementById(`${thisAttempt-1}-${i}`);
            solved.style.backgroundColor = "#549e74";
        } // reloads page for new word
        if (confirm("Answered! Click 'Ok' to guess a new word"))
            location.reload();
        else
            for (let i=0; i<6; i++){
                for (let j=0; j<5; j++){
                    document.getElementById(`${i}-${j}`).readOnly = true;
                }
            }
            return;
    } 
    else if (checkValidity(submittedWord) === true){
        checkWord(submittedWord);
    }
}


///// FROM W3SCHOOL WEBSITE ///////
// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("rules");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}