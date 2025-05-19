
/**
 * Se detta som en grund att utgå ifrån.
 * Det är helt fritt att ändra och ta bort kod om ni
 * önskar lösa problemen med andra metoder.
 */

let lcd = null; // displayen

let memory = 0; // Lagrat/gamlat värdet från display
let arithmetic = null; // Vilken beräkning som skall göras +,-, x eller /
let isComma = false;

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

    if(lcd.value === 'undefined' || lcd.value === 'NaN'){
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
                if(lcd.value === ''){
                    lcd.value += '-'
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
    lcd.value += digit;
    console.log(digit);
}

/**
 * Lägger till decimaltecken
 */
function addComma() {
    if (!isComma) {
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
    memory = parseFloat(lcd.value);
    console.log(memory + ' ' + arithmetic);
    clearLCD();
}

/**
 * Beräknar ovh visar resultatet på displayen.
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
            if(lcd.value === '0'){
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

    console.log(result)

    lcd.value = result;

}

/** Rensar display */
function clearLCD() {
    lcd.value = '';
    isComma = false;
}

/** Rensar allt, reset */
function memClear() {
    memory = 0;
    arithmetic = null;
    clearLCD();
}

window.onload = init;