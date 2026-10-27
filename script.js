// ---------- Math functions ----------
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return null;
    }
}

// ---------- Elements ----------
const display = document.querySelector("#display");
const expression = document.querySelector("#expression");
const dot = document.querySelector("#dot_btn");
const backspace = document.querySelector("#backspace_btn");
const clear = document.querySelector("#clr_btn");
const equal = document.querySelector("#equal");
const digitButtons = document.querySelectorAll("[data-digit]");
const operatorButtons = document.querySelectorAll("[data-operator]");

// ---------- State ----------
const MAX_DIGITS = 12;
const symbols = { "+": "+", "-": "-", "*": "×", "/": "÷" };

let firstNumber = null;        // first number of the operation
let operator = null;           // selected operator
let currentInput = "0";        // what the user is typing / what is shown
let shouldResetDisplay = false; // true after an operator, a result or an error

// ---------- Helpers ----------
function updateDisplay() {
    display.textContent = currentInput;
    dot.disabled = currentInput.includes(".") && !shouldResetDisplay;
}

function formatResult(value) {
    // round long decimals so they don't overflow the display
    let rounded = Math.round(value * 1e10) / 1e10;
    let text = String(rounded);

    if (text.length > MAX_DIGITS) {
        text = Number(rounded.toPrecision(10)).toString();
    }
    if (text.length > MAX_DIGITS) {
        text = rounded.toExponential(5);
    }
    return text;
}

function resetAll() {
    firstNumber = null;
    operator = null;
    currentInput = "0";
    shouldResetDisplay = false;
    expression.textContent = "";
    updateDisplay();
}

function showDivisionError() {
    firstNumber = null;
    operator = null;
    currentInput = "Nice try! 😏";
    shouldResetDisplay = true;
    expression.textContent = "";
    updateDisplay();
}

// Evaluates firstNumber operator currentInput. Returns the result as a number,
// or null when dividing by zero (the error is displayed).
function evaluate() {
    const secondNumber = parseFloat(currentInput);

    if (operator === "/" && secondNumber === 0) {
        showDivisionError();
        return null;
    }
    return operate(operator, firstNumber, secondNumber);
}

// ---------- Handlers ----------
function inputDigit(digit) {
    if (shouldResetDisplay) {
        currentInput = digit;
        shouldResetDisplay = false;
        // a result was displayed: start a new calculation
        if (operator === null) {
            firstNumber = null;
            expression.textContent = "";
        }
    } else if (currentInput === "0") {
        currentInput = digit;
    } else if (currentInput.replace(/[-.]/g, "").length < MAX_DIGITS) {
        currentInput += digit;
    }
    updateDisplay();
}

function inputDot() {
    if (shouldResetDisplay) {
        currentInput = "0.";
        shouldResetDisplay = false;
        if (operator === null) {
            firstNumber = null;
            expression.textContent = "";
        }
    } else if (!currentInput.includes(".")) {
        currentInput += ".";
    }
    updateDisplay();
}

function inputOperator(newOperator) {
    // pressing an operator right after an error does nothing
    if (currentInput === "Nice try! 😏") return;

    if (operator !== null && shouldResetDisplay) {
        // consecutive operators: only replace the operator, don't evaluate
        operator = newOperator;
        expression.textContent = `${formatResult(firstNumber)} ${symbols[operator]}`;
        return;
    }

    if (operator !== null) {
        // second number was entered: evaluate the pair first
        const result = evaluate();
        if (result === null) return;
        firstNumber = result;
        currentInput = formatResult(result);
    } else {
        firstNumber = parseFloat(currentInput);
    }

    operator = newOperator;
    shouldResetDisplay = true;
    expression.textContent = `${formatResult(firstNumber)} ${symbols[operator]}`;
    updateDisplay();
}

function inputEqual() {
    // need a first number, an operator and a second number
    if (operator === null || shouldResetDisplay) return;

    const secondText = currentInput;
    const result = evaluate();
    if (result === null) return;

    expression.textContent =
        `${formatResult(firstNumber)} ${symbols[operator]} ${secondText} =`;
    currentInput = formatResult(result);
    firstNumber = null;
    operator = null;
    shouldResetDisplay = true;
    updateDisplay();
}

function inputBackspace() {
    // don't edit a displayed result or error
    if (shouldResetDisplay) return;

    currentInput = currentInput.slice(0, -1);
    if (currentInput === "" || currentInput === "-") {
        currentInput = "0";
    }
    updateDisplay();
}

// ---------- Button events ----------
digitButtons.forEach((button) => {
    button.addEventListener("click", () => inputDigit(button.dataset.digit));
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => inputOperator(button.dataset.operator));
});

dot.addEventListener("click", inputDot);
equal.addEventListener("click", inputEqual);
backspace.addEventListener("click", inputBackspace);
clear.addEventListener("click", resetAll);

// ---------- Keyboard support ----------
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (key >= "0" && key <= "9") {
        inputDigit(key);
    } else if (key === ".") {
        inputDot();
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        event.preventDefault(); // "/" opens quick find in some browsers
        inputOperator(key);
    } else if (key === "x" || key === "X") {
        inputOperator("*");
    } else if (key === "=" || key === "Enter") {
        event.preventDefault();
        inputEqual();
    } else if (key === "Backspace") {
        inputBackspace();
    } else if (key === "Escape" || key === "Delete" || key === "c" || key === "C") {
        resetAll();
    }
});

// initial state
updateDisplay();