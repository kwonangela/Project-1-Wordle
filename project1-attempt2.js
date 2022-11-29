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

// Check if each letter is in the answer word and in the right spot
function checkEachLetter(userWord, answer){
    console.log(`${userWord} + ${answerWord}`);
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