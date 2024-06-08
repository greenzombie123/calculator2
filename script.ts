let input:number|string;
let firstNumber:number|null = null;
let secondNumber:number|null = null;
let operator:string|null = null;
let decimal = false;


const buttons = document.querySelectorAll("button")

buttons.forEach(button=>{
    const text = button.textContent!
    if(text !== '=' && text !== 'backSpace' && text !== 'clear'){
        button.addEventListener("click", (e:Event)=>{
            getInput(e)
            if(isInputNumber(input)){
                input = changeToNumber(input as string)
            }
        })
    }
})

function getInput(event:Event){
    input = (event.target as Element).textContent!
}

function setInput(input){}

function isInputNumber(input:string|number):boolean{
    // String with no numbers will turn into a Nan. If its a NaN, it aint a valid number so return false
    return !Number.isNaN(Number(input))
}

function changeToNumber(input:string):number{
    return +input
}

function reset(){}
function removeLastInput(){}