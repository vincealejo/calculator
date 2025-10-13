const screenHtml = document.querySelector("#screen");
const buttonsHtml = document.querySelector("#buttons");

let firstNumber = "";
let secondNumber = "";
let operator = "";

function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2){
    return n1 / n2;
}

function operate(n1, n2, op) {

    // converts n1 and n2 to integer before passing them to the functions
    if(op === "+") {
        return add(n1, n2);
    } else if (op === "-" ){
        return subtract(n1, n2);
    } else if (op === "*"){
        return multiply(n1, n2);
    } else if(op === "/") {
        return divide(n1, n2);
    }
}

function displayToScreen(value, clearScreen = false) {
    if (clearScreen) screenHtml.innerText = "";
    screenHtml.innerText += value; 
}

buttonsHtml.addEventListener("click", (event) => {
    const buttonValue = event.target.innerText;
    const operatorArray = ["+", "-", "*" , "/"];

    /* Clicking the Div (calculator itself not including buttons) causes all of the buttons to be clicked as well\
    due to the Event Delegation, this prevents that from happening*/
    if(event.target.nodeName === "DIV") return;
    
    if(buttonValue === "=") {
        if(secondNumber == "") return;
        const result = operate(+firstNumber, +secondNumber, operator);
        firstNumber = result;
        secondNumber = "";
        operator = ""
        displayToScreen(firstNumber, true);
        return;
    }

    if(operatorArray.includes(buttonValue)) {
        if(operator !== "") {
            const result = operate(+firstNumber, +secondNumber, operator);
            firstNumber = result;
            secondNumber = "";
            operator = "";
            displayToScreen(firstNumber, true);
        }

        operator = buttonValue;
        displayToScreen(buttonValue);
        return;
    }

    if(operator === "") {
        firstNumber += buttonValue;
    } else {
        secondNumber += buttonValue;
    }

    displayToScreen(buttonValue);
})


