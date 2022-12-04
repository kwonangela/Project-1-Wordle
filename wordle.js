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
    thisLetterPos++;
    console.log("nextletter This Letter Pos: " + thisLetterPos);
}

let enterButton = document.getElementById("enter");

// let submittedWord = submitWord();
// function submitWord(letter){
//     if (thisLetterPos < 5){
//         document.querySelector(`${thisAttempt}-${thisLetterPos}`).innerText = letter.target.innerText;
//         thisLetterPos++;
//         thisWord.push(letter.target.innerText);
//     }
//     return thisWord;
// }

function submitWord(){
    thisLetterPos = 0;
    for (let i=0; i<wordLength; i++){
        let testWordA = document.getElementById(`0-${i}`).value;
        thisWord.push(testWordA);
        thisLetterPos = i;
    }
    console.log(thisLetterPos + "apppp");
    const stringWord = thisWord.join('');
    return stringWord;
}

// console.log("grr" + submitWord());

function clearWordArray(){
    for (let i=0; i<wordLength; i++){
        thisWord.pop(i);
    }
    thisAttempt += 1;
    console.log("this attempt: " + thisAttempt);
    return thisWord;
}

document.addEventListener("keyup", (e) =>{
    if (e.key === "Enter"){
        if (thisLetterPos === 5 && (thisAttempt < totalGuesses)){
            console.log("fooop");
            console.log(submitWord());
            console.log(clearWordArray());
        }
    } else if (e.key === "Backspace"){
        let delKey = e.target;
        if (delKey.previousElementSibling){
            delKey.previousElementSibling.value="";
            delKey.previousElementSibling.focus();
        }
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
    console.log("sdsd " + submitWord() + "poops");

})

function pickWord(){
    let randIndex = Math.floor(Math.random() * (wordList.length));
    let randWord = wordList[randIndex];
    return randWord;
}
let answerWord = pickWord();
console.log("Answer: " + answerWord);

