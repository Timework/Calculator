let calValue = "";
let calArr = [];
let calDisplay = "";

function numberAdd(button) {
    if (button.value === "(") {
        var x = button.value;
        calDisplay += x;
        document.getElementById("display").innerHTML = calValue;
        document.getElementById("calDisplay").innerHTML = calDisplay;
        calArr.push(x)
        return
    }
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
    while (calValue.charAt(0) === "0") {
        calValue = calValue.substring(1);
        calDisplay = calDisplay.substring(0, calDisplay.length - 1);
        document.getElementById("display").innerHTML = calValue;
        document.getElementById("calDisplay").innerHTML = calDisplay;
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
    if (calValue.indexOf(")") != -1) {
        let f = countp(calValue);
        calArr.push(parseFloat(calValue.substring(0, calValue.length - f)))
        for (let o = 0; o < f; o++) {
            calArr.push(")");
        }
    } else {
        calArr.push(parseFloat(calValue));
    }
    if (calValue.length === 0 && calArr.length === 0) {
        calValue = "0";
        calDisplay += 0;
    } else if (calValue.length === 0) {
        calArr.pop();
        calDisplay.substring(0, calDisplay.length - 1);
        document.getElementById("calDisplay").innerHTML = calDisplay;
        return calArr.push(button.value);
    }
    calArr.push(button.value);
    calDisplay += button.value;
    calValue = "";
    document.getElementById("display").innerHTML = calValue;
    document.getElementById("calDisplay").innerHTML = calDisplay;
};

function runOperate() {
    if (calValue === "-") {
        return
    }
    if (calValue.indexOf(")") != -1) {
        let f = countp(calValue);
        calArr.push(parseFloat(calValue.substring(0, calValue.length - f)))
        for (let o = 0; o < f; o++) {
            calArr.push(")");
        }
    } else {
        calArr.push(parseFloat(calValue));

    }
    calArr = calculator(calArr);
    calValue = calArr;
    calDisplay += "=" + calValue;
    document.getElementById("calDisplay").innerHTML = calDisplay;
    historyMove();
    document.getElementById("historyd1").innerHTML = calDisplay;
    calArr = [];
    document.getElementById("display").innerHTML = calValue;
    calDisplay = calValue;
};

function calculator(x) {
    for (let h = 0; h < x.length; h++) {
        if (x[h] === "(") {
            x.splice(h, 1);
            let g = looking(x.slice(h));
            x.splice(h + g, 1);
            let newValue = parseFloat(calculator(x.slice(h, h + g)))
            x.splice(h, g, newValue);
        }
    }
    for (let i = 0; i < x.length; i++) {
        if (x[i] === "*" || x[i] === "/") {
            if (x[i] === "*") {
                x[i] = x[i - 1] * x[i + 1];
                x.splice(i - 1, 1);
                x.splice(i, 1);
                i -= 2;
            } else {
                x[i] = x[i - 1] / x[i + 1];
                x.splice(i - 1, 1);
                x.splice(i, 1);
                i -= 2;
            }
        }
    }

    for (let k = 0; k < x.length; k++) {
        if (x[k] === "+" || x[k] === "-") {
            if (x[k] === "+") {
                x[k] = x[k - 1] + x[k + 1];
                x.splice(k - 1, 1);
                x.splice(k, 1);
                k -= 2;
            } else {
                x[k] = x[k - 1] - x[k + 1];
                x.splice(k - 1, 1);
                x.splice(k, 1);
                k -= 2;
            }
        }
    }
    return x[0] = (Math.round(x[0] * 10000) / 10000).toFixed(4)
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
function historyMove() {
    for (let i = 9; i > 0; i--) {
        if (document.getElementById(`historyd${i}`).innerHTML != "") {
            document.getElementById(`historyd${i + 1}`).innerHTML = document.getElementById(`historyd${i}`).innerHTML
        }
    }
}
function looking(x) {
    let finder = 1;
    for (let i = 0; i < x.length; i++) {
        if (x[i] === "(") {
            finder += 1;
        }
        if (x[i] === ")") {
            finder -= 1;
        }
        if (finder === 0) {
            return i
        }
    }
}
function countp(x) {
    let counter = 0;
    xsplit = x.split("");
    for (let i = 0; i < xsplit.length; i++) {
        if (xsplit[i] === ")") {
            counter += 1
        }
    }
    return counter
}