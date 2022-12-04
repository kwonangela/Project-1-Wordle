// imports the wordList array from words.js, which has all the words to choose from
import { wordList } from "./words.js";

const wordLength = 5;
let totalGuesses = 6; 
let thisAttempt = 0;
let thisLetterPos = 0;
let thisWord=[];
let stringWord=""

function makeGame(){
    const board = document.querySelector('#game');
    board.innerHTML = "";
    for (let i=0; i < totalGuesses; i++){
        let row = document.createElement("div");
        row.className = "row";
        row.id = i;
        board.appendChild(row);
        row.addEventListener("input", nextLetter);
        for (let j=0; j < wordLength; j++){
            let col = document.createElement("input");
            col.className = "col";
            col.maxLength=1;
            col.id = `${i}-${j}`;
            row.appendChild(col);
        }
    }
}
makeGame();

function nextLetter(e) {
    let input = e.target;
    if ((input.nextElementSibling && input.value)) {
        input.nextElementSibling.focus();
    }
    if (thisLetterPos !== 4)
        thisLetterPos++;
    console.log("nextletter This Letter Pos: " + thisLetterPos);
}

let enterButton = document.getElementById("enter");

function submitWord(){
    thisLetterPos = 0;
    for (let i=0; i<wordLength; i++){
        let testWordA = document.getElementById(`0-${i}`).value;
        thisWord.push(testWordA);
        thisLetterPos = i;
    }
    stringWord = thisWord.join('');
    return stringWord;
}
let submittedWord="";

// function clearWordArray(){
//     for (let i=0; i<wordLength; i++){
//         thisWord.pop(i);
//     }
//     console.log("THIS WORD: " + thisWord);
//     thisAttempt += 1;
//     console.log("this attempt: " + thisAttempt);
//     return thisWord;
// }

function clearWordArray(){
    thisWord = "";
    return thisWord;
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Tab"){
    e.preventDefault();
    }
})

document.addEventListener("keyup", (e) => {
    if (e.key === "Enter"){
        if (thisLetterPos <= 4 && (thisAttempt < totalGuesses)){
            // console.log("foop" + submitWord());
            submittedWord = submitWord();
            console.log("foop" + submittedWord);
            // console.log("gub" + compareWord(submitWord()));
            compareWord(submittedWord);
            // console.log(clearWordArray());
        }
    } else if (e.key === "Backspace"){
        let delKey = e.target;
        if (delKey.previousElementSibling){
            delKey.previousElementSibling.value="";
            delKey.previousElementSibling.focus();
        }
        if (thisLetterPos > 0)
            deleteLetter();
    }
})

function deleteLetter(){
    let delLetter = document.getElementById(`${thisAttempt}-${thisLetterPos}`);
    thisWord.pop(delLetter);
     thisLetterPos--;
    console.log("this letter pos: " + thisLetterPos);
}

enterButton.addEventListener("click", function () {
    // console.log("sdsd " + submitWord() + "poops");
    console.log("sdsd " + submittedWord + "poops");

})

function pickWord(){
    let randIndex = Math.floor(Math.random() * (wordList.length));
    let randWord = wordList[randIndex];
    return randWord;
}
let answerWord = pickWord();
console.log("Answer: " + answerWord);

// function checkValidity (word){
//     let isValid = true;
//     if (word.length !== 5){
//         isValid = false;
//         console.log("lenght: " + word.length);
//         console.log("Not 5" + word);
//     } else if (wordList.includes(word) === false){
//         console.log("Not valid" + word);
//         isValid = false;
//     } 
//     return isValid;
// }

// function checkValidity (){
//     let isValid = true;
//     if (submitWord().length !== 5){
//         isValid = false;
//         console.log("lenght: " + submitWord().length);
//         console.log("Not 5" + submitWord());
//     } else if (wordList.includes(submitWord()) === false){
//         console.log("Not valid" + submitWord());
//         isValid = false;
//     } 
//     return isValid;
// }
function checkValidity (){
    let isValid = true;
    if (submittedWord.length !== 5){
        isValid = false;
        console.log("lengthh: " + submittedWord.length);
        console.log("Not 5" + submittedWord);
    } else if (wordList.includes(submittedWord) === false){
        console.log("Not valid" + submittedWord);
        isValid = false;
    } 
    return isValid;
}

function checkIfGuessed (word){
    let isGuessed = false;
    if (word === answerWord){
        isGuessed = true;
    }
    return isGuessed;
}

function checkWord (word){
    if (checkValidity(word) === false){
        console.log("checkValidity is false");
        return;
    } else if (checkIfGuessed(word) === false){
        console.log(`Your word: ${word}. Answer: ${answerWord}`);
        for (let i=0; i<wordLength; i++){
            if (answerWord.includes(word[i]) === true){
                if (word[i] === answerWord[i]){
                    console.log(`${word[i]} is in the right spot`);
                    let rightSpot = document.getElementById(`${thisAttempt}-${i}`);
                    rightSpot.style.backgroundColor = "green";
                } else {
                    console.log(`${word[i]} is in wrong spot`)
                    let wrongSpot = document.getElementById(`${thisAttempt}-${i}`);
                    wrongSpot.style.backgroundColor = "yellow";
                }
            }
            else{
                console.log(`${word[i]} not here`);
                let wrongLetter = document.getElementById(`${thisAttempt}-${i}`);
                wrongLetter.style.backgroundColor = "gray";            
            }
        }
    } else {
        console.log("u got the answer");
    }
}

function compareWord(word){
    // if (checkIfGuessed(submitWord()) === true){
    if (checkIfGuessed(submittedWord) === true){
        console.log("Answered!")
    }
    // else if (checkValidity(submitWord()) === true){
        else if (checkValidity(submittedWord) === true){
        console.log("huhuh")
        // checkWord(submitWord());
        checkWord(submittedWord);
    }
}

