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
    if (isFirstNumberEmpty(input)) {
        console.log(1);
    }
}
function isFirstNumberEmpty(input) {
    return !firstNumber && !operator && isInputNumber(input);
}
function setFirstNumber() { }
function setSecondNumber() { }
function isOperatorSet() { }
function displayValue() { }
function reset() { }
function removeLastInput() { }
