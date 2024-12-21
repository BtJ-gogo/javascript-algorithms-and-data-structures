const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

const setOutputText = (text) => {
  resultsDiv.textContent = text;
  userInput.value = "";
}

const checkPhoneNumber = () => {
  if (!userInput.value) {
    alert("Please provide a phone number");
    return;
  }
  const regex = /^(1|1\s)?(\d{3}|\(\d{3}\))[-\s]?\d{3}[-\s]?\d{4}$/;
  if (regex.test(userInput.value)) {
    setOutputText(`Valid US number: ${userInput.value}`);
  } else {
    setOutputText(`Invalid US number: ${userInput.value}`);
  }
}

const clearResult = () => {
  resultsDiv.textContent = "";
}


checkBtn.addEventListener("click", checkPhoneNumber);
clearBtn.addEventListener("click", clearResult);
