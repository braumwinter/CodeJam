const container = document.createElement('div');
container.className = 'container';
document.getElementsByTagName('body')[0].append(container);

const list = document.createElement('ul');
list.className = 'helper';
container.append(list);

let listItem = document.createElement('li');
listItem.innerHTML = 'изменить язык виртуальной клавиатуры Ctrl + Alt';
list.append(listItem);

listItem = document.createElement('li');
listItem.innerHTML = 'можно перемещать курсор с помощью стрелок';
list.append(listItem);

listItem = document.createElement('li');
listItem.innerHTML = 'вставляются и удаляются элементы по местоположению курсора';
list.append(listItem);

const textArea = document.createElement('textarea');
textArea.cols = '20';
textArea.rows = '11';
textArea.wrap = 'hard';
textArea.className = 'textarea';
textArea.id = 'textArea';
textArea.onblur = function onblurTextArea() {
  carriage = textArea.selectionEnd;
};
container.append(textArea);

const keyboard = document.createElement('div');
keyboard.className = 'keyboard';
container.append(keyboard);

const keyboardRow1 = document.createElement('div');
keyboardRow1.className = 'keyboardRow';
keyboard.append(keyboardRow1);

const keyboardRow2 = document.createElement('div');
keyboardRow2.className = 'keyboardRow';
keyboard.append(keyboardRow2);

const keyboardRow3 = document.createElement('div');
keyboardRow3.className = 'keyboardRow';
keyboard.append(keyboardRow3);

const keyboardRow4 = document.createElement('div');
keyboardRow4.className = 'keyboardRow';
keyboard.append(keyboardRow4);

const keyboardRow5 = document.createElement('div');
keyboardRow5.className = 'keyboardRow';
keyboard.append(keyboardRow5);

if (localStorage.getItem('lang') === null) {
  localStorage.setItem('lang', EN);
} else {
  lang = localStorage.getItem('lang');
}

