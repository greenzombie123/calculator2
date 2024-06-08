let input: string;
let firstNumber: number | null = null;
let secondNumber: number | null = null;
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
        displayValue(firstNumber, operator, null, decimal)
    }
    // else if (isFirstNumberDecimalNumber(firstNumber, input, operator, decimal)) {
    //     setFirstNumber(input, decimal)
    //     resetDecimal()
    //     displayValue(firstNumber, operator, null, decimal)
    // }
    else if (isNumberDecimalNumber(firstNumber, input, operator, decimal)) {
        setFirstNumber(input, decimal)
        resetDecimal()
        displayValue(firstNumber, operator, null, decimal)
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

function isInputFirstDecimal(number: number | null, input: string, operator: string | null, decimal: string):boolean {
    return number !== null && input === "." && operator === null && decimal === ""
}

function isFirstNumberDecimalNumber(firstNumber: number | null, input: string, operator: string | null, decimal: string) {
    return firstNumber !== null && isInputNumber(input) && operator === null && decimal === "."
}

function isNumberDecimalNumber(number: number | null, input: string, operator: string | null, decimal: string) {
    return number !== null && isInputNumber(input) && operator === null && decimal === "."
}

function setDecimal() {
    decimal = "."
}

function resetDecimal() {
    decimal = ""
}

function isFirstNumberEmpty(input: string) {
    if (firstNumber === null && !operator && isInputNumber(input)) return true
    else return false
}

function isFirstNumberGetBigger(iput: string, operator: string | null, firstNumber: number | null, decimal:string) {
    if (firstNumber !== null && !operator && isInputNumber(input) && !isFirstNumberZero(firstNumber) && decimal === "") return true
    return false
}

function setFirstNumber(input: string | number, decimal: string = "") {
    if (typeof input === "string" && decimal === "." && firstNumber !== null) {
        firstNumber += +(decimal + input)
    }
    // The input here is the result of an operation
    else if (typeof input === 'number') {
        firstNumber = input
    }
    else if (firstNumber === null) {
        firstNumber = +input
    }
    else if (firstNumber) {
        firstNumber = +(firstNumber + input)
    }
}

function isSecondNumberEmpty(input: string) {
    if (secondNumber === null && operator && isInputNumber(input)) return true
    else return false
}

function isSecondNumberGetBigger(input: string, secondNumber: number | null) {
    if (secondNumber !== null && isInputNumber(input) && !isSecondNumberZero(secondNumber)) return true
    return false
}


function setSecondNumber(input: string | null) {
    if (input === null) {
        secondNumber = null;
    }
    else if (secondNumber === null) {
        secondNumber = +input
    }
    else if (secondNumber) {
        secondNumber = +(secondNumber + input)
    }
}

function setOperator(input: string | null) {
    operator = input
}

function isInputOperator(input: string) {
    // Check if the input is a =, +, *, or /
    return input === "+" || input === "-" || input === "/" || input === "x"
}

function isFirstOperator(firstNumber: number | null, operator: string | null, input: string): boolean {
    if (firstNumber !== null && !operator && isInputOperator(input)) return true
    else return false
}

function displayValue(firstNumber: number | null = null, operator: string | null = null, secondNumber: number | null = null, decimal: string = "") {
    const display = document.querySelector('.display')!
    display.textContent = `${firstNumber !== null ? firstNumber : ""}${decimal ? '.' : ""}${operator ? " " + operator + " " : ""}${secondNumber !== null ? secondNumber : ""}`
}

function reset() { }

function removeLastInput() { }

function isFirstNumberZero(firstNumber: number) {
    return firstNumber === 0
}

function isSecondNumberZero(secondNumber: number) {
    return secondNumber === 0
}

function getFirstNumber() {
    return firstNumber
}

function add(firstNumber: number, secondNumber: number) {
    let result = firstNumber + secondNumber
    return Number(result.toFixed(decimalPlace))
}

function subtract(firstNumber: number, secondNumber: number) {
    let result = firstNumber - secondNumber
    return Number(result.toFixed(decimalPlace))
}

function multiply(firstNumber: number, secondNumber: number) {
    let result = firstNumber * secondNumber
    return Number(result.toFixed(decimalPlace))
}

function divide(firstNumber: number, secondNumber: number) {
    let result = firstNumber / secondNumber
    return Number(result.toFixed(decimalPlace))
}

function canOperate(firstNumber: number | null, operator: string | null, secondNumber: number | null): boolean {
    return firstNumber !== null && operator !== null && secondNumber !== null
}

function operate(firstNumber: number, operator: string, secondNumber: number) {
    if (operator === "+") {
        let result = add(firstNumber, secondNumber)
        setFirstNumber(result)
    }
    else if (operator === "-") {
        let result = subtract(firstNumber, secondNumber)
        setFirstNumber(result)
    }
    else if (operator === "x") {
        let result = multiply(firstNumber, secondNumber)
        setFirstNumber(result)
    }
    else if (operator === "/") {
        let result = divide(firstNumber, secondNumber)
        setFirstNumber(result)
    }

    displayValue(getFirstNumber())
    setSecondNumber(null)
    setOperator(null)
}
