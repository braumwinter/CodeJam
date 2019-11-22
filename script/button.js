
function KeyDownButton(buttonName) {
  for (let i = 0; i < KeyBoardLetters.length; i += 1) {
    if (KeyBoardLetters[i].getName() === buttonName) {
      KeyBoardLetters[i].onclick();
      break;
    }
  }
}

function KeyUpButton(buttonName) {
  for (let i = 0; i < KeyBoardLetters.length; i += 1) {
    if (KeyBoardLetters[i].getName() === buttonName) {
      KeyBoardLetters[i].onkeyup();
      break;
    }
  }
}

function PrintSimbol(buttonName) {
  switch (buttonName) {
    case 'buttonBackspace': {
      const strLength = textArea.value.length;
      carriage = textArea.selectionEnd;
      if (carriage !== 0) {
        if (carriage === strLength) {
          textArea.value = textArea.value.slice(0, -1);
        } else {
          textArea.value = textArea.value.slice(0, carriage - 1) + textArea.value.slice(carriage);
        }
      }

      textArea.focus();

      if (carriage < 1) {
        carriage = 0;
      } else {
        carriage -= 1;
      }

      textArea.selectionEnd = carriage;
      break;
    }
    case 'buttonEnter': {
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
      break;
    }

    case 'buttonTab': {
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
      break;
    }

    default: {
      for (let i = 0; i < KeyBoardLetters.length; i += 1) {
        if (KeyBoardLetters[i].getName() === buttonName) {
          KeyBoardLetters[i].printSymbol();
          break;
        }
      }
      break;
    }
  }
}

function ArrowLeft() {
  carriage = textArea.selectionEnd;
  textArea.focus();
  carriage -= 1;
  textArea.selectionEnd = carriage;
}

function ArrowRight() {
  carriage = textArea.selectionEnd;
  textArea.focus();
  carriage += 1;
  textArea.selectionStart = carriage;
  textArea.selectionEnd = carriage;
}

function CapsLock() {
  isCapsLock = !isCapsLock;

  if (isCapsLock) {
    letterCase = UPPER;
  } else {
    letterCase = LOWER;
  }

  for (let i = 0; i < KeyBoardLetters.length; i += 1) {
    KeyBoardLetters[i].changeName();
  }
}

function ShiftDown() {
  if (isCapsLock) {
    letterCase = LOWER;
  } else {
    letterCase = UPPER;
  }

  for (let i = 0; i < KeyBoardLetters.length; i += 1) {
    KeyBoardLetters[i].changeName();
  }
}

function ShiftUp() {
  if (isCapsLock) {
    letterCase = UPPER;
  } else {
    letterCase = LOWER;
  }

  for (let i = 0; i < KeyBoardLetters.length; i += 1) {
    KeyBoardLetters[i].changeName();
  }
}

function ChangeLang() {
  if (isCtrl && isAlt) {
    if (localStorage.getItem('lang') === EN) {
      localStorage.setItem('lang', RU);
      lang = RU;
    } else if (localStorage.getItem('lang') === RU) {
      localStorage.setItem('lang', EN);
      lang = EN;
    }

    for (let i = 0; i < KeyBoardLetters.length; i += 1) {
      KeyBoardLetters[i].changeName();
    }
  }
}