class Button {
  constructor(lowerEn, upperEn, lowerRu, upperRu, button, buttonName, buttonClass,
    buttonRow) {
    this.lowerEn = lowerEn;
    this.upperEn = upperEn;
    this.lowerRu = lowerRu;
    this.upperRu = upperRu;
    this.button = button;
    this.buttonName = buttonName;
    this.buttonClass = buttonClass;
    this.button.id = buttonName;
    this.button.className = buttonClass;

    if (lang === EN && letterCase === LOWER) {
      this.button.innerHTML = this.lowerEn;
    } else if (lang === EN && letterCase === UPPER) {
      this.button.innerHTML = this.upperEn;
    } else if (lang === RU && letterCase === LOWER) {
      this.button.innerHTML = this.lowerRu;
    } else if (lang === RU && letterCase === UPPER) {
      this.button.innerHTML = this.upperRu;
    }

    switch (buttonName) {
      case 'buttonBackspace': {
        this.button.addEventListener('click', () => {
          const strLength = textArea.value.length;
          carriage = textArea.selectionEnd;

          if (carriage !== 0) {
            if (carriage === strLength) {
              textArea.value = textArea.value.slice(0, -1);
            } else {
              textArea.value = textArea.value.slice(0, carriage - 1) +
              textArea.value.slice(carriage);
            }
          }

          textArea.focus();

          if (carriage < 1) {
            carriage = 0;
          } else {
            carriage -= 1;
          }

          textArea.selectionEnd = carriage;
        },
        false);
        break;
      }

      case 'buttonTab': {
        this.button.addEventListener('click', () => {
          const strLength = textArea.value.length;
          carriage = textArea.selectionEnd;

          if (carriage === strLength) {
            textArea.value += '\t';
          } else {
            textArea.value = `${textArea.value.slice(0, carriage)}\t${textArea.value.slice(carriage)}`;
          }

          textArea.focus();
          carriage += 1;
          textArea.selectionEnd = carriage;
        },
        false);
        break;
      }

      case 'buttonCapsLock': {
        this.button.addEventListener('click', () => {
          isCapsLock = !isCapsLock;

          if (isCapsLock) {
            letterCase = UPPER;
          } else {
            letterCase = LOWER;
          }

          for (let i = 0; i < KeyBoardLetters.length; i += 1) {
            KeyBoardLetters[i].changeName();
          }
        },
        false);
        break;
      }
      case 'buttonEnter': {
        this.button.addEventListener('click', () => {
          const strLength = textArea.value.length;
          carriage = textArea.selectionEnd;

          if (carriage === strLength) {
            textArea.value += '\n';
          } else {
            textArea.value = `${textArea.value.slice(0, carriage)} \n ${textArea.value.slice(carriage)}`;
          }

          textArea.focus();
          carriage += 1;
          textArea.selectionEnd = carriage;
        },
        false);
        break;
      }
      case 'buttonShiftLeft': {
        this.button.addEventListener('mousedown', () => {
          if (isCapsLock) {
            letterCase = LOWER;
          } else {
            letterCase = UPPER;
          }

          for (let i = 0; i < KeyBoardLetters.length; i += 1) {
            KeyBoardLetters[i].changeName();
          }
        },
        false);

        this.button.addEventListener('mouseup', () => {
          if (isCapsLock) {
            letterCase = UPPER;
          } else {
            letterCase = LOWER;
          }

          for (let i = 0; i < KeyBoardLetters.length; i += 1) {
            KeyBoardLetters[i].changeName();
          }
        },
        false);
        break;
      }

      case 'buttonArrowUp': {
        this.button.addEventListener('click', () => {
          /**
           * ширина символа данного шрифта и размера = 9px
           * вычисленно экспериментально: через ширину span с одним символом и display: inline-block
           * вычисляем сколько символов поместится в одной строке
           * берём поле ввода, вычитаем padding'и и делим на ширину символа
           */
          const textAreaWidtn = (textArea.scrollWidth - 20) / 9;
          const str = textArea.value;
          carriage = textArea.selectionEnd;

          // проверяем были ли переносы строки (используем трюк с побитовым НЕ)
          const lineBreak = str.indexOf('\n');

          // проверяем сколько примерно строк, если без переносов
          const numberLines = textAreaWidtn < str.length;

          // если были переносы или содержимое больше чем ширина одной строки
          const objLines = [];
          let counterCarriage = 0;
          let subStrStart = 0;
          let subStrEnd = 0;
          let counterLines = 0;
          let carriageLines = 0;
          let carriageSymbol = 0;

          if ((lineBreak !== -1) || numberLines) {
            // делим на строки и находим курсор
            for (let counterStr = 0; counterStr < str.length; counterStr += 1) {
              if (counterStr === carriage) {
                carriageLines = counterLines - 1;
                carriageSymbol = counterCarriage;
              }

              counterCarriage += 1;

              // если встречается сивол новой строки, или строка шире чем поле, или конец строки
              if (str[counterStr] === '\n' || counterCarriage >= textAreaWidtn) {
                subStrEnd = counterStr + 1;
                objLines.push(str.slice(subStrStart, subStrEnd));
                subStrStart = counterStr + 1;
                counterLines += 1;
                counterCarriage = 0;
              }

              if (counterStr === (str.length - 1)) {
                objLines[counterLines] = str.slice(subStrStart);
              }
            }

            textArea.focus();
            textArea.selectionStart = carriage;
            textArea.selectionEnd = carriage;
          }

          let tempCount = 0;
          for (let i = 0; i < objLines.length; i += 1) {
            for (let j = 0; j < objLines[i].length; j += 1) {
              if (carriageLines === i && carriageSymbol === j) {
                carriage = tempCount;
              } else tempCount += 1;
            }
          }

          textArea.focus();

          textArea.selectionEnd = carriage;
          textArea.selectionStart = carriage;
        },
        false);
        break;
      }

      case 'buttonShiftRight': {
        this.button.addEventListener('mousedown', () => {
          if (isCapsLock) {
            letterCase = LOWER;
          } else {
            letterCase = UPPER;
          }

          for (let i = 0; i < KeyBoardLetters.length; i += 1) {
            KeyBoardLetters[i].changeName();
          }
        },
        false);

        this.button.addEventListener('mouseup', () => {
          if (isCapsLock) {
            letterCase = UPPER;
          } else {
            letterCase = LOWER;
          }

          for (let i = 0; i < KeyBoardLetters.length; i += 1) {
            KeyBoardLetters[i].changeName();
          }
        },
        false);
        break;
      }

      case 'buttonCtrlLeft': {
        this.button.addEventListener('mousedown', () => {
          isCtrl = true;
        },
        false);

        this.button.addEventListener('mouseup', () => {
          isCtrl = false;
        },
        false);
        break;
      }

      case 'buttonAltLeft': {
        this.button.addEventListener('mousedown', () => {
          isAlt = true;
        },
        false);

        this.button.addEventListener('mouseup', () => {
          isAlt = false;
        },
        false);
        break;
      }

      case 'buttonAltRight': {
        this.button.addEventListener('mousedown', () => {
          isAlt = true;
        },
        false);

        this.button.addEventListener('mouseup', () => {
          isAlt = false;
        },
        false);
        break;
      }

      case 'buttonArrowLeft': {
        this.button.addEventListener('click', () => {
          carriage = textArea.selectionEnd;
          textArea.focus();
          carriage -= 1;
          textArea.selectionEnd = carriage;
        },
        false);
        break;
      }

      case 'buttonArrowDown': {
        this.button.addEventListener('click', () => {
          /**
           * ширина символа данного шрифта и размера = 9px
           * вычисленно экспериментально: через ширину span с одним символом и display: inline-block
           * вычисляем сколько символов поместится в одной строке
           * берём поле ввода, вычитаем padding'и и делим на ширину символа
           */
          const textAreaWidtn = (textArea.scrollWidth - 20) / 9;
          const str = textArea.value;
          carriage = textArea.selectionEnd;

          // проверяем были ли переносы строки (используем трюк с побитовым НЕ)
          const lineBreak = str.indexOf('\n');

          // проверяем сколько примерно строк, если без переносов
          const numberLines = textAreaWidtn < str.length;

          // если были переносы или содержимое больше чем ширина одной строки
          const objLines = [];
          let counterCarriage = 0;
          let subStrStart = 0;
          let subStrEnd = 0;
          let counterLines = 0;
          let carriageLines = 0;
          let carriageSymbol = 0;

          if ((lineBreak !== -1) || numberLines) {
            // делим на строки и находим курсор
            for (let counterStr = 0; counterStr < str.length; counterStr += 1) {
              // console.log(str[counterStr]);

              if (counterStr === carriage) {
                carriageLines = counterLines + 1;
                carriageSymbol = counterCarriage;
              }
              counterCarriage += 1;

              // если встречается сивол новой строки, или строка шире чем поле, или конец строки
              if (str[counterStr] === '\n' || counterCarriage >= textAreaWidtn) {
                subStrEnd = counterStr + 1;
                objLines.push(str.slice(subStrStart, subStrEnd));
                subStrStart = counterStr + 1;
                counterLines += 1;
                counterCarriage = 0;
              }

              if (counterStr === (str.length - 1)) {
                objLines[counterLines] = str.slice(subStrStart);
              }
            }

            textArea.focus();
            textArea.selectionEnd = carriage;
            textArea.selectionStart = carriage;
          }

          let tempCount = 0;
          for (let i = 0; i < objLines.length; i += 1) {
            for (let j = 0; j < objLines[i].length; j += 1) {
              if (carriageLines === i && carriageSymbol === j) {
                carriage = tempCount;
              } else tempCount += 1;
            }
          }

          textArea.focus();
          textArea.selectionEnd = carriage;
          textArea.selectionStart = carriage;
        },
        false);
        break;
      }

      case 'buttonArrowRight': {
        this.button.addEventListener('click', () => {
          carriage = textArea.selectionEnd;
          textArea.focus();
          carriage += 1;
          textArea.selectionStart = carriage;
          textArea.selectionEnd = carriage;
        },
        false);
        break;
      }

      case 'buttonCtrlRigh': {
        this.button.addEventListener('mousedown', () => {
          isCtrl = true;
        },
        false);

        this.button.addEventListener('mouseup', () => {
          isCtrl = false;
        },
        false);
        break;
      }

      default: {
        this.button.addEventListener('click', () => {
          const strLength = textArea.value.length;
          carriage = textArea.selectionEnd;

          if (carriage === strLength) {
            textArea.value += this.button.innerHTML;
          } else {
            textArea.value = textArea.value.slice(0, carriage) +
            this.button.innerHTML + textArea.value.slice(carriage);
          }

          textArea.focus();
          carriage += 1;
          textArea.selectionEnd = carriage;
        },
        false);
        break;
      }
    }

    switch (buttonRow) {
      case 1: {
        keyboardRow1.append(this.button);
        break;
      }
      case 2: {
        keyboardRow2.append(this.button);
        break;
      }
      case 3: {
        keyboardRow3.append(this.button);
        break;
      }
      case 4: {
        keyboardRow4.append(this.button);
        break;
      }
      case 5: {
        keyboardRow5.append(this.button);
        break;
      }
      default: {
        keyboard.append(this.button);
        break;
      }
    }
  }

