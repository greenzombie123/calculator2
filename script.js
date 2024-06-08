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
        console.log(123);
    }
}
function isFirstNumberEmpty(input) {
    return !firstNumber && !operator && isInputNumber(input);
}
function isFirstNumberGetBigger(iput) {
    return firstNumber && !operator && isInputNumber(input);
}
function setFirstNumber(input) {
    if (firstNumber === null) {
        firstNumber = +input;
    }
}
function setSecondNumber() { }
function isOperatorSet() { }
function displayValue(firstNumber, operator, secondNumber, decimal) {
    if (firstNumber === void 0) { firstNumber = null; }
    if (operator === void 0) { operator = null; }
    if (secondNumber === void 0) { secondNumber = null; }
    if (decimal === void 0) { decimal = false; }
    var display = document.querySelector('.display');
    display.textContent = "".concat(firstNumber);
}
function reset() { }
function removeLastInput() { }
