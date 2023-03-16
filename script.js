const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
let prevOperandTextElement = document.querySelector('[data-prevOperand]');
let currentOperandTextElement = document.querySelector('[data-currentOperand]');
let prevOperand = undefined;
let currentOperand = undefined;
let operation = undefined;

function clear() {
    prevOperand = '';
    currentOperand = ''; 
    operation = undefined;
}

clear()

function erase() {
    currentOperand = currentOperand.toString().slice(0, -1)
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
}

function chooseOperation(operationParamenter) {
    if (currentOperand === '') return
    if (prevOperand !== '') {
        operate()
    }
    operation = operationParamenter;
    prevOperand = currentOperand;
    currentOperand = '';
}

function operate() {
    let computation;
    const prev = parseFloat(prevOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return
    switch (operation) {
        case '+':
            computation = add(prev, current);
            break;
        case '-':
            computation = substract(prev, current);
            break;
        case '*':
            computation = multiply(prev, current);
            break;
        case '/':
            computation = divide(prev, current);
            break;        
    }
    currentOperand = computation;
    operation = undefined;
    prevOperand = '';   
}

function getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
        integerDisplay = '';
    } else {
        integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
    }
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
    } else {
        return integerDisplay
    }
}

function updateDisplay() {
    currentOperandTextElement.innerText = getDisplayNumber(currentOperand);
    if (operation != null) {
        prevOperandTextElement.innerText = `${getDisplayNumber(prevOperand)} ${operation}`;
    } else {
        prevOperandTextElement.innerText = '';
    }
}

const add = (a, b) => a + b;

const substract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b; 

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
        updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.innerText);
        updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    operate();
    updateDisplay();
})

clearButton.addEventListener('click', button => {
    clear();
    updateDisplay();
})

deleteButton.addEventListener('click', button => {
    erase();
    updateDisplay();
})

window.addEventListener('keydown', function(e) {
    const key = document.querySelector(`[data-key="${e.keyCode}"]`);
    key.click();
})