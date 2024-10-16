const digits = document.querySelectorAll('[data-digit]');
const operators = document.querySelectorAll('[data-operator]');
const resultDisplay = document.querySelector('#resultDisplay');
const runningDisplay = document.querySelector('#runningDisplay')
const clear = document.querySelector("[data-clear]");
const equals = document.querySelector("[data-equals]");
const del = document.querySelector("#delete");
let finalValue = 0;
let flag = 0;
let firstOperand = '';
let secondOperand = '';
let currentInput = '';
let currentOperation = null;
let lastResult = '';
let deleteInput = false;

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
        resultDisplay.value = input;

        if (!deleteInput)
            runningDisplay.value += currentInput;
        else {
            runningDisplay.value = runningDisplay.value.slice(0, -1);
            deleteInput = false;
        }
    }
    else runningDisplay.value += currentInput;
}

function evaluateOperation() {
    if (this.id == "equals") {
        runningDisplay.value = '';
        firstOperand = "";
        secondOperand = "";
        currentOperation = null;
        lastResult = "";
    }
    else if (this.id == "delete") {
        secondOperand = secondOperand.slice(0, -1);
        currentInput = secondOperand;
        deleteInput = true;
        getResults();
    }
    else if (this.classList.contains("digit")) {
        currentInput = this.textContent;
        if(currentOperation == null) {
            resultDisplay.value = '';
            secondOperand += currentInput;
            if (firstOperand == '')
                populateDisplay(secondOperand, this);
            else
                getResults();
        }
        else {
            secondOperand += currentInput;
            getResults();
        }
    }
    else if (this.classList.contains("operator")) {
        currentOperation = this.textContent;
        currentInput = this.textContent
    
        if(lastResult == '') 
            firstOperand = secondOperand;
        else 
            firstOperand = lastResult;
        
        populateDisplay(firstOperand + currentOperation, this);
        secondOperand = '';
    }
}

function getResults() {
    let result;
    if (!(currentOperation == null)) {
        result = operate(currentOperation, Number(firstOperand), Number(secondOperand));
        populateDisplay(result);
        lastResult = result;
    }
}

function clearDisplay() {
    resultDisplay.value = "";
    runningDisplay.value = "";
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
    lastResult = '';
}


digits.forEach((digit) => digit.addEventListener('click', evaluateOperation));
operators.forEach((operator) => operator.addEventListener('click', evaluateOperation));
equals.addEventListener('click', evaluateOperation);
clear.addEventListener('click',clearDisplay);
del.addEventListener('click', evaluateOperation);