// next few lines of code from google
// reads text file and puts each word into array
const fs = require("fs");
const text = fs.readFileSync("./samplewords.txt", "utf-8");
const wordArr = text.replace(/\s/g, ` `).split(" ");

// Picks the random word from text file
function pickWord(arr){
    let randIndex = Math.floor(Math.random() * (arr.length));
    let randWord = arr[randIndex];
    return randWord;
}
let answerWord = pickWord(wordArr);
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

// Check is user's word has right letter but in the wrong spot
function checkRightLetter(userWord, answer){
    console.log("Checking right letter");
    let rightLetter;
    for (let i=0; i<5; i++){
        for (let j=0; j<5; j++){
            if ((userWord[i] === answer[j]) && (i !== j)){
                rightLetter = true;
                console.log(` ${userWord[i]} ${rightLetter}`);
                //MARK SEMICORRECT HTML/CSS
           } else {
                rightLetter = false;
           }
        }

    }
    return rightLetter;
}

// Check if user's word has right letter in right spot
function checkRightSpot(userWord, answer){
    console.log("Checking right spot: ");
    let rightSpot;
    for (let i=0; i<userWord.length; i++){
        if (userWord[i] === answer[i]){
            rightSpot = true;
            console.log(`${userWord[i]} ${rightSpot}  ${answer[i]}`); //MARK CORRECT HTML/CSS
        } else {
            rightSpot = false;
            console.log(`${userWord[i]} ${rightSpot} ${answer[i]}`);
        }
    }
    return rightSpot;
}

function checkEachLetter(userWord, answer){
    if ((checkRightLetter(userWord, answer) === true) && (checkRightSpot(userWord, answer) === true)){
        console.log("Right letter and right spot!");
    } else if ((checkRightLetter(userWord, answer) === true) && (checkRightSpot(userWord, answer) === false)){
        console.log("Right letter but wrong spot");
    } else {
        console.log("You are wrong");
    }
}

let inputWord = "hello";
// console.log("Solved? " + checkWord(inputWord, answerWord));
// checkRightLetter(inputWord, answerWord);
// checkRightSpot(inputWord, answerWord);
// checkEachLetter(inputWord, answerWord);

let result = answerWord.includes(inputWord[0]);
console.log(result);






