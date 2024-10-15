const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const display = document.querySelector('#display');
const clear = document.querySelector("#clear");
const equals = document.querySelector("#equals");
let numberArray =[];
let operatorArray = [];

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
    let displayValue
    switch(operator){
        case "+":
            displayValue = addNumbers(num1, num2);
            break;
            
        case "-":
            displayValue = subtractNumbers(num1, num2);
            break;
        
        case "x":
            displayValue = multiplyNumbers(num1, num2);
            break;

        case "/":
            displayValue = divideNumbers(num1, num2);
    }
    display.value = displayValue;
}

function populateDisplay(input) {
    const clickedValue = input.textContent;
    if (input.id != "equals" && input.id != "clear") {
        display.value += clickedValue;
    }
}

function clearDisplay() {
    display.value = "";
    numberArray = [];
    operatorArray = [];
}

let arr=[];

// equals.addEventListener('click', operate(operator, num1, num2));
clear.addEventListener('click',clearDisplay);
numbers.forEach((number) => number.addEventListener('click', () => {
    numberArray.push(Number(number.textContent));
    populateDisplay(number);
}));
operators.forEach((operator) => operator.addEventListener('click', () => {
    operatorArray.push(operator.textContent);
    populateDisplay(operator);
}));