  getName() {
    return this.buttonName;
  }

  getText() {
    return this.button.innerHTML;
  }

  onclick() {
    if (this.buttonClass === 'button') {
      this.button.className = 'button button_hover';
    } else {
      this.button.className = 'button buttonControl buttonControl_hover';
    }
  }

  onkeyup() {
    if (this.button.className === 'button button_hover') {
      this.button.className = 'button';
    } else {
      this.button.className = 'button buttonControl';
    }
  }

  changeName() {
    if (lang === EN && letterCase === LOWER) {
      this.button.innerHTML = this.lowerEn;
    } else if (lang === EN && letterCase === UPPER) {
      this.button.innerHTML = this.upperEn;
    } else if (lang === RU && letterCase === LOWER) {
      this.button.innerHTML = this.lowerRu;
    } else if (lang === RU && letterCase === UPPER) {
      this.button.innerHTML = this.upperRu;
    }
  }

  printSymbol() {
    const strLength = textArea.value.length;
    carriage = textArea.selectionEnd;

    if (carriage === strLength) {
      textArea.value += this.button.innerHTML;
    } else {
      textArea.value = textArea.value.slice(0, carriage) +
       this.button.innerHTML + textArea.value.slice(carriage);
    }

    textArea.focus();
    carriage += 1;
    textArea.selectionEnd = carriage;
  }
}


