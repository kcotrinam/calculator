const display = document.querySelector('#diisplay');
const prevNumberDisplay = document.querySelector('#prev-number');
const currentNumber = document.querySelector('#current-number');

const numberButtons = [...document.querySelectorAll('.btn-number')];
const functionButtons = [...document.querySelectorAll('.btn-function')];
const cleannerFunction = [...document.querySelectorAll('.cleanner-function')];
const equal = document.querySelector('#equal');

let numOnDisplay = '';
let prevNumber = '';
let operator;

numberButtons.forEach((button) => {
  button.addEventListener('click', (e) =>
    showCurrentNumber(e.target.innerHTML)
  );
});

functionButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    showPrevNumber(e.target.innerText);
  });
});

window.addEventListener('keyup', (e) => {
  if (Number(e.key) || e.key == '.') {
    showCurrentNumber(e.key);
  } else if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') {
    showPrevNumber(e.key);
  } else if (e.key == 'Backspace' || e.key == 'Escape') {
    cleanDisplay(e.key);
  }
});

const showCurrentNumber = (pressedNumber) => {
  if (numOnDisplay.length < 9) {
    currentNumber.innerHTML += pressedNumber;
    numOnDisplay += pressedNumber;
  }
};

const showPrevNumber = (pressedNumber) => {
  prevNumber = numOnDisplay;
  currentNumber.textContent = '';
  prevNumberDisplay.textContent = numOnDisplay;
  prevNumberDisplay.innerHTML += pressedNumber;
  operator = pressedNumber;
  numOnDisplay = '';
};

equal.addEventListener('click', () => {
  let tempNumber1 = Number(numOnDisplay);
  let tempNumber2 = Number(prevNumber);

  operate(operator, tempNumber1, tempNumber2);
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    let tempNumber1 = Number(numOnDisplay);
    let tempNumber2 = Number(prevNumber);

    operate(operator, tempNumber1, tempNumber2);
  }
});

const addition = (a, b) => {
  prevNumberDisplay.textContent = `${b} ${operator} ${a}`;
  currentNumber.textContent = b + a;
  numOnDisplay = b + a;
};

const substruction = (a, b) => {
  if (b > a) {
    prevNumberDisplay.textContent = `${b} ${operator} ${a}`;
    currentNumber.textContent = b - a;
    numOnDisplay = b - a;
  }
};
const multiply = (a, b) => {
  prevNumberDisplay.textContent = `${b} ${operator} ${a}`;
  currentNumber.textContent = b * a;
  numOnDisplay = b * a;
};

const divide = (a, b) => {
  if (a < b && b !== 0) {
    prevNumberDisplay.textContent = `${b} ${operator} ${a}`;
    currentNumber.textContent = b / a;
    numOnDisplay = b / a;
  } else {
    console.log("can't be divded");
  }
};

const operate = (op, tempNumber1, tempNumber2) => {
  switch (op) {
    case '+':
      return addition(tempNumber1, tempNumber2);
    case '-':
      return substruction(tempNumber1, tempNumber2);
    case 'x':
      return multiply(tempNumber1, tempNumber2);
    case '*':
      return multiply(tempNumber1, tempNumber2);
    case '/':
      return divide(tempNumber1, tempNumber2);
  }
};

cleannerFunction.forEach((button) => {
  button.addEventListener('click', (e) => {
    cleanDisplay(e.target.id);
  });
});

const cleanDisplay = (e) => {
  let selectedButton = e;
  if (selectedButton == 'Escape') {
    prevNumberDisplay.textContent = '';
    currentNumber.textContent = '';
    numOnDisplay = '';
    prevNumber = '';
    operator = '';
  } else {
    let tempArray = [...numOnDisplay];
    tempArray.pop();
    currentNumber.textContent = tempArray.toString();
    numOnDisplay = tempArray.toString();
  }
};
