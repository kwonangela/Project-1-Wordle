// imports the wordList array from words.js, which has all the words to choose from
import { wordList } from "./words.js";

// Picks the random word from text file
function pickWord(){
    let randIndex = Math.floor(Math.random() * (wordList.length));
    let randWord = wordList[randIndex];
    return randWord;
}
let answerWord = pickWord();
console.log("Answer: " + answerWord);

// Check if user's word matches the answer word
function checkWord(userWord, answer){
    let isCorrect = true;
    for (let i=0; i<userWord.length; i++){
        if (userWord[i] !== answer[i]){
            isCorrect = false;
            return isCorrect;
        }
    }
    return isCorrect;
}

// Check if each letter is in the answer word and in the right spot
function checkEachLetter(userWord, answer){
    console.log(`${userWord} & ${answerWord}`);
    for (let i=0; i<userWord.length; i++){
        if (answer.includes(userWord[i]) === true){
            console.log(`the word has ${userWord[i]}`);
            if (userWord[i] === answer[i]){
                console.log(`${userWord[i]} is in the right spot`);
            } else {
                console.log(`${userWord[i]} is in wrong spot though`)
            }
        } else {
            console.log(`${userWord[i]} not here`);
        }        
    }
}


let inputWord = "hello";
checkEachLetter(inputWord, answerWord);

// /////////////////////////////
// // Get the modal
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