let history = '';
let display = '';
let result = 0;

function appendCharacter(historyCharacter, displayCharacter) {
    history += historyCharacter;
    display += displayCharacter || historyCharacter;
    evaluateAndUpdate();
}

function deleteCharacter() {
    display = display.slice(0, -1);
    history = (history.slice(-2) === "**") ? history.slice(0, -2) : history.slice(0, -1);
    evaluateAndUpdate();
}

function clearDisplay() {
    history = '';
    display = '';
    result = 0;
    updateDisplay();
}

function evaluateAndUpdate() {
    try {
        evaluateExpression();
    } catch (err) { }
    updateDisplay();
}

function evaluateExpression() {
    try {
        result = eval(history);
    } catch (err) {
        result = eval((history.slice(-2) === "**") ? history.slice(0, -2) : history.slice(0, -1));
    }
}

function finalEval() {
    try {
        result = eval(history);
    } catch (err) {
        try {
            history = history.slice(0, -1);
            display = display.slice(0, -1);
            result = eval(history);
        } catch (err) {
            history = '';
            display = '';
            result = "Math Error";
        }
    }

    document.querySelector('.display__history').textContent = '';
    document.querySelector('.display__result').textContent = result;
    history = '';
    display = '';
}

function updateDisplay() {
    document.querySelector('.display__history').textContent = display;
    document.querySelector('.display__result').textContent = result;
}