let buttonBackquote = document.createElement('button');
buttonBackquote = new Button('`', '~', 'ё', 'Ё', buttonBackquote, 'buttonBackquote', 'button', 1);
KeyBoardLetters.push(buttonBackquote);

let button1 = document.createElement('button');
button1 = new Button('1', '!', '1', '!', button1, 'button1', 'button', 1);
KeyBoardLetters.push(button1);

let button2 = document.createElement('button');
button2 = new Button('2', '@', '2', '"', button2, 'button2', 'button', 1);
KeyBoardLetters.push(button2);

let button3 = document.createElement('button');
button3 = new Button('3', '#', '3', '№', button3, 'button3', 'button', 1);
KeyBoardLetters.push(button3);

let button4 = document.createElement('button');
button4 = new Button('4', '$', '4', ';', button4, 'button4', 'button', 1);
KeyBoardLetters.push(button4);

let button5 = document.createElement('button');
button5 = new Button('5', '%', '5', '%', button5, 'button5', 'button', 1);
KeyBoardLetters.push(button5);

let button6 = document.createElement('button');
button6 = new Button('6', '^', '6', ':', button6, 'button6', 'button', 1);
KeyBoardLetters.push(button6);

let button7 = document.createElement('button');
button7 = new Button('7', '&', '7', '?', button7, 'button7', 'button', 1);
KeyBoardLetters.push(button7);

let button8 = document.createElement('button');
button8 = new Button('8', '*', '8', '*', button8, 'button8', 'button', 1);
KeyBoardLetters.push(button8);

