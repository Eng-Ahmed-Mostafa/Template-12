let textInput = document.querySelector(".phone .text input:nth-child(1)");
let textOutput = document.querySelector(".phone .text input:nth-child(2)");
let equalButton = document.querySelector(".equal");
let clearButton = document.querySelector(".clear");
let buttons = document.querySelectorAll("button:not(.out)");
let arrayOfSign;
let arrayOfNumbers;
let result;
console.log(3%2)
buttons.forEach(e => {
    e.addEventListener("click", function() {
        textInput.value += e.innerHTML;
        setArrays();
    })
})
function setArrays() {
    let content = textInput.value;
    let contentRgSign = /[^0-9\.]/g;
    let contentRgNum = /(\d+\.?\d*)/g;
    arrayOfSign = content.match(contentRgSign);
    arrayOfSignJoin = [...arrayOfSign];
    arrayOfNumbers = content.match(contentRgNum);
    postFix(arrayOfSignJoin.length);
}

function postFix(size) {
    let contentArrayOfNumbers = [];
    let contentArrayOfSign = [];
    contentArrayOfNumbers.push(arrayOfNumbers[0]);
    for(let i = 0;i < size; i++) {
        contentArrayOfNumbers.push(arrayOfNumbers[i+1])
        if((arrayOfSign[i] == '+' || arrayOfSign[i] == '-' ) && (arrayOfSign[i+1] == '×' || arrayOfSign[i+1] == '÷' || arrayOfSign[i+1] == '%' ) ) {
            contentArrayOfSign.push(arrayOfSign[i]);
        } else if ((arrayOfSign[i + 1] == '+' || arrayOfSign[i + 1] == '-' ) && (arrayOfSign[i] == '×' || arrayOfSign[i] == '÷' || arrayOfSign[i] == '%' ) ) {
            contentArrayOfNumbers.push(arrayOfSign[i]);
            if(contentArrayOfSign.length > 0) {
                contentArrayOfNumbers.push(contentArrayOfSign[contentArrayOfSign.length -1]);
                contentArrayOfSign.pop();
            }
        } else {
            contentArrayOfNumbers.push(arrayOfSign[i])
        }
        if(arrayOfSign.length - 1 == i || ((arrayOfSign[i + 1] == '+' || arrayOfSign[i + 1] == '-' ) && (arrayOfSign[i] == '+' || arrayOfSign[i] == '-' ))) {
            for(let j = contentArrayOfSign.length - 1;j >= 0;j--) {
                contentArrayOfNumbers.push(contentArrayOfSign[j]);
                contentArrayOfSign.pop();
            }
        }
    }
    equalButton.onclick = function() {
        console.log(contentArrayOfNumbers)
        arithmetic(contentArrayOfNumbers);
    }
}
function arithmetic(contentArrayOfNumbers) {
        for(let i = 0 ; i < contentArrayOfNumbers.length && contentArrayOfNumbers.length > 1; i++) {
            if(contentArrayOfNumbers[i] == "+" || contentArrayOfNumbers[i] == "-" || contentArrayOfNumbers[i] == "÷" || contentArrayOfNumbers[i] == "×" || contentArrayOfNumbers[i] == "%") {
                let partResult = 0;
                switch (contentArrayOfNumbers[i]) {
                    case '+':
                        partResult = parseFloat(contentArrayOfNumbers[i-2]) + parseFloat(contentArrayOfNumbers[i - 1]);
                        break;
                    case '-':
                        partResult = parseFloat(contentArrayOfNumbers[i-2]) - parseFloat(contentArrayOfNumbers[i - 1]);
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
                console.log(`partResult : ${partResult}`)
                contentArrayOfNumbers[i-2] = partResult;
                for(let j = i;j < contentArrayOfNumbers.length ;j++) {
                    contentArrayOfNumbers[j-1] = contentArrayOfNumbers[j+1];
                }
                contentArrayOfNumbers.pop();
                contentArrayOfNumbers.pop();
                console.log(`length : ${contentArrayOfNumbers.length}`);
                result = contentArrayOfNumbers[0];
                i = 0;
            }
        }
    textOutput.value = result;
}
clearButton.onclick = function() {
    textInput.value = "";
    textOutput.value = "";
}