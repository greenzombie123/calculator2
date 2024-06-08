let input: string;
let firstNumber: number | null = null;
let secondNumber: number | null = null;
let operator: string | null = null;
let decimal = false;


const buttons = document.querySelectorAll("button")

buttons.forEach(button => {
    const text = button.textContent!
    if (text !== '=' && text !== 'backSpace' && text !== 'clear') {
        button.addEventListener("click", (e: Event) => {
            getInput(e)
            setInput(input)
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
    else if (isFirstNumberGetBigger(input)) {
        setFirstNumber(input)
        displayValue(firstNumber)
    }
    else if (isFirstOperator(firstNumber, operator, input)){
        setOperator(input)
        displayValue(firstNumber, operator)
    }
}

function isFirstNumberEmpty(input: string) {
    if(!firstNumber && !operator && isInputNumber(input)) return true
    else return false
}

function isFirstNumberGetBigger(iput: string) {
    if(firstNumber && !operator && isInputNumber(input)) return true
    return false
}

function setFirstNumber(input: string) {
    if (firstNumber === null) {
        firstNumber = +input
    }
    else if (firstNumber) {
        firstNumber = +(firstNumber + input)
    }
}


function setSecondNumber() { }

function setOperator(input:string){
    operator = input
}

function isInputOperator(input: string) {
    // Check if the input is a =, +, *, or /
    return Number.isNaN(Number(input))
}

function isFirstOperator(firstNumber:number|null, operator:string|null, input:string):boolean{
    if(firstNumber && !operator && isInputOperator(input)) return true
    else return false
}

function displayValue(firstNumber: number | null = null, operator: string | null = null, secondNumber: number | null = null, decimal: boolean = false) {
    const display = document.querySelector('.display')!
    display.textContent = `${firstNumber}${operator ? " " + operator + " " : ""}`
}

function reset() { }

function removeLastInput() { }