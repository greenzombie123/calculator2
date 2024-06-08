let input: string;
let firstNumber: string = "";
let secondNumber: string = "";
let operator: string | null = null;
let decimal: string = "";
const decimalPlace = 6


const buttons = document.querySelectorAll("button")

buttons.forEach(button => {
    const text = button.textContent!
    if (text !== '=' && text !== 'backSpace' && text !== 'clear') {
        button.addEventListener("click", (e: Event) => {
            getInput(e)
            setInput(input)
        })
    }
    if (text === '=') {
        button.addEventListener("click", () => {
            if (canOperate(firstNumber, operator, secondNumber)) {
                operate(firstNumber!, operator!, secondNumber!)
            }
        })
    }
})

function getInput(event: Event) {
    input = (event.target as Element).textContent!
}

function isInputNumber(input: string): boolean {
    // String with no numbers will turn into a Nan. If its a NaN, it aint a valid number so return false
    return !Number.isNaN(Number(input))
}

function changeToNumber(input: string): number {
    return +input

}

function setInput(input: string) {
    if (isFirstNumberEmpty(input)) {
        setFirstNumber(input)
        displayValue(firstNumber)
    }
    else if (isFirstNumberGetBigger(input, operator, firstNumber, decimal)) {
        setFirstNumber(input)
        displayValue(firstNumber)
    }
    // else if (isDecimalinFirstNumber(firstNumber, input, operator, decimal)) {
    //     setDecimal()
    //     displayValue(firstNumber, operator, null, decimal)
    // }
    else if (isInputFirstDecimal(firstNumber, input, operator, decimal)) {
        setDecimal()
        displayValue(firstNumber, operator, "", decimal)
    }
    // else if (isFirstNumberDecimalNumber(firstNumber, input, operator, decimal)) {
    //     setFirstNumber(input, decimal)
    //     resetDecimal()
    //     displayValue(firstNumber, operator, null, decimal)
    // }
    else if (isNumberDecimalNumber(firstNumber, input, operator, decimal)) {
        setFirstNumber(input, decimal)
        resetDecimal()
        displayValue(firstNumber, operator, "", decimal)
    }
    else if (isFirstOperator(firstNumber, operator, input)) {
        setOperator(input)
        displayValue(firstNumber, operator)
    }
    else if (isSecondNumberEmpty(input)) {
        setSecondNumber(input)
        displayValue(firstNumber, operator, secondNumber)
    }
    else if (isSecondNumberGetBigger(input, secondNumber)) {
        setSecondNumber(input)
        displayValue(firstNumber, operator, secondNumber)
    }
}

function isDecimalinFirstNumber(firstNumber: number | null, input: string, operator: string | null, decimal: string) {
    return firstNumber !== null && input === "." && operator === null && decimal === ""
}

function isInputFirstDecimal(number: string, input: string, operator: string | null, decimal: string):boolean {
    return number !== "" && input === "." && operator === null && decimal === ""
}

function isFirstNumberDecimalNumber(firstNumber: number | null, input: string, operator: string | null, decimal: string) {
    return firstNumber !== null && isInputNumber(input) && operator === null && decimal === "."
}

function isNumberDecimalNumber(number: string, input: string, operator: string | null, decimal: string) {
    return number !== "" && isInputNumber(input) && operator === null && decimal === "."
}

function setDecimal() {
    decimal = "."
}

function resetDecimal() {
    decimal = ""
}

function isFirstNumberEmpty(input: string) {
    if (firstNumber === "" && !operator && isInputNumber(input)) return true
    else return false
}

function isFirstNumberGetBigger(iput: string, operator: string | null, firstNumber: string, decimal:string) {
    if (firstNumber !== "" && !operator && isInputNumber(input) && !isFirstNumberZero(firstNumber) && decimal === "") return true
    return false
}

function setFirstNumber(input: string, decimal: string = "", isResult:boolean = false) {
    if (decimal === "." && firstNumber !== null) {
        firstNumber = firstNumber + decimal + input
    }
    // The input here is the result of an operation
    else if (isResult) {
        firstNumber = input
    }
    else if (firstNumber === "") {
        firstNumber = input
    }
    else if (firstNumber) {
        firstNumber = firstNumber + input
    }
}

function isSecondNumberEmpty(input: string) {
    if (secondNumber === "" && operator && isInputNumber(input)) return true
    else return false
}

function isSecondNumberGetBigger(input: string, secondNumber: string) {
    if (secondNumber !== "" && isInputNumber(input) && !isSecondNumberZero(secondNumber)) return true
    return false
}


function setSecondNumber(input: string) {
    if (input === "") {
        secondNumber = "";
    }
    else if (secondNumber === "") {
        secondNumber = input
    }
    else if (secondNumber) {
        secondNumber = secondNumber + input
    }
}

function setOperator(input: string | null) {
    operator = input
}

function isInputOperator(input: string) {
    // Check if the input is a =, +, *, or /
    return input === "+" || input === "-" || input === "/" || input === "x"
}

function isFirstOperator(firstNumber: string, operator: string | null, input: string): boolean {
    if (firstNumber !== "" && !operator && isInputOperator(input)) return true
    else return false
}

function displayValue(firstNumber: string = "", operator: string | null = null, secondNumber: string = "", decimal: string = "") {
    const display = document.querySelector('.display')!
    display.textContent = `${firstNumber !== "" ? firstNumber : ""}${decimal ? '.' : ""}${operator ? " " + operator + " " : ""}${secondNumber !== null ? secondNumber : ""}`
}

function reset() { }

function removeLastInput() { }

function isFirstNumberZero(firstNumber: string) {
    return firstNumber === "0"
}

function isSecondNumberZero(secondNumber: string) {
    return secondNumber === "0"
}

function getFirstNumber() {
    return firstNumber
}

function add(firstNumber: string, secondNumber: string) {
    let result = +firstNumber + +secondNumber
    return Number(result.toFixed(decimalPlace)).toString()
}

function subtract(firstNumber: string, secondNumber: string) {
    let result = (+firstNumber) - +secondNumber
    return Number(result.toFixed(decimalPlace)).toString()
}

function multiply(firstNumber: string, secondNumber: string) {
    let result = (+firstNumber) * +secondNumber
    return Number(result.toFixed(decimalPlace)).toString()
}

function divide(firstNumber: string, secondNumber: string) {
    let result = (+firstNumber) / +secondNumber
    return Number(result.toFixed(decimalPlace)).toString()
}

function canOperate(firstNumber: string, operator: string | null, secondNumber: string): boolean {
    return firstNumber !== "" && operator !== null && secondNumber !== ""
}

function operate(firstNumber: string, operator: string, secondNumber: string) {
    if (operator === "+") {
        let result = add(firstNumber, secondNumber)
        setFirstNumber(result, "", true)
    }
    else if (operator === "-") {
        let result = subtract(firstNumber, secondNumber)
        setFirstNumber(result, "", true)
    }
    else if (operator === "x") {
        let result = multiply(firstNumber, secondNumber)
        setFirstNumber(result, "", true)
    }
    else if (operator === "/") {
        let result = divide(firstNumber, secondNumber)
        setFirstNumber(result, "", true)
    }

    displayValue(getFirstNumber())
    setSecondNumber("")
    setOperator(null)
}
