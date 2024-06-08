var input;
var firstNumber = null;
var secondNumber = null;
var operator = null;
var decimal = false;
var decimalPlace = 6;
var buttons = document.querySelectorAll("button");
buttons.forEach(function (button) {
    var text = button.textContent;
    if (text !== '=' && text !== 'backSpace' && text !== 'clear') {
        button.addEventListener("click", function (e) {
            getInput(e);
            setInput(input);
        });
    }
    if (text === '=') {
        button.addEventListener("click", function () {
            if (canOperate(firstNumber, operator, secondNumber)) {
                operate(firstNumber, operator, secondNumber);
            }
        });
    }
});
function getInput(event) {
    input = event.target.textContent;
}
function isInputNumber(input) {
    // String with no numbers will turn into a Nan. If its a NaN, it aint a valid number so return false
    return !Number.isNaN(Number(input));
}
function changeToNumber(input) {
    return +input;
}
function setInput(input) {
    if (isFirstNumberEmpty(input)) {
        setFirstNumber(input);
        displayValue(firstNumber);
    }
    else if (isFirstNumberGetBigger(input, operator, firstNumber)) {
        setFirstNumber(input);
        displayValue(firstNumber);
    }
    else if (isFirstOperator(firstNumber, operator, input)) {
        setOperator(input);
        displayValue(firstNumber, operator);
    }
    else if (isSecondNumberEmpty(input)) {
        setSecondNumber(input);
        displayValue(firstNumber, operator, secondNumber);
    }
    else if (isSecondNumberGetBigger(input, secondNumber)) {
        setSecondNumber(input);
        displayValue(firstNumber, operator, secondNumber);
    }
}
function isFirstNumberEmpty(input) {
    if (firstNumber === null && !operator && isInputNumber(input))
        return true;
    else
        return false;
}
function isFirstNumberGetBigger(iput, operator, firstNumber) {
    if (firstNumber !== null && !operator && isInputNumber(input) && !isFirstNumberZero(firstNumber))
        return true;
    return false;
}
function setFirstNumber(input) {
    if (typeof input === 'number') {
        firstNumber = input;
    }
    else if (firstNumber === null) {
        firstNumber = +input;
    }
    else if (firstNumber) {
        firstNumber = +(firstNumber + input);
    }
}
function isSecondNumberEmpty(input) {
    if (secondNumber === null && operator && isInputNumber(input))
        return true;
    else
        return false;
}
function isSecondNumberGetBigger(input, secondNumber) {
    if (secondNumber !== null && isInputNumber(input) && !isSecondNumberZero(secondNumber))
        return true;
    return false;
}
function setSecondNumber(input) {
    if (input === null) {
        secondNumber = null;
    }
    else if (secondNumber === null) {
        secondNumber = +input;
    }
    else if (secondNumber) {
        secondNumber = +(secondNumber + input);
    }
}
function setOperator(input) {
    operator = input;
}
function isInputOperator(input) {
    // Check if the input is a =, +, *, or /
    return Number.isNaN(Number(input));
}
function isFirstOperator(firstNumber, operator, input) {
    if (firstNumber !== null && !operator && isInputOperator(input))
        return true;
    else
        return false;
}
function displayValue(firstNumber, operator, secondNumber, decimal) {
    if (firstNumber === void 0) { firstNumber = null; }
    if (operator === void 0) { operator = null; }
    if (secondNumber === void 0) { secondNumber = null; }
    if (decimal === void 0) { decimal = false; }
    var display = document.querySelector('.display');
    display.textContent = "".concat(firstNumber !== null ? firstNumber : "").concat(operator ? " " + operator + " " : "").concat(secondNumber !== null ? secondNumber : "");
}
function reset() { }
function removeLastInput() { }
function isFirstNumberZero(firstNumber) {
    return firstNumber === 0;
}
function isSecondNumberZero(secondNumber) {
    return secondNumber === 0;
}
function getFirstNumber() {
    return firstNumber;
}
function add(firstNumber, secondNumber) {
    var result = firstNumber + secondNumber;
    return Number(result.toFixed(decimalPlace));
}
function subtract(firstNumber, secondNumber) {
    var result = firstNumber - secondNumber;
    return Number(result.toFixed(decimalPlace));
}
function multiply(firstNumber, secondNumber) {
    var result = firstNumber * secondNumber;
    return Number(result.toFixed(decimalPlace));
}
function divide(firstNumber, secondNumber) {
    var result = firstNumber / secondNumber;
    return Number(result.toFixed(decimalPlace));
}
function canOperate(firstNumber, operator, secondNumber) {
    return firstNumber !== null && operator !== null && secondNumber !== null;
}
function operate(firstNumber, operator, secondNumber) {
    if (operator === "+") {
        var result = add(firstNumber, secondNumber);
        setFirstNumber(result);
    }
    else if (operator === "-") {
        var result = subtract(firstNumber, secondNumber);
        setFirstNumber(result);
    }
    else if (operator === "x") {
        var result = multiply(firstNumber, secondNumber);
        setFirstNumber(result);
    }
    else if (operator === "/") {
        var result = divide(firstNumber, secondNumber);
        setFirstNumber(result);
    }
    displayValue(getFirstNumber());
    setSecondNumber(null);
    setOperator(null);
}