document.addEventListener('keydown', (event) => {
  const keyCode = event.code;
  const keyNumber = event.keyCode;

  if (keyNumber === 8 || keyNumber === 9 || keyNumber === 13 || keyNumber === 39) {
    event.preventDefault();
  } else if (keyNumber >= 16 && keyNumber <= 20) {
    event.preventDefault();
  } else if (keyNumber >= 32 && keyNumber <= 37) {
    event.preventDefault();
  } else if (keyNumber >= 48 && keyNumber <= 57) {
    event.preventDefault();
  } else if (keyNumber >= 65 && keyNumber <= 93) {
    event.preventDefault();
  } else if (keyNumber >= 186 && keyNumber <= 193) {
    event.preventDefault();
  } else if (keyNumber >= 219 && keyNumber <= 222) {
    event.preventDefault();
  }

  switch (keyCode) {
    case 'Backquote': {
      KeyDownButton('buttonBackquote');
      PrintSimbol('buttonBackquote');
      break;
    }

    case 'Digit1': {
      KeyDownButton('button1');
      PrintSimbol('button1');
      break;
    }

    case 'Digit2': {
      KeyDownButton('button2');
      PrintSimbol('button2');
      break;
    }

    case 'Digit3': {
      KeyDownButton('button3');
      PrintSimbol('button3');
      break;
    }

    case 'Digit4': {
      KeyDownButton('button4');
      PrintSimbol('button4');
      break;
    }

    case 'Digit5': {
      KeyDownButton('button5');
      PrintSimbol('button5');
      break;
    }

    case 'Digit6': {
      KeyDownButton('button6');
      PrintSimbol('button6');
      break;
    }

    case 'Digit7': {
      KeyDownButton('button7');
      PrintSimbol('button7');
      break;
    }

    case 'Digit8': {
      KeyDownButton('button8');
      PrintSimbol('button8');
      break;
    }

    case 'Digit9': {
      KeyDownButton('button9');
      PrintSimbol('button9');
      break;
    }

    case 'Digit0': {
      KeyDownButton('button0');
      PrintSimbol('button0');
      break;
    }

    case 'Minus': {
      KeyDownButton('buttonMinus');
      PrintSimbol('buttonMinus');
      break;
    }

    case 'Equal': {
      KeyDownButton('buttonEqual');
      PrintSimbol('buttonEqual');
      break;
    }

    case 'Backspace': {
      KeyDownButton('buttonBackspace');
      PrintSimbol('buttonBackspace');
      break;
    }

    case 'Tab': {
      KeyDownButton('buttonTab');
      PrintSimbol('buttonTab');
      break;
    }

    case 'KeyQ': {
      KeyDownButton('buttonQ');
      PrintSimbol('buttonQ');
      break;
    }

    case 'KeyW': {
      KeyDownButton('buttonW');
      PrintSimbol('buttonW');
      break;
    }

    case 'KeyE': {
      KeyDownButton('buttonE');
      PrintSimbol('buttonE');
      break;
    }

    case 'KeyR': {
      KeyDownButton('buttonR');
      PrintSimbol('buttonR');
      break;
    }

    case 'KeyT': {
      KeyDownButton('buttonT');
      PrintSimbol('buttonT');
      break;
    }

    case 'KeyY': {
      KeyDownButton('buttonY');
      PrintSimbol('buttonY');
      break;
    }

    case 'KeyU': {
      KeyDownButton('buttonU');
      PrintSimbol('buttonU');
      break;
    }

    case 'KeyI': {
      KeyDownButton('buttonI');
      PrintSimbol('buttonI');
      break;
    }

    case 'KeyO': {
      KeyDownButton('buttonO');
      PrintSimbol('buttonO');
      break;
    }

    case 'KeyP': {
      KeyDownButton('buttonP');
      PrintSimbol('buttonP');
      break;
    }

    case 'BracketLeft': {
      KeyDownButton('buttonBracketLeft');
      PrintSimbol('buttonBracketLeft');
      break;
    }

    case 'BracketRight': {
      KeyDownButton('buttonBracketRight');
      PrintSimbol('buttonBracketRight');
      break;
    }

    case 'Backslash': {
      KeyDownButton('buttonBackslash');
      PrintSimbol('buttonBackslash');
      break;
    }

    case 'CapsLock': {
      KeyDownButton('buttonCapsLock');
      CapsLock();
      break;
    }

    case 'KeyA': {
      KeyDownButton('buttonA');
      PrintSimbol('buttonA');
      break;
    }

    case 'KeyS': {
      KeyDownButton('buttonS');
      PrintSimbol('buttonS');
      break;
    }

    case 'KeyD': {
      KeyDownButton('buttonD');
      PrintSimbol('buttonD');
      break;
    }

    case 'KeyF': {
      KeyDownButton('buttonF');
      PrintSimbol('buttonF');
      break;
    }

    case 'KeyG': {
      KeyDownButton('buttonG');
      PrintSimbol('buttonG');
      break;
    }

    case 'KeyH': {
      KeyDownButton('buttonH');
      PrintSimbol('buttonH');
      break;
    }

    case 'KeyJ': {
      KeyDownButton('buttonJ');
      PrintSimbol('buttonJ');
      break;
    }

    case 'KeyK': {
      KeyDownButton('buttonK');
      PrintSimbol('buttonK');
      break;
    }

    case 'KeyL': {
      KeyDownButton('buttonL');
      PrintSimbol('buttonL');
      break;
    }

    case 'Semicolon': {
      KeyDownButton('buttonSemicolon');
      PrintSimbol('buttonSemicolon');
      break;
    }

    case 'Quote': {
      KeyDownButton('buttonQuote');
      PrintSimbol('buttonQuote');
      break;
    }

    case 'Enter': {
      KeyDownButton('buttonEnter');
      PrintSimbol('buttonEnter');
      break;
    }

    case 'ShiftLeft': {
      KeyDownButton('buttonShiftLeft');
      ShiftDown();
      break;
    }

    case 'KeyZ': {
      KeyDownButton('buttonZ');
      PrintSimbol('buttonZ');
      break;
    }

    case 'KeyX': {
      KeyDownButton('buttonX');
      PrintSimbol('buttonX');
      break;
    }

    case 'KeyC': {
      KeyDownButton('buttonC');
      PrintSimbol('buttonC');
      break;
    }

    case 'KeyV': {
      KeyDownButton('buttonV');
      PrintSimbol('buttonV');
      break;
    }

    case 'KeyB': {
      KeyDownButton('buttonB');
      PrintSimbol('buttonB');
      break;
    }

    case 'KeyN': {
      KeyDownButton('buttonN');
      PrintSimbol('buttonN');
      break;
    }

    case 'KeyM': {
      KeyDownButton('buttonM');
      PrintSimbol('buttonM');
      break;
    }

    case 'Comma': {
      KeyDownButton('buttonComma');
      PrintSimbol('buttonComma');
      break;
    }

    case 'Period': {
      KeyDownButton('buttonPeriod');
      PrintSimbol('buttonPeriod');
      break;
    }

    case 'Slash': {
      KeyDownButton('buttonSlash');
      PrintSimbol('buttonSlash');
      break;
    }

    case 'ArrowUp': {
      KeyDownButton('buttonArrowUp');
      break;
    }

    case 'ShiftRight': {
      KeyDownButton('buttonShiftRight');
      ShiftDown();
      break;
    }

    case 'ControlLeft': {
      isCtrl = true;
      KeyDownButton('buttonCtrlLeft');
      ChangeLang();
      break;
    }

    case 'MetaLeft': {
      KeyDownButton('buttonMetaLeft');
      break;
    }

    case 'AltLeft': {
      isAlt = true;
      KeyDownButton('buttonAltLeft');
      ChangeLang();
      break;
    }

    case 'Space': {
      KeyDownButton('buttonSpace');
      PrintSimbol('buttonSpace');
      break;
    }

    case 'AltRight': {
      isAlt = true;
      KeyDownButton('buttonAltRight');
      ChangeLang();
      break;
    }

    case 'ArrowLeft': {
      KeyDownButton('buttonArrowLeft');
      ArrowLeft();
      break;
    }

    case 'ArrowDown': {
      KeyDownButton('buttonArrowDown');
      break;
    }

    case 'ArrowRight': {
      KeyDownButton('buttonArrowRight');
      ArrowRight();
      break;
    }

    case 'ControlRight': {
      isCtrl = true;
      KeyDownButton('buttonCtrlRigh');
      ChangeLang();
      break;
    }

    default:
      break;
  }
}, false);

