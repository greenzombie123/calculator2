let input:number|string;
let firstNumber:number|null = null;
let secondNumber:number|null = null;
let operator:string|null = null;
let decimal = false;


const buttons = document.querySelectorAll("button")

buttons.forEach(button=>{
    const text = button.textContent!
    if(text !== '=' && text !== 'backSpace' && text !== 'clear'){
        button.addEventListener("click", getInput)
    }
})

function getInput(event:Event){
    input = (event.target as Element).textContent!
    console.log(input)
}

function reset(){}
function removeLastInput(){}