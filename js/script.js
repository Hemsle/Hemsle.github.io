
let lcd = null; // displayen

let memory = 0; // Lagrat/gamlat värdet från display
let arithmetic = null; // Vilken beräkning som skall göras +,-, x eller /
let isComma = false;    //lagrar ifall det kommer finnas kommatecken
let isResult = false; //lagrar ifall det finns ett resultat

function init() {
    lcd = document.getElementById('lcd');
    let keyBoard = document.getElementById('keyBoard')
    keyBoard.onclick = buttonClick;
}

/**
 * Händelsehanterare för kalkylatorns tangentbord
 */
function buttonClick(e) {
    let btn = e.target.id; //id för den tangent som tryckte ner

    if (lcd.value === 'undefined') {
        clearLCD();
    }
    // kollar om siffertangent är nedtryckt
    if (btn.substring(0, 1) === 'b') {
        let digit = btn.substring(1, 2); // plockar ut siffran från id:et
        addDigit(digit);

    } else { // Inte en siffertangent, övriga tangenter.

        switch (btn) {
            case 'add':
                setOperator('+');
                break;
            case 'sub':
                if (lcd.value === '') {
                    isResult = false;
                    lcd.value += '-'
                    console.log('-')
                } else {
                    setOperator('-');
                }
                break;
            case 'mul':
                setOperator('*');
                break;
            case 'div':
                setOperator('/');
                break;
            case 'comma':
                addComma();
                break; f
            case 'enter':
                calculate();
                break;
            case 'clear':
                memClear();
                break;
        }
    }
}

/**
 *  Lägger till siffra på display.
 */
function addDigit(digit) {
    /**
    * när man vill påbörja en ny uträkning rensas displayen
    */
    if (isResult) {
        clearLCD();
        isResult = false;
    }
    lcd.value += digit;
    console.log(lcd.value);
}

/**
 * Lägger till decimaltecken
 */
function addComma() {
    if (!isComma) {//hindrar dubbla komman
        lcd.value += '.';
        isComma = true;
    }
}

/**
 * Sparar operator.
 * +, -, *, /
 */
function setOperator(operator) {
    arithmetic = operator;
    if ((lcd.value != '') && (lcd.value != '-')) {
        memory = parseFloat(lcd.value);
    }
    console.log(memory + ' ' + arithmetic);
    clearLCD();
}

/**
 * Beräknar och visar resultatet på displayen.
 */
function calculate() {
    let result;
    console.log(arithmetic);

    switch (arithmetic) {
        case '+':
            result = memory + parseFloat(lcd.value);
            break;
        case '-':
            result = memory - parseFloat(lcd.value);
            break;
        case '/':
            if (lcd.value === '0') {/** hindrar division med noll att bli infinity */
                lcd.value = 'undefined';
            } else {
                result = memory / parseFloat(lcd.value);
            }
            break;
        case '*':
            result = memory * parseFloat(lcd.value);
            break;
        case null:
            result = parseFloat(lcd.value);
            break;
    }

    arithmetic = null;
    if (lcd.value === '') {
        lcd.value = memory;
        isResult = true;/** lagrar att det finns ett resultat */
        console.log(memory + " " + isResult)
    } else {
        lcd.value = result;
        isResult = true;
        console.log(result + " " + isResult)
    }
}

/** Rensar display */
function clearLCD() {
    lcd.value = '';
    isComma = false;
}

/** Rensar allt, reset */
function memClear() {
    memory = '';
    arithmetic = null;
    clearLCD();
}

window.onload = init;