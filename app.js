let currentVal = "";
let previousVal = "";
let operator = "";

const mainDisplay = document.querySelector("#main-display");
const secondaryDisplay = document.querySelector("#secondary-display");
const numberButtons = document.querySelectorAll(".number");
const clear = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const operators = document.querySelectorAll(".operator");
const decimal = document.querySelector(".decimal");
const equals = document.querySelector("#equals");

window.addEventListener("keydown", handleKeyPress);

equals.addEventListener("click", () => {
  if (currentVal != "" && previousVal != "") {
    operate();
  }
});

decimal.addEventListener("click", () => {
  addDecimal();
});

clear.addEventListener("click", clearCalc);

deleteBtn.addEventListener("click", handleDelete);

numberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  });
});

operators.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
  });
});

function handleNumber(number) {
  if (previousVal !== "" && currentVal !== "" && operator === "") {
    previousVal = "";
    mainDisplay.textContent = currentVal;
  }
  if (currentVal.length <= 10) {
    currentVal += number;
    mainDisplay.textContent = currentVal;
  }
}

function handleOperator(op) {
  if (previousVal === "") {
    previousVal = currentVal;
    operatorCheck(op);
  } else if (currentVal === "") {
    operatorCheck(op);
  } else {
    operate();
    operator = op;
    mainDisplay.textContent = previousVal;
    secondaryDisplay.textContent = previousVal + " " + operator;
  }
}

function operatorCheck(text) {
  operator = text;
  secondaryDisplay.textContent = previousVal + " " + operator;
  mainDisplay.textContent = "";
  currentVal = "";
}

function operate() {
  previousVal = Number(previousVal);
  currentVal = Number(currentVal);

  if (operator === "+") {
    previousVal += currentVal;
  } else if (operator === "-") {
    previousVal -= currentVal;
  } else if (operator === "x") {
    previousVal *= currentVal;
  } else if (operator === "/") {
    if (currentVal <= 0) {
      previousVal = "Cannot divide by 0!";
      displayResults();
      return;
    }
    previousVal /= currentVal;
  }
  previousVal = roundNumber(previousVal);
  previousVal = previousVal.toString();
  displayResults();
}

function roundNumber(num) {
  return Math.round(num * 100000) / 100000;
}

function displayResults() {
  if (previousVal.length <= 10) {
    mainDisplay.textContent = previousVal;
  } else {
    mainDisplay.textContent = previousVal.slice(0, 10) + "...";
  }
  secondaryDisplay.textContent = "";
  operator = "";
  currentVal = "";
}

function clearCalc() {
  currentVal = "";
  previousVal = "";
  operator = "";
  mainDisplay.textContent = "0";
  secondaryDisplay.textContent = "";
}

function addDecimal() {
  if (!currentVal.includes(".")) {
    currentVal += ".";
    mainDisplay.textContent = currentVal;
  }
}

function handleKeyPress(e) {
  e.preventDefault();
  if (e.key >= 0 && e.key <= 9) {
    handleNumber(e.key);
  }
  if (
    e.key === "Enter" ||
    (e.key === "=" && currentVal != "" && previousVal != "")
  ) {
    operate();
  }
  if (e.key === "+" || e.key === "-" || e.key === "/") {
    handleOperator(e.key);
  }
  if (e.key === "*") {
    handleOperator("x");
  }
  if (e.key === ".") {
    addDecimal();
  }
  if (e.key === "Backspace") {
    handleDelete();
  }
}

function handleDelete() {
  if (currentVal !== "") {
    currentVal = currentVal.slice(0, -1);
    mainDisplay.textContent = currentVal;
    if (currentVal === "") {
      mainDisplay.textContent = "0";
    }
  }
  if (currentVal === "" && previousVal !== "" && operator === "") {
    previousVal = previousVal.slice(0, -1);
    mainDisplay.textContent = previousVal;
  }
}
