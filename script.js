const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this._previousOperandTextElement = previousOperandTextElement;
    this._currentOperandTextElement = currentOperandTextElement;

    // при создании калькулятора установим первоначальные значения
    this.clear();
  }

  clear() {
    this._currentOperand = '';
    this._previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this._currentOperand = this._currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    // чтоб не ввели две точки
    if (number === '.' && this._currentOperand.includes('.')) return;
    this._currentOperand = this._currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    // если текущий значение не выбрано - ниче не делаем
    if (this._currentOperand === '') return;

    if (this._previousOperand !== '') {
      this.compute()
    }
    this.operation = operation;
    // при выборе операции - переносим текущее значение в предыдущее
    this._previousOperand = this._currentOperand;
    this._currentOperand = '';
  }

  compute() {
    let result;
    const previous = parseFloat(this._previousOperand);
    const current = parseFloat(this._currentOperand);
    // если нет предыдущего значения или текущего значения - не выполняем
    if (isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        result = previous + current;
        break;
      case '-':
        result = previous - current;
        break;
      case '*':
        result = previous * current;
        break;
      case '÷':
        result = previous / current;
        break;
      default:
        return;
    }
    // присваиваем результат вычисления текущему значению
    this._currentOperand = result;
    this.operation = undefined;
    this._previousOperand = '';
  }


  // выводим актуальное значение на экран после каждого нажатия кнопки
  updateDisplay() {
    this._currentOperandTextElement.textContent = this._currentOperand;


    // включим отображение текущей операции
    if (this.operation != null) {
      this._previousOperandTextElement.textContent =
        `${this._previousOperand} ${this.operation}`;

    }
  }
}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// походимся по кнопкам и вешаем слушатели
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.textContent);
    calculator.updateDisplay();
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.textContent);
    calculator.updateDisplay();
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})