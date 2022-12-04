// imports the wordList array from words.js, which has all the words to choose from
import { wordList } from "./words.js";

const wordLength = 5;
let totalGuesses = 6; 
let thisAttempt = 0;
let thisLetterPos = 0;
let thisWord=[];


function makeGame(){
    const board = document.querySelector('#game');
    board.innerHTML = "";
    for (let i=0; i < totalGuesses; i++){
        let row = document.createElement("div");
        row.className = "row";
        row.id = i;
        board.appendChild(row);
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


let enterButton = document.getElementById("enter");

function submitWord(){
    for (let i=0; i<wordLength; i++){
        let testWordA = document.getElementById(`0-${i}`).value;
        thisWord.push(testWordA);
    }
    const stringWord = thisWord.join('');
    return stringWord;
}


enterButton.addEventListener("click", function () {
    // submitWord();
    console.log("sdsd " + submitWord());
    console.log("poop" + checkWord(submitWord()));

})




// document.getElementById("0-0").innerHTML= "sdsdd";
// let pracWord = document.getElementById("0-0");
// pracWord.innerHTML="HELLO";
// console.log("hi" + pracWord);

// all words must be 5 letters long

function pickWord(){
    let randIndex = Math.floor(Math.random() * (wordList.length));
    let randWord = wordList[randIndex];
    return randWord;
}
let answerWord = pickWord();
console.log("Answer: " + answerWord);

function checkValidity (word){
    let isValid = true;
    if (word.length !== 5){
        isValid = false;
        console.log("Not 5" + word);
    } else if (wordList.includes(word) === false){
        console.log("Not valid" + word);
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
                } else {
                    console.log(`${word[i]} is in wrong spot`)
                }
            }
            else{
                console.log(`${word[i]} not here`);
            }
        }
    } else {
        console.log("u got the answer");
    }
}

// function compareWords(){
//     if (checkIfGuessed(thisWord) === true){
//         console.log("Answered!")
//     }
//     else if (checkValidity(thisWord) === true){
//         checkWord(thisWord);
//         console.log("burp");
//     }
// }


function compareWords(){
    if (checkIfGuessed(submitWord()) === true){
        console.log("Answered!")
    }
    else if (checkValidity(submitWord()) === true){
        console.log("huhuh")
        checkWord(submitWord());
    }
}

// checkValidity(pracWord);
// checkIfGuessed(pracWord);
// checkWord(pracWord);

// let inputWord = "house";
// checkValidity(inputWord);
// checkIfGuessed(inputWord);
// checkWord(inputWord);





// let wordButton = document.createElement("button");
// board.appendChild(wordButton);
// wordButton.className = "wordButton";
// wordButton.innerHTML = `Submit Word ${i}`;
// wordButton.id = `but${i}`;