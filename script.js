const digits = document.querySelectorAll('[data-digit]');
const operators = document.querySelectorAll('[data-operator]');
const currentDisplay = document.querySelector('#currentDisplay');
const runningDisplay = document.querySelector('#runningDisplay')
const clear = document.querySelector("[data-clear]");
const equals = document.querySelector("[data-equals]");
let finalValue = 0;
let flag = 0;
let firstOperand = '';
let secondOperand = '';
let currentOperation = null;

function addNumbers(num1, num2) {
    return  num1+num2;
}

function subtractNumbers(num1, num2) {
    return num1-num2;
}

function multiplyNumbers(num1, num2) {
    return num1*num2;
}

function divideNumbers(num1, num2) {
    return num1/num2;
}

function operate(operator, num1, num2){
    let result;
    switch(operator){
        case "+":
            result = addNumbers(num1, num2);
            break;
            
        case "-":
            result = subtractNumbers(num1, num2);
            break;
        
        case "x":
            result = multiplyNumbers(num1, num2);
            break;

        case "/":
            result = divideNumbers(num1, num2);
    }
    return result;
}

function populateDisplay(input, trigger = 'result') {
    if (trigger == 'result') {  
        currentDisplay.value = input;
    }
    else if (trigger.classList.contains('digit')) 
        currentDisplay.value = input;
    if (!(trigger.id == "equals" || trigger.id == "clear")) {
        if (currentOperation == null)
            runningDisplay.value = `${firstOperand}`
        else
        runningDisplay.value = `${firstOperand} ${currentOperation} ${secondOperand}`
    }
}

function evaluateOperation() {
    let result;
    if (!(currentOperation == null)) {
        result = operate(currentOperation, firstOperand, secondOperand);
        populateDisplay(result);
        firstOperand = result;
        secondOperand = '';
        currentOperation = '';
    }
}

function clearDisplay() {
    currentDisplay.value = "";
    runningDisplay.value = "";
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
    finalValue = 0;
}

clear.addEventListener('click',clearDisplay);
equals.addEventListener('click', evaluateOperation);
digits.forEach((digit) => digit.addEventListener('click', (event) => {
    if(currentOperation == null) {
        firstOperand += event.target.textContent;
        populateDisplay(firstOperand, event.target);
    }
    else {
        secondOperand += event.target.textContent;
        populateDisplay(secondOperand, event.target);
    }
}));


operators.forEach((operator) => operator.addEventListener('click', (event) => {
    if (!(currentOperation == null))
    evaluateOperation();
    currentOperation = event.target.textContent;
    populateDisplay(firstOperand + currentOperation, event.target);
}));
