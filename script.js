function sum(first, second) {
    return first + second
}
function subtract(first, second) {
    return first - second
}
function multiply(first, second) {
    return first*second
}
function divide(first, second) {
    return first/second
}
function operate(first, operator, second) {
    switch (operator) {
        case sum:
            return sum(first, second)
            break;
        case subtract:
            return subtract(first, second)
            break;
        case multiply:
            return multiply(first, second)
            break;
        case divide:
            return divide(first, second)
            break;
    }
}
var calValue = "";

function numberAdd (button) {
    var x = button.value;
    document.getElementById("display").innerHTML += x;
    calValue += x;
}
function numberClear () {
    document.getElementById("display").innerHTML = "";
    calValue = "";
}
function backspace () {
    calValue = calValue.substring(0, calValue.length - 1);
    document.getElementById("display").innerHTML = calValue;
}