document.addEventListener('keyup', (event) => {
  const keyCode = event.code;

  switch (keyCode) {
    case 'Backquote': {
      KeyUpButton('buttonBackquote');
      break;
    }

    case 'Digit1': {
      KeyUpButton('button1');
      break;
    }

    case 'Digit2': {
      KeyUpButton('button2');
      break;
    }

    case 'Digit3': {
      KeyUpButton('button3');
      break;
    }

    case 'Digit4': {
      KeyUpButton('button4');
      break;
    }

    case 'Digit5': {
      KeyUpButton('button5');
      break;
    }

    case 'Digit6': {
      KeyUpButton('button6');
      break;
    }

    case 'Digit7': {
      KeyUpButton('button7');
      break;
    }

    case 'Digit8': {
      KeyUpButton('button8');
      break;
    }

    case 'Digit9': {
      KeyUpButton('button9');
      break;
    }

    case 'Digit0': {
      KeyUpButton('button0');
      break;
    }

    case 'Minus': {
      KeyUpButton('buttonMinus');
      break;
    }

    case 'Equal': {
      KeyUpButton('buttonEqual');
      break;
    }

    case 'Backspace': {
      KeyUpButton('buttonBackspace');
      break;
    }

    case 'Tab': {
      KeyUpButton('buttonTab');
      break;
    }

    case 'KeyQ': {
      KeyUpButton('buttonQ');
      break;
    }

    case 'KeyW': {
      KeyUpButton('buttonW');
      break;
    }

    case 'KeyE': {
      KeyUpButton('buttonE');
      break;
    }

    case 'KeyR': {
      KeyUpButton('buttonR');
      break;
    }

    case 'KeyT': {
      KeyUpButton('buttonT');
      break;
    }

    case 'KeyY': {
      KeyUpButton('buttonY');
      break;
    }

    case 'KeyU': {
      KeyUpButton('buttonU');
      break;
    }

    case 'KeyI': {
      KeyUpButton('buttonI');
      break;
    }

    case 'KeyO': {
      KeyUpButton('buttonO');
      break;
    }

    case 'KeyP': {
      KeyUpButton('buttonP');
      break;
    }

    case 'BracketLeft': {
      KeyUpButton('buttonBracketLeft');
      break;
    }
    case 'BracketRight': {
      KeyUpButton('buttonBracketRight');
      break;
    }

    case 'Backslash': {
      KeyUpButton('buttonBackslash');
      break;
    }

    case 'CapsLock': {
      KeyUpButton('buttonCapsLock');
      break;
    }

    case 'KeyA': {
      KeyUpButton('buttonA');
      break;
    }

    case 'KeyS': {
      KeyUpButton('buttonS');
      break;
    }

    case 'KeyD': {
      KeyUpButton('buttonD');
      break;
    }

    case 'KeyF': {
      KeyUpButton('buttonF');
      break;
    }

    case 'KeyG': {
      KeyUpButton('buttonG');
      break;
    }

    case 'KeyH': {
      KeyUpButton('buttonH');
      break;
    }

    case 'KeyJ': {
      KeyUpButton('buttonJ');
      break;
    }

    case 'KeyK': {
      KeyUpButton('buttonK');
      break;
    }

    case 'KeyL': {
      KeyUpButton('buttonL');
      break;
    }

    case 'Semicolon': {
      KeyUpButton('buttonSemicolon');
      break;
    }

    case 'Quote': {
      KeyUpButton('buttonQuote');
      break;
    }

    case 'Enter': {
      KeyUpButton('buttonEnter');
      break;
    }

    case 'ShiftLeft': {
      KeyUpButton('buttonShiftLeft');
      ShiftUp();
      break;
    }

    case 'KeyZ': {
      KeyUpButton('buttonZ');
      break;
    }

    case 'KeyX': {
      KeyUpButton('buttonX');
      break;
    }

    case 'KeyC': {
      KeyUpButton('buttonC');
      break;
    }

    case 'KeyV': {
      KeyUpButton('buttonV');
      break;
    }

    case 'KeyB': {
      KeyUpButton('buttonB');
      break;
    }

    case 'KeyN': {
      KeyUpButton('buttonN');
      break;
    }

    case 'KeyM': {
      KeyUpButton('buttonM');
      break;
    }

    case 'Comma': {
      KeyUpButton('buttonComma');
      break;
    }

    case 'Period': {
      KeyUpButton('buttonPeriod');
      break;
    }

    case 'Slash': {
      KeyUpButton('buttonSlash');
      break;
    }

    case 'ArrowUp': {
      KeyUpButton('buttonArrowUp');
      break;
    }

    case 'ShiftRight': {
      KeyUpButton('buttonShiftRight');
      ShiftUp();
      break;
    }

    case 'ControlLeft': {
      isCtrl = false;
      KeyUpButton('buttonCtrlLeft');
      break;
    }

    case 'MetaLeft': {
      KeyUpButton('buttonMetaLeft');
      break;
    }

    case 'AltLeft': {
      isAlt = false;
      KeyUpButton('buttonAltLeft');
      break;
    }

    case 'Space': {
      KeyUpButton('buttonSpace');
      break;
    }

    case 'AltRight': {
      isAlt = false;
      KeyUpButton('buttonAltRight');
      break;
    }

    case 'ArrowLeft': {
      KeyUpButton('buttonArrowLeft');
      break;
    }

    case 'ArrowDown': {
      KeyUpButton('buttonArrowDown');
      break;
    }

    case 'ArrowRight': {
      KeyUpButton('buttonArrowRight');
      break;
    }

    case 'ControlRight': {
      isCtrl = false;
      KeyUpButton('buttonCtrlRigh');
      break;
    }

    default:
      break;
  }
}, false);
