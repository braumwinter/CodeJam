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
            textArea.value = `${textArea.value.slice(0, carriage)}\n${textArea.value.slice(carriage)}`;
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

          // проверяем были ли переносы строки
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

          // проверяем были ли переносы строки
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

    keyBoardRows(buttonRow).append(this.button);
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
