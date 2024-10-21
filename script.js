const digits = document.querySelectorAll('[data-digit]');
const operators = document.querySelectorAll('[data-operator]');
const resultDisplay = document.querySelector('#resultDisplay');
const runningDisplay = document.querySelector('#runningDisplay')
const clear = document.querySelector("[data-clear]");
const equals = document.querySelector("[data-equals]");
const del = document.querySelector("#delete");
let firstOperand = '';
let secondOperand = '';
let currentInput = '';
let currentOperation = null;
let lastResult = '';
let bDelete = false;
let bEquals = false;
let previousInput = "";
let operatorList = ["+", "-", "x", "/"];

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
    if (num2 === 0)
        return "error";
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

//Populate the displays
function populateDisplay(input, trigger = 'result') {
    //Handle divide by 0 error
    if (input == "error") {
        resultDisplay.value = "CANNOT DIVIDE BY 0";
        runningDisplay.value += currentInput;
        return;
    }
    if (trigger == 'result') {
        secondOperand == "" ? resultDisplay.value = '' : resultDisplay.value = input;   

        if (!bDelete) {
                runningDisplay.value += currentInput;
        }
        else {
            if (runningDisplay.value != "")
                runningDisplay.value = runningDisplay.value.slice(0, -1);
            else {
                firstOperand = "";
            }
            bDelete = false;
        }
    }
    else runningDisplay.value += currentInput;

    if (runningDisplay.value.slice(-2, -1) == "/" && 
            (runningDisplay.value.slice(-1) == "0"|| runningDisplay.value.slice(-1) == ""))
        populateDisplay("error");
    
        previousInput = currentInput;
}

//Evaluates what needs to be done
function evaluateOperation() {
    
    //If previous operation was equals, then clear the results display
    if(bEquals) {
        resultDisplay.value = "";
        bEquals = false;
    }

    if (this.classList.contains("digit")) {
        currentInput = this.textContent;

        //first entry
        if(currentOperation == null) {
            resultDisplay.value = '';
            secondOperand += currentInput;
            //Keep populating until the first operator is clicked
            if (firstOperand == '')
                populateDisplay(secondOperand, this);
            else
                getResults();
        }
        //Second Entry
        else {
            secondOperand += currentInput;
            getResults();
        }
    }
    else if (this.classList.contains("operator")) {
        //If previous input was also an operator, then replace it with the new one
        if (operatorList.includes(previousInput)) {
            deleteInput();
        }
        currentOperation = this.textContent;
        currentInput = this.textContent
        
        if(lastResult == "") 
            firstOperand = secondOperand;
        else 
            firstOperand = lastResult;
        
        populateDisplay(firstOperand + currentOperation, this);
        secondOperand = '';
    }
}

// Gets the calculated results
function getResults() {
    let result;
    if (!(currentOperation == null)) {
        result = operate(currentOperation, Number(firstOperand), Number(secondOperand));
        populateDisplay(result);
        lastResult = result;
    }
}

//Clears Display
function clearDisplay() {
    if (!bEquals)
        resultDisplay.value = "";
    runningDisplay.value = "";
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
    lastResult = '';
    bEquals = false;
}

//Deletes previous input
function deleteInput() {
    secondOperand = secondOperand.slice(0, -1);
    currentInput = secondOperand;
    bDelete = true;
    getResults();
}

digits.forEach((digit) => digit.addEventListener('click', evaluateOperation));
operators.forEach((operator) => operator.addEventListener('click', evaluateOperation));
clear.addEventListener('click',clearDisplay);
del.addEventListener('click', deleteInput);
equals.addEventListener('click', () => {
    bEquals = true;
    clearDisplay();
});