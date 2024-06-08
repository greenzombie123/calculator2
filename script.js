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
        });
    }
});
function getInput(event) {
    input = event.target.textContent;
    console.log(input);
}
function reset() { }
function removeLastInput() { }
