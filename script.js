const screenHTML = document.querySelector("#screen");
const buttonsHTML = document.querySelector("#buttons");
const firstNumberHTML = document.querySelector("#first-number");
const secondNumberHTML = document.querySelector("#second-number");
const operatorHTML = document.querySelector("#operator");

let firstNumber = "";
let secondNumber = "";
let operator = "";


function operate(n1, n2, operator) {
    if(operator === "+") {
        return add(n1, n2);
    } else if(operator === "-") {
        return subtract(n1, n2);
    } else if(operator === "*") {
        return multiply(n1, n2);
    } else if(operator === "/") {
        return divide(n1, n2);
    } else if(operator === "%") {
        return modulo(n1, n2);
    }
}


function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    return n1 / n2;
}

function modulo(n1, n2) {
    return n1 % n2;
}


buttonsHTML.addEventListener("click", (event) => {
    const buttonValue = event.target.innerText;
    const operatorsArr = ["+", "-", "*", "/", "%"];

    if(event.target.nodeName !== "BUTTON") return;

    if(buttonValue === "CLEAR") {
        clear();
        return;
    }

    if(buttonValue === "DEL") {
        del();
        return;
    }

    // where the operation happens
    if(buttonValue === "=" || (operatorsArr.includes(buttonValue) && operator !== "")) {
        if(secondNumber === "") return;
        const result = operate(+firstNumber, +secondNumber, operator);
        clear(result);
        if(buttonValue === "=") {
            operator = ""
        } else if(operatorsArr.includes(buttonValue)) {
            operator = buttonValue;
        }
        operatorHTML.innerHTML = operator;
        return;
    }

    if(operatorsArr.includes(buttonValue)) {
        operator = buttonValue;
        operatorHTML.innerText = operator;
        return;
    }

    if(operator !== "") {
        
        if(buttonValue === ".") {
            if(secondNumber.includes(".")) return;
        }
        secondNumber += buttonValue;
        secondNumberHTML.innerText = secondNumber;
    } else if(operator === "") {
        if(buttonValue === ".") {
            if(firstNumber.includes(".")) return;
        }
        firstNumber += buttonValue;
        firstNumberHTML.innerText = firstNumber;
    }
});

function clear(result = "") {
    firstNumber = result;
    secondNumber = "";
    operator = "";
    firstNumberHTML.innerText = firstNumber;
    secondNumberHTML.innerText = "";
    operatorHTML.innerHTML = "";

}

function del() {
    if(secondNumber === "" && operator !== "" ) {
        operator = "";
        operatorHTML.innerText = operator;
    } else if(secondNumber !== "") {
        secondNumber = secondNumber.slice(0, secondNumber.length - 1);
        secondNumberHTML.innerText = secondNumber;
    } else {
        firstNumber = firstNumber.slice(0, firstNumber.length - 1);
        firstNumberHTML.innerText = firstNumber;
    }
}