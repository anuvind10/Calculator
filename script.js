
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

}

const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const display = document.querySelector('#display')

function populateDisplay() {
    const clickedValue = this.textContent;
    let number = "";
    display.textContent = clickedValue;
    
    if (this.classList == "num") {
        number = clickedValue;
    }
}

numbers.forEach((number) => number.addEventListener('click', populateDisplay))
operators.forEach((operator) => operator.addEventListener('click', populateDisplay))

