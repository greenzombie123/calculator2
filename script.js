var input;
var firstNumber = null;
var secondNumber = null;
var operator = null;
var decimal = false;
var buttons = document.querySelectorAll("button");
buttons.forEach(function (button) {
    var text = button.textContent;
    if (text !== '=' && text !== 'backSpace' && text !== 'clear') {
        button.addEventListener("click", function (e) {
            getInput(e);
            setInput(input);
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
    else if (isFirstNumberGetBigger(input)) {
        setFirstNumber(input);
        displayValue(firstNumber);
    }
    else if (isFirstOperator(firstNumber, operator, input)) {
        setOperator(input);
        displayValue(firstNumber, operator);
    }
}
function isFirstNumberEmpty(input) {
    if (!firstNumber && !operator && isInputNumber(input))
        return true;
    else
        return false;
}
function isFirstNumberGetBigger(iput) {
    if (firstNumber && !operator && isInputNumber(input) && !isFirstNumberZero(firstNumber))
        return true;
    return false;
}
function setFirstNumber(input) {
    if (firstNumber === null) {
        firstNumber = +input;
    }
    else if (firstNumber) {
        firstNumber = +(firstNumber + input);
    }
}
function setSecondNumber() { }
function setOperator(input) {
    operator = input;
}
function isInputOperator(input) {
    // Check if the input is a =, +, *, or /
    return Number.isNaN(Number(input));
}
function isFirstOperator(firstNumber, operator, input) {
    if (firstNumber && !operator && isInputOperator(input))
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
    display.textContent = "".concat(firstNumber).concat(operator ? " " + operator + " " : "");
}
function reset() { }
function removeLastInput() { }
function isFirstNumberZero(firstNumber) {
    return firstNumber === 0;
}
