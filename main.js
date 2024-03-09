let textInput = document.querySelector(".phone .text input:nth-child(1)");
let textOutput = document.querySelector(".phone .text input:nth-child(2)");
let equalButton = document.querySelector(".equal");
let clearButton = document.querySelector(".clear");
let buttons = document.querySelectorAll("button:not(.out)");
let arrayOfSign = [];
let arrayOfNumbers = [];
let result;
let saveTest;
buttons.forEach(e => {
    e.addEventListener("click", function() {
        textInput.value += e.innerHTML;
        arrayOfNumbers = [];
        setArrays();
        // postFix(arrayOfSignJoin.length);
    })
})
function setArrays() {
    let content = textInput.value;
    let contentRgSign = /[^0-9\.]/g;
    let contentRgNum = /(-?\d+(\.?\d*)?)/g;
    arrayOfNumbers = content.match(contentRgNum);
    saveTest = arrayOfNumbers[0];
    console.log(saveTest)
    arrayOfSign = content.match(contentRgSign);
    console.log(arrayOfSign)
    postFix(saveTest);
}
let contentArrayOfNumbers;
function postFix(saveTest) { 
    // 5
    let jump = 0;
    contentArrayOfNumbers = []; 
    let contentArrayOfSign = [];
    if(parseFloat(arrayOfNumbers[0]) < 0) {
        contentArrayOfNumbers.push(parseFloat(arrayOfNumbers[0]) * -1);
        contentArrayOfNumbers.push(arrayOfSign[0])
        jump = 1;
    } else {
            contentArrayOfNumbers.push(arrayOfNumbers[0]);
    } // 5 
    console.log(`contentArrayOfNumbers test : ${contentArrayOfNumbers}`)
    for(let i = 0 + jump;i < arrayOfSign.length && arrayOfSign.length != 0; i++) { // 0
        if(parseFloat(arrayOfNumbers[i + 1 - jump]) < 0) { 
            contentArrayOfNumbers.push(parseFloat(arrayOfNumbers[i + 1 - jump])  * -1);
            contentArrayOfNumbers.push("-");
        } else {
            contentArrayOfNumbers.push(arrayOfNumbers[i + 1 - jump]);
        }
        if((arrayOfSign[i] == '+') && (arrayOfSign[i+1] == '×' || arrayOfSign[i+1] == '÷' || arrayOfSign[i+1] == '%' ) ) {
            contentArrayOfSign.push(arrayOfSign[i]);
        } else if ((arrayOfSign[i + 1] == '+') && (arrayOfSign[i] == '×' || arrayOfSign[i] == '÷' || arrayOfSign[i] == '%' ) ) {
            contentArrayOfNumbers.push(arrayOfSign[i]);
        } else if(!(arrayOfSign[i] == '-')) {
            contentArrayOfNumbers.push(arrayOfSign[i])
        }
        if(arrayOfSign.length - 1 == i ||(arrayOfSign[i + 1] == '+' || arrayOfSign[i + 1] == '-') && (arrayOfSign[i] == '+' ||  arrayOfSign[i] == '-') || (arrayOfSign[i + 1] == '+' || arrayOfSign[i + 1] == '-') && (arrayOfSign[i] == '×' ||  arrayOfSign[i] == '÷')) {
            for(let j = contentArrayOfSign.length - 1;j >= 0;j--) {
                contentArrayOfNumbers.push(contentArrayOfSign[j]);
                contentArrayOfSign.pop();
            }
        }
    }
}
equalButton.onclick = function() {
    for(let i = 0;i< contentArrayOfNumbers.length;i++) {
        if(contentArrayOfNumbers[i] == undefined) {
            for(let j = i;j<contentArrayOfNumbers.length ; j++) {
                contentArrayOfNumbers[j] = contentArrayOfNumbers[j+1];
            }
            contentArrayOfNumbers.pop();
            i--;
        }
    }
    console.log(contentArrayOfNumbers)
    console.log(`arrayOfSign :${arrayOfSign}`)
    arithmetic(contentArrayOfNumbers);
}
let partResult
function arithmetic(contentArrayOfNumbers) { // ['5', 3, '-', '2', '+']
        // 0 1 2
        for(let i = 0 ; i < contentArrayOfNumbers.length && contentArrayOfNumbers.length >= 1; i++) {
            let checkPos = true;
            let checkPosNum = 0;
            if(contentArrayOfNumbers[i] == "+" || contentArrayOfNumbers[i] == '-' || contentArrayOfNumbers[i] == "÷" || contentArrayOfNumbers[i] == "×" || contentArrayOfNumbers[i] == "%") {
                partResult = 0; // 54
                switch (contentArrayOfNumbers[i]) {
                    case '+':
                        partResult = parseFloat(contentArrayOfNumbers[i-2]) + parseFloat(contentArrayOfNumbers[i - 1]);
                        break;
                    case '-':
                        partResult = -1 * parseFloat(contentArrayOfNumbers[i - 1]);
                        checkPos = false;
                        checkPosNum = 1;
                        break;
                    case '÷': 
                        partResult = parseFloat(contentArrayOfNumbers[i-2]) / parseFloat(contentArrayOfNumbers[i - 1]);
                        break;
                    case '×':
                        partResult = parseFloat(contentArrayOfNumbers[i-2]) * parseFloat(contentArrayOfNumbers[i - 1]);
                        break;
                    case '%':
                        partResult = parseFloat(contentArrayOfNumbers[i-2]) % parseFloat(contentArrayOfNumbers[i - 1]);
                        break;
                }
                if(checkPos) {
                    contentArrayOfNumbers[i-2] = partResult;
                } else {
                    contentArrayOfNumbers[i-1] = partResult; // 5 -3 2 +
                }
                for(let j = i + checkPosNum;j < contentArrayOfNumbers.length ;j++) {
                    contentArrayOfNumbers[j-1] = contentArrayOfNumbers[j + 1 - checkPosNum];
                }
                if(checkPos) {
                    contentArrayOfNumbers.pop();
                }
                contentArrayOfNumbers.pop();
                console.log(`length : ${contentArrayOfNumbers}`);
                i = 0;
            }
        }
        result = 0;
        for(let i = 0; i< contentArrayOfNumbers.length;i++) {
            console.log(`contentArrayOfNumber : ${i} => ${contentArrayOfNumbers[i]}`)
            result += parseFloat(contentArrayOfNumbers[i]);
        }
        textOutput.value = result;
}
clearButton.onclick = function() {
    textInput.value = "";
    textOutput.value = "";
}