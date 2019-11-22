const EN = 'en';
const RU = 'ru';
const LOWER = 'lower';
const UPPER = 'upper';
const KeyBoardLetters = [];

let isCtrl = false;
let isAlt = false;
let isCapsLock = false;
let letterCase = LOWER;
let carriage = 0;
let lang;

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

for (let countKeyboardRow = 0; countKeyboardRow < 5; countKeyboardRow += 1) {
  const keyboardRow = document.createElement('div');
  keyboardRow.className = 'keyboardRow';
  keyboard.append(keyboardRow);
}

if (localStorage.getItem('lang') === null) {
  localStorage.setItem('lang', EN);
} else {
  lang = localStorage.getItem('lang');
}


/* функция распределения клавиш */
function keyBoardRows(numberRow) {
  const rowList = document.getElementsByClassName('keyboardRow');
  return rowList[numberRow];
}


/* создание клавиш */
for (let countButton = 0; countButton < buttonList.length; countButton += 1) {
  let buttonTemp = document.createElement('button');
  buttonTemp = new Button(buttonList[countButton][0], buttonList[countButton][1], buttonList[countButton][2], buttonList[countButton][3], buttonTemp, buttonList[countButton][4], buttonList[countButton][5], buttonList[countButton][6]);
  KeyBoardLetters.push(buttonTemp);
}