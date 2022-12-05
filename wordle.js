// imports the wordList array from words.js, which has all the words to choose from
import { wordList } from "./words.js";

const wordLength = 5;
let totalGuesses = 6; 
let thisAttempt = 0;
let thisLetterPos = 0;
let thisWord=[];
let stringWord="";

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
    let testWord="";
    thisLetterPos = 0;
    for (let i=0; i<wordLength; i++){
        testWord = document.getElementById(`${thisAttempt}-${i}`).value;
        thisWord.push(testWord);
    }
    if (thisWord.length > 5){
        thisWord.splice(0, 5);
    }
    stringWord = thisWord.join('');
    return stringWord;
}
let submittedWord=[];

document.addEventListener("keydown", (e) => {
    if (e.key === "Tab"){
    e.preventDefault();
    }
})

document.addEventListener("keyup", (e) => {
    if (e.key === "Enter"){
        console.log("Submitted word: " + submittedWord);
        if (thisLetterPos < 5 && (thisAttempt < (totalGuesses-1))){
            submittedWord = submitWord();
            console.log("foop " + submittedWord);
            thisAttempt++;
            thisLetterPos = 0;
            compareWord(submittedWord);
        } 
        let nextGuess = document.getElementById(`${thisAttempt}-0`);
        nextGuess.focus();
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
    console.log("sdsd " + submittedWord + "poops");

})

function pickWord(){
    let randIndex = Math.floor(Math.random() * (wordList.length));
    let randWord = wordList[randIndex];
    return randWord;
}
let answerWord = pickWord();
console.log("Answer: " + answerWord);

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
                    let rightSpot = document.getElementById(`${thisAttempt-1}-${i}`);
                    rightSpot.style.backgroundColor = "green";
                } else {
                    console.log(`${word[i]} is in wrong spot`)
                    let wrongSpot = document.getElementById(`${thisAttempt-1}-${i}`);
                    wrongSpot.style.backgroundColor = "yellow";
                }
            }
            else{
                console.log(`${word[i]} not here`);
                let wrongLetter = document.getElementById(`${thisAttempt-1}-${i}`);
                wrongLetter.style.backgroundColor = "gray";            
            }
        }
    } else {
        console.log("u got the answer");
    }
}

function compareWord(word){
    if (checkIfGuessed(submittedWord) === true){
        for (let i=0; i<wordLength; i++){
            let solved = document.getElementById(`${thisAttempt-1}-${i}`);
            solved.style.backgroundColor = "green";
            console.log("Answered!")
        }
    }
    else if (checkValidity(submittedWord) === true){
        console.log("huhuh")
        checkWord(submittedWord);
    }
}