let button9 = document.createElement('button');
button9 = new Button('9', '(', '9', '(', button9, 'button9', 'button', 1);
KeyBoardLetters.push(button9);

let button0 = document.createElement('button');
button0 = new Button('0', ')', '0', ')', button0, 'button0', 'button', 1);
KeyBoardLetters.push(button0);

let buttonMinus = document.createElement('button');
buttonMinus = new Button('-', '_', '-', '_', buttonMinus, 'buttonMinus', 'button', 1);
KeyBoardLetters.push(buttonMinus);

let buttonEqual = document.createElement('button');
buttonEqual = new Button('=', '+', '=', '+', buttonEqual, 'buttonEqual', 'button', 1);
KeyBoardLetters.push(buttonEqual);

// - Backspace

let buttonBackspace = document.createElement('button');
buttonBackspace = new Button('Backspace', 'Backspace', 'Backspace', 'Backspace', buttonBackspace, 'buttonBackspace', 'button buttonControl', 1);
KeyBoardLetters.push(buttonBackspace);

// -- Tab

let buttonTab = document.createElement('button');
buttonTab = new Button('Tab', 'Tab', 'Tab', 'Tab', buttonTab, 'buttonTab', 'button buttonControl', 2);
KeyBoardLetters.push(buttonTab);

let buttonQ = document.createElement('button');
buttonQ = new Button('q', 'Q', 'й', 'Й', buttonQ, 'buttonQ', 'button', 2);
KeyBoardLetters.push(buttonQ);

let buttonW = document.createElement('button');
buttonW = new Button('w', 'W', 'ц', 'Ц', buttonW, 'buttonW', 'button', 2);
KeyBoardLetters.push(buttonW);

let buttonE = document.createElement('button');
buttonE = new Button('e', 'E', 'у', 'У', buttonE, 'buttonE', 'button', 2);
KeyBoardLetters.push(buttonE);

let buttonR = document.createElement('button');
buttonR = new Button('r', 'R', 'к', 'К', buttonR, 'buttonR', 'button', 2);
KeyBoardLetters.push(buttonR);

let buttonT = document.createElement('button');
buttonT = new Button('t', 'T', 'е', 'Е', buttonT, 'buttonT', 'button', 2);
KeyBoardLetters.push(buttonT);

let buttonY = document.createElement('button');
buttonY = new Button('y', 'Y', 'н', 'Н', buttonY, 'buttonY', 'button', 2);
KeyBoardLetters.push(buttonY);

let buttonU = document.createElement('button');
buttonU = new Button('u', 'U', 'г', 'Г', buttonU, 'buttonU', 'button', 2);
KeyBoardLetters.push(buttonU);

let buttonI = document.createElement('button');
buttonI = new Button('i', 'I', 'ш', 'Ш', buttonI, 'buttonI', 'button', 2);
KeyBoardLetters.push(buttonI);

let buttonO = document.createElement('button');
buttonO = new Button('o', 'O', 'щ', 'Щ', buttonO, 'buttonO', 'button', 2);
KeyBoardLetters.push(buttonO);

let buttonP = document.createElement('button');
buttonP = new Button('p', 'P', 'з', 'З', buttonP, 'buttonP', 'button', 2);
KeyBoardLetters.push(buttonP);

let buttonBracketLeft = document.createElement('button');
buttonBracketLeft = new Button('[', '{', 'х', 'Х', buttonBracketLeft, 'buttonBracketLeft', 'button', 2);
KeyBoardLetters.push(buttonBracketLeft);

let buttonBracketRight = document.createElement('button');
buttonBracketRight = new Button(']', '}', 'ъ', 'Ъ', buttonBracketRight, 'buttonBracketRight', 'button', 2);
KeyBoardLetters.push(buttonBracketRight);

let buttonBackslash = document.createElement('button');
buttonBackslash = new Button('\\', '|', '\\', '/', buttonBackslash, 'buttonBackslash', 'button', 2);
KeyBoardLetters.push(buttonBackslash);

// --- CapsLock

