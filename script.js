let calValue = "";
let calArr = [];
let calDisplay = "";

function numberAdd(button) {
    if (button.value === "-" && calValue.length === 0) {
        var x = button.value;
        calValue += x;
        calDisplay += x;
        document.getElementById("display").innerHTML = calValue;
        document.getElementById("calDisplay").innerHTML = calDisplay;
    }
    if (button.value != "-") {
        var x = button.value;
        calValue += x;
        calDisplay += x;
        document.getElementById("display").innerHTML = calValue;
        document.getElementById("calDisplay").innerHTML = calDisplay;
    }
    while (calValue.charAt(0) === "0"){
        calValue = calValue.substring(1);
        document.getElementById("display").innerHTML = calValue;
    }
};

function numberClear() {
    document.getElementById("display").innerHTML = "";
    calValue = "";
    calArr = [];
    calDisplay = "";
    document.getElementById("calDisplay").innerHTML = calArr;
    document.getElementById("calDisplay").innerHTML = calDisplay;
};

function backspace() {
    calValue = calValue.substring(0, calValue.length - 1);
    calDisplay = calDisplay.substring(0, calDisplay - 1);
    document.getElementById("display").innerHTML = calValue;
    document.getElementById("calDisplay").innerHTML = calDisplay;
};

function holdValue(button) {
    if (calValue.length === 0 && calArr.length === 0) {
        calValue = "0";
        calDisplay += 0;
    } else if (calValue.length === 0) {
        calArr.pop();
        calDisplay.substring(0, calDisplay.length - 1);
        document.getElementById("calDisplay").innerHTML = calDisplay;
        return calArr.push(button.value);
    }
    calArr.push(parseFloat(calValue));
    calArr.push(button.value);
    calDisplay += button.value;
    calValue = "";
    document.getElementById("display").innerHTML = calValue;
    document.getElementById("calDisplay").innerHTML = calDisplay;
};

function runOperate(){
    if (calValue === "-"){
        return
    }
    calArr.push(parseFloat(calValue));
    calculator(calArr);
    calValue = calArr;
    calDisplay += "=" + calValue;
    document.getElementById("calDisplay").innerHTML = calDisplay;
    calArr = [];
    document.getElementById("display").innerHTML = calValue;
    calDisplay = calValue;
};

function calculator(calArr) {
    for (let i = 1; i < calArr.length; i += 2) {
        if (calArr[i] === "*" || calArr[i] === "/") {
            if (calArr[i] === "*") {
                calArr[i] = calArr[i - 1] * calArr[i + 1];
                calArr.splice(i - 1, 1);
                calArr.splice(i, 1);
                i -= 2;
            } else {
                calArr[i] = calArr[i - 1] / calArr[i + 1];
                calArr.splice(i - 1, 1);
                calArr.splice(i, 1);
                i -= 2;
            }
        }
    }

    for (let k = 1; k < calArr.length; k += 2) {
        if (calArr[k] === "+" || calArr[k] === "-") {
            if (calArr[k] === "+") {
                calArr[k] = calArr[k - 1] + calArr[k + 1];
                calArr.splice(k - 1, 1);
                calArr.splice(k, 1);
                k -= 2;
            } else {
                calArr[k] = calArr[k - 1] - calArr[k + 1];
                calArr.splice(k - 1, 1);
                calArr.splice(k, 1);
                k -= 2;
            }
        }
    }
    calArr[0] = (Math.round(calArr[0] * 10000) / 10000).toFixed(4)
};

function deciAdd(button) {
    if (document.getElementById("display").innerHTML.indexOf(".") != -1) {
        return
    } else {
        var x = button.value;
        document.getElementById("display").innerHTML += x;
        calValue += x;
    }
};

function keyAdd(num) {
    document.getElementById("display").innerHTML += num;
    calValue += num;
};

document.addEventListener("keydown", function (event) {
    if (event.keyCode > 47 && event.keyCode < 58) {
        return keyAdd(event.keyCode - 48)
    }
    if (event.keyCode === 190) {
        return deciAdd(deci);
    }
    if (event.keyCode === 8) {
        return backspace();
    }
    if (event.keyCode === 9) {
        return numberClear();
    }
    if (event.keyCode === 16) {
        return runOperate();
    }
});