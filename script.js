const display = document.getElementById('display');
const calculationDisplay = document.getElementById('calculation');
const resultDisplay = document.getElementById('result');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = '';
let previousInput = '';
let calculation = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-num') || 
                      button.getAttribute('data-operator') ||
                      button.getAttribute('data-equals') ||
                      button.getAttribute('data-clear');

        if (value >= '0' && value <= '9') {
            currentInput += value;
            updateDisplay();
        } else if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = '';
            calculation = '';
            updateDisplay(true);
        } else if (value === '+' || value === '-' || value === '*' || value === '/') {
            if (currentInput === '') return;
            operator = value;
            previousInput = currentInput;
            calculation += currentInput + ' ' + operator + ' ';
            currentInput = '';
            updateDisplay();
        } else if (value === '=') {
            if (currentInput === '' || previousInput === '' || operator === '') return;
            calculation += currentInput;
            currentInput = operate(previousInput, currentInput, operator).toString();
            previousInput = '';
            operator = '';
            updateDisplay();
        }
    });
});

function updateDisplay(clear = false) {
    if (clear) {
        calculationDisplay.textContent = '';
        resultDisplay.textContent = '';
    } else {
        calculationDisplay.textContent = calculation;
        resultDisplay.textContent = currentInput;
    }
}

function operate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            return 0;
    }
}