let buttonCapsLock = document.createElement('button');
buttonCapsLock = new Button('CapsLock', 'CapsLock', 'CapsLock', 'CapsLock', buttonCapsLock, 'buttonCapsLock', 'button buttonControl', 3);
KeyBoardLetters.push(buttonCapsLock);

let buttonA = document.createElement('button');
buttonA = new Button('a', 'A', 'ф', 'Ф', buttonA, 'buttonA', 'button', 3);
KeyBoardLetters.push(buttonA);

let buttonS = document.createElement('button');
buttonS = new Button('s', 'S', 'ы', 'Ы', buttonS, 'buttonS', 'button', 3);
KeyBoardLetters.push(buttonS);

let buttonD = document.createElement('button');
buttonD = new Button('d', 'D', 'в', 'В', buttonD, 'buttonD', 'button', 3);
KeyBoardLetters.push(buttonD);

let buttonF = document.createElement('button');
buttonF = new Button('f', 'F', 'а', 'А', buttonF, 'buttonF', 'button', 3);
KeyBoardLetters.push(buttonF);

let buttonG = document.createElement('button');
buttonG = new Button('g', 'G', 'п', 'П', buttonG, 'buttonG', 'button', 3);
KeyBoardLetters.push(buttonG);

let buttonH = document.createElement('button');
buttonH = new Button('h', 'H', 'р', 'Р', buttonH, 'buttonH', 'button', 3);
KeyBoardLetters.push(buttonH);

let buttonJ = document.createElement('button');
buttonJ = new Button('j', 'J', 'о', 'О', buttonJ, 'buttonJ', 'button', 3);
KeyBoardLetters.push(buttonJ);

let buttonK = document.createElement('button');
buttonK = new Button('k', 'K', 'л', 'Л', buttonK, 'buttonK', 'button', 3);
KeyBoardLetters.push(buttonK);

let buttonL = document.createElement('button');
buttonL = new Button('l', 'L', 'д', 'Д', buttonL, 'buttonL', 'button', 3);
KeyBoardLetters.push(buttonL);

let buttonSemicolon = document.createElement('button');
buttonSemicolon = new Button(';', ':', 'ж', 'Ж', buttonSemicolon, 'buttonSemicolon', 'button', 3);
KeyBoardLetters.push(buttonSemicolon);

let buttonQuote = document.createElement('button');
buttonQuote = new Button('\'', '"', 'э', 'Э', buttonQuote, 'buttonQuote', 'button', 3);
KeyBoardLetters.push(buttonQuote);

// --- Enter

let buttonEnter = document.createElement('button');
buttonEnter = new Button('Enter', 'Enter', 'Enter', 'Enter', buttonEnter, 'buttonEnter', 'button buttonControl', 3);
KeyBoardLetters.push(buttonEnter);

// ---- ShiftLeft

let buttonShiftLeft = document.createElement('button');
buttonShiftLeft = new Button('Shift', 'Shift', 'Shift', 'Shift', buttonShiftLeft, 'buttonShiftLeft', 'button buttonControl', 4);
KeyBoardLetters.push(buttonShiftLeft);

let buttonZ = document.createElement('button');
buttonZ = new Button('z', 'Z', 'я', 'Я', buttonZ, 'buttonZ', 'button', 4);
KeyBoardLetters.push(buttonZ);

let buttonX = document.createElement('button');
buttonX = new Button('x', 'X', 'ч', 'Ч', buttonX, 'buttonX', 'button', 4);
KeyBoardLetters.push(buttonX);

let buttonC = document.createElement('button');
buttonC = new Button('c', 'C', 'с', 'С', buttonC, 'buttonC', 'button', 4);
KeyBoardLetters.push(buttonC);

let buttonV = document.createElement('button');
buttonV = new Button('v', 'V', 'м', 'М', buttonV, 'buttonV', 'button', 4);
KeyBoardLetters.push(buttonV);

let buttonB = document.createElement('button');
buttonB = new Button('b', 'B', 'и', 'И', buttonB, 'buttonB', 'button', 4);
KeyBoardLetters.push(buttonB);

