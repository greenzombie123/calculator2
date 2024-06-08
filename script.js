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
            if (isInputNumber(input)) {
                input = changeToNumber(input);
            }
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
    if (!firstNumber && !operator && isInputNumber(input)) {
        console.log(123);
    }
}
function setFirstNumber() { }
function setSecondNumber() { }
function isOperatorSet() { }
function displayValue() { }
function reset() { }
function removeLastInput() { }
