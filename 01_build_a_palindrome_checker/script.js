const inputText = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const resultText = document.getElementById("result")

const cleanInputString = (str) => str.toLowerCase().replace(/[,.:\/\\()_-\s]/g,"");
const reverseInputString = (str) => str.split("").reverse().join("");

function checkPalindrome () {
  if (inputText.value) {
    const cleanedString = cleanInputString(inputText.value);
    const reversedString = reverseInputString(cleanedString);
    let resultString = inputText.value;
    //console.log(cleanedString, reversedString);
    if (cleanedString === reversedString) {
      //console.log(`${inputText.value} is a palindrome`);
      resultString += " is a palindrome.";
    } else {
      //console.log(`${inputText.value} is not a palindrome`);
      resultString += " is not a palindrome.";
    }
    resultText.style.display = "block";
    resultText.textContent = resultString;
  } else {
    alert("Please input a value");
  }
};

checkButton.addEventListener("click", checkPalindrome);