let buttonN = document.createElement('button');
buttonN = new Button('n', 'N', 'т', 'Т', buttonN, 'buttonN', 'button', 4);
KeyBoardLetters.push(buttonN);

let buttonM = document.createElement('button');
buttonM = new Button('m', 'M', 'ь', 'Ь', buttonM, 'buttonM', 'button', 4);
KeyBoardLetters.push(buttonM);

let buttonComma = document.createElement('button');
buttonComma = new Button(',', '<', 'б', 'Б', buttonComma, 'buttonComma', 'button', 4);
KeyBoardLetters.push(buttonComma);

let buttonPeriod = document.createElement('button');
buttonPeriod = new Button('.', '>', 'ю', 'Ю', buttonPeriod, 'buttonPeriod', 'button', 4);
KeyBoardLetters.push(buttonPeriod);

let buttonSlash = document.createElement('button');
buttonSlash = new Button('/', '?', '.', ',', buttonSlash, 'buttonSlash', 'button', 4);
KeyBoardLetters.push(buttonSlash);

// ---- ArrowUp buttonControl

let buttonArrowUp = document.createElement('button');
buttonArrowUp = new Button('&uarr;', '&uarr;', '&uarr;', '&uarr;', buttonArrowUp, 'buttonArrowUp', 'button buttonControl', 4);
KeyBoardLetters.push(buttonArrowUp);

// ---- ShiftRight

let buttonShiftRight = document.createElement('button');
buttonShiftRight = new Button('Shift', 'Shift', 'Shift', 'Shift', buttonShiftRight, 'buttonShiftRight', 'button buttonControl', 4);
KeyBoardLetters.push(buttonShiftRight);

// ----- ctrl win alt Space AltRight ArrowLeft ArrowDown ArrowRight Ctrl

let buttonCtrlLeft = document.createElement('button');
buttonCtrlLeft = new Button('Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', buttonCtrlLeft, 'buttonCtrlLeft', 'button buttonControl', 5);
KeyBoardLetters.push(buttonCtrlLeft);

let buttonMetaLeft = document.createElement('button');
buttonMetaLeft = new Button('Win', 'Win', 'Win', 'Win', buttonMetaLeft, 'buttonMetaLeft', 'button buttonControl', 5);
KeyBoardLetters.push(buttonMetaLeft);

let buttonAltLeft = document.createElement('button');
buttonAltLeft = new Button('Alt', 'Alt', 'Alt', 'Alt', buttonAltLeft, 'buttonAltLeft', 'button buttonControl', 5);
KeyBoardLetters.push(buttonAltLeft);

let buttonSpace = document.createElement('button');
buttonSpace = new Button(' ', ' ', ' ', ' ', buttonSpace, 'buttonSpace', 'button', 5);
KeyBoardLetters.push(buttonSpace);

let buttonAltRight = document.createElement('button');
buttonAltRight = new Button('Alt', 'Alt', 'Alt', 'Alt', buttonAltRight, 'buttonAltRight', 'button buttonControl', 5);
KeyBoardLetters.push(buttonAltRight);

//

let buttonArrowLeft = document.createElement('button');
buttonArrowLeft = new Button('&larr;', '&larr;', '&larr;', '&larr;', buttonArrowLeft, 'buttonArrowLeft', 'button buttonControl', 5);
KeyBoardLetters.push(buttonArrowLeft);

let buttonArrowDown = document.createElement('button');
buttonArrowDown = new Button('&darr;', '&darr;', '&darr;', '&darr;', buttonArrowDown, 'buttonArrowDown', 'button buttonControl', 5);
KeyBoardLetters.push(buttonArrowDown);

let buttonArrowRight = document.createElement('button');
buttonArrowRight = new Button('&rarr;', '&rarr;', '&rarr;', '&rarr;', buttonArrowRight, 'buttonArrowRight', 'button buttonControl', 5);
KeyBoardLetters.push(buttonArrowRight);

let buttonCtrlRigh = document.createElement('button');
buttonCtrlRigh = new Button('Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', buttonCtrlRigh, 'buttonCtrlRigh', 'button buttonControl', 5);
KeyBoardLetters.push(buttonCtrlRigh);
