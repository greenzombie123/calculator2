var input;
var firstNumber = "";
var secondNumber = "";
var operator = null;
//let decimal: string = "";
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
    else if (isFirstDecimalForFirstDecimal(firstNumber, input, operator)) {
        setFirstNumber(input);
        displayValue(firstNumber, operator, secondNumber);
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
    else if (isFirstDecimalForSecondDecimal(secondNumber, input, operator)) {
        setSecondNumber(input);
        displayValue(firstNumber, operator, secondNumber);
    }
    else if (isSecondOperator(firstNumber, secondNumber, operator, input)) {
        operate(firstNumber, operator, secondNumber);
        setInput(input);
        displayValue(firstNumber, operator, secondNumber);
    }
}
function isFirstDecimalForFirstDecimal(firstNumber, input, operator) {
    return firstNumber !== "" && Number.isInteger(+firstNumber) && !firstNumber.includes(".") && input === "." && operator === null;
}
function isFirstDecimalForSecondDecimal(secondNumber, input, operator) {
    return secondNumber !== "" && input === "." && operator !== null && Number.isInteger(+secondNumber) && !secondNumber.includes(".");
}
function isFirstNumberDecimalNumber(firstNumber, input, operator, decimal) {
    return firstNumber !== null && isInputNumber(input) && operator === null && decimal === ".";
}
function isFirstNumberEmpty(input) {
    if (firstNumber === "" && !operator && isInputNumber(input))
        return true;
    else
        return false;
}
function isFirstNumberGetBigger(iput, operator, firstNumber) {
    if (firstNumber !== "" && !operator && isInputNumber(input) && !isFirstNumberZero(firstNumber))
        return true;
    return false;
}
function setFirstNumber(input, isResult) {
    if (isResult === void 0) { isResult = false; }
    // The input here is the result of an operation
    if (isResult) {
        firstNumber = input;
    }
    else if (firstNumber === "") {
        firstNumber = input;
    }
    else if (firstNumber) {
        firstNumber = firstNumber + input;
    }
}
function isSecondNumberEmpty(input) {
    if (secondNumber === "" && operator && isInputNumber(input))
        return true;
    else
        return false;
}
function isSecondNumberGetBigger(input, secondNumber) {
    if (secondNumber !== "" && isInputNumber(input) && !isSecondNumberZero(secondNumber))
        return true;
    return false;
}
function setSecondNumber(input) {
    if (input === "") {
        secondNumber = "";
    }
    else if (secondNumber === "") {
        secondNumber = input;
    }
    else if (secondNumber) {
        secondNumber = secondNumber + input;
    }
}
function setOperator(input) {
    operator = input;
}
function isInputOperator(input) {
    // Check if the input is a =, +, *, or /
    return input === "+" || input === "-" || input === "/" || input === "x";
}
function isFirstOperator(firstNumber, operator, input) {
    return firstNumber !== "" && !operator && isInputOperator(input);
}
function displayValue(firstNumber, operator, secondNumber) {
    if (firstNumber === void 0) { firstNumber = ""; }
    if (operator === void 0) { operator = null; }
    if (secondNumber === void 0) { secondNumber = ""; }
    var display = document.querySelector('.display');
    display.textContent = "".concat(firstNumber !== "" ? firstNumber : "").concat(operator ? " " + operator + " " : "").concat(secondNumber !== "" ? secondNumber : "");
}
function reset() { }
function removeLastInput() { }
function isFirstNumberZero(firstNumber) {
    return firstNumber === "0";
}
function isSecondNumberZero(secondNumber) {
    return secondNumber === "0";
}
function getFirstNumber() {
    return firstNumber;
}
function add(firstNumber, secondNumber) {
    var result = +firstNumber + +secondNumber;
    return Number(result.toFixed(decimalPlace)).toString();
}
function subtract(firstNumber, secondNumber) {
    var result = (+firstNumber) - +secondNumber;
    return Number(result.toFixed(decimalPlace)).toString();
}
function multiply(firstNumber, secondNumber) {
    var result = (+firstNumber) * +secondNumber;
    return Number(result.toFixed(decimalPlace)).toString();
}
function divide(firstNumber, secondNumber) {
    var result = (+firstNumber) / +secondNumber;
    return Number(result.toFixed(decimalPlace)).toString();
}
function canOperate(firstNumber, operator, secondNumber) {
    return firstNumber !== "" && operator !== null && secondNumber !== "";
}
function operate(firstNumber, operator, secondNumber) {
    if (operator === "+") {
        var result = add(firstNumber, secondNumber);
        setFirstNumber(result, true);
    }
    else if (operator === "-") {
        var result = subtract(firstNumber, secondNumber);
        setFirstNumber(result, true);
    }
    else if (operator === "x") {
        var result = multiply(firstNumber, secondNumber);
        setFirstNumber(result, true);
    }
    else if (operator === "/") {
        var result = divide(firstNumber, secondNumber);
        setFirstNumber(result, true);
    }
    displayValue(getFirstNumber());
    setSecondNumber("");
    setOperator(null);
}
function isSecondOperator(firstNumber, secondNumber, operator, input) {
    return firstNumber && secondNumber && operator && isInputOperator(input);
}
