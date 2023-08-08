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

