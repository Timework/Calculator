let calValue = "";
let calArr = [];

function numberAdd (button) {
    var x = button.value;
    document.getElementById("display").innerHTML += x;
    calValue += x;
};

function numberClear () {
    document.getElementById("display").innerHTML = "";
    calValue = "";
    calArr = [];
};

function backspace () {
    calValue = calValue.substring(0, calValue.length - 1);
    document.getElementById("display").innerHTML = calValue;
};

function holdValue (button) {
    if (calValue.length === 0 && calArr.length === 0) {
        calValue = "0";
    } else if (calValue.length === 0){
        calArr.pop();
        return calArr.push(button.value);
    }
    calArr.push(parseFloat(calValue));
    calArr.push(button.value);
    calValue = "";
    document.getElementById("display").innerHTML = calValue;
};

function runOperate () {
    calArr.push(parseFloat(calValue));
    calculator(calArr);
    calValue = calArr;
    calArr = [];
    document.getElementById("display").innerHTML = calValue;
};

function calculator(calArr) {
    for (let i = 1; i < calArr.length; i+=2) {
        if (calArr[i] === "multiply" || calArr[i] === "divide") {
            if (calArr[i] === "multiply") {
                calArr[i] = calArr[i - 1] * calArr[i + 1];
                calArr.splice(i - 1, 1);
                calArr.splice(i, 1);
                i = -1
            } else {
                calArr[i] = calArr[i - 1] / calArr[i + 1];
                calArr.splice(i - 1, 1);
                calArr.splice(i, 1);
                i = -1
            }
        }
    }

    for (let k = 1; k < calArr.length; k+=2) {
        if (calArr[k] === "sum" || calArr[k] === "subtract") {
            if (calArr[k] === "sum") {
                calArr[k] = calArr[k - 1] + calArr[k + 1];
                calArr.splice(k - 1, 1);
                calArr.splice(k, 1);
                k = -1;
            } else {
                calArr[k] = calArr[k - 1] - calArr[k + 1];
                calArr.splice(k - 1, 1);
                calArr.splice(k, 1);
                k = -1;
            }
        }
    }
};

function deciAdd(button){
    if (document.getElementById("display").innerHTML.indexOf(".") != -1) {
        return
    } else {
        var x = button.value;
        document.getElementById("display").innerHTML += x;
        calValue += x;
    }
};

function keyAdd (num){
    document.getElementById("display").innerHTML += num;
    calValue += num;
};

document.addEventListener("keydown", function(event){
    if(event.keyCode > 47 && event.keyCode < 58){
        return keyAdd(event.keyCode - 48)
    }
    if(event.keyCode === 190){
        return deciAdd(deci);
    }
    if (event.keyCode === 8) {
        return backspace();
    }
    if (event.keyCode === 9) {
        return numberClear();
    }
    if (event.keyCode === 16){
         return runOperate();
    }
});