const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const outputText = document.getElementById("output");

let inputNumber = numberInput.value;

const basicNumbers = [
  {
    roman: "M",
    arabic: 1000
  },
  {
    roman: "CM",
    arabic: 900
  },
  {
    roman: "D",
    arabic: 500
  },
  {
    roman: "CD",
    arabic: 400
  },
  {
    roman: "C",
    arabic: 100
  },
  {
    roman: "XC",
    arabic: 90
  },
  {
    roman: "L",
    arabic: 50
  },
  {
    roman: "XL",
    arabic: 40
  },
  {
    roman: "X",
    arabic: 10
  },
  {
    roman: "IX",
    arabic: 9
  },
  {
    roman: "V",
    arabic: 5
  },
  {
    roman: "IV",
    arabic: 4
  },
  {
    roman: "I",
    arabic: 1
  }
];

const setOutputText = (text) => {
  outputText.textContent = text;
  outputText.classList.remove("hidden");
  numberInput.value = "";
}

const romanNumeralConverter = () => {
  if (!numberInput.value) {
    setOutputText("Please enter a valid number");
    return;
  } else if (numberInput.value < 0) {
    setOutputText("Please enter a number greater than or equal to 1");
    return;
  } else if (numberInput.value >= 4000){
    setOutputText("Please enter a number less than or equal to 3999");
    return;
  }

  let inputNumber = numberInput.value;
  let returnString = "";

  for (const basicNumber of basicNumbers) {

    while (inputNumber >= basicNumber["arabic"]){
      console.log(inputNumber, basicNumber["arabic"]);
      inputNumber -= basicNumber["arabic"];
      returnString += basicNumber["roman"];
    }

    if (inputNumber === 0) {
      outputText.textContent = returnString;
      outputText.classList.remove("hidden");
      return;
    }
  }
}

convertBtn.addEventListener("click",romanNumeralConverter);
