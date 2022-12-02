// as of dec 2 10:48am

// imports the wordList array from words.js, which has all the words to choose from
import { wordList } from "./words.js";

// all words must be 5 letters long
const wordLength = 5;
const guess = 0;

let pracWord = document.getElementById("1").value;
console.log(pracWord);


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
    let isValid = true;
    let isCorrect = true;
    if (userWord.length !== 5){
        isValid = false;
        console.log("Not 5 letters");
    } else if (wordList.includes(userWord) === false){
        isValid = false;
        console.log("Not in word list");
    // } else {
    //     for (let i=0; i<wordLength; i++){
    //         if (userWord[i] !== answer[i]){
    //             isCorrect = false;
    //             // return isCorrect;
    //         } 
    //     }    
    }
    return isValid;
}

// Check if each letter is in the answer word and in the right spot
function checkEachLetter(userWord, answer){
    let checkFullWord = false;
    if (checkWord(userWord, answer) === false){
        console.log("Not valid guess.");
        return;
    } else {
        console.log(`${userWord} & ${answerWord}`);
        checkFullWord = true;
        for (let i=0; i<wordLength; i++){
            if (answer.includes(userWord[i]) === true){
                console.log(`the word has ${userWord[i]}`);
                if (userWord[i] === answer[i]){
                    console.log(`${userWord[i]} is in the right spot`);
                } else {
                    console.log(`${userWord[i]} is in wrong spot though`)
                    checkFullWord = false;
                }
            } else {
                console.log(`${userWord[i]} not here`);
                checkFullWord = false;
            }        
        }
        if (checkFullWord === true){
            console.log("Correct!!")
            return checkFullWord;
        }
    }    
}


let inputWord = "homie";
checkEachLetter(inputWord, answerWord);

/////// FROM W3SCHOOL WEBSITE ///////
// // Get the modal
// var modal = document.getElementById("myModal");
// // Get the button that opens the modal
// var btn = document.getElementById("rules");
// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on the button, open the modal
// btn.onclick = function() {
//     modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }