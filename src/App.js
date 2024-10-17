import React, { useState } from 'react';
import './App.css';

function App() {
  const [displayValue, setDisplayValue] = useState('0'); // значение, которое отображается на экране
  const [firstValue, setFirstValue] = useState(null);    // первое введенное число
  const [operator, setOperator] = useState(null);        // текущий оператор (+, -, *, /)
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false); // флаг для ввода второго числа

  // Функция обработки нажатия кнопки
  const handleButtonClick = (value) => {
    if (!isNaN(value)) { // если нажата цифра
      handleNumber(value);
    } else {
      handleOperator(value);
    }
  };

  // Функция обработки нажатия цифры
  const handleNumber = (value) => {
    if (waitingForSecondValue) {
      setDisplayValue(value);
      setWaitingForSecondValue(false);
    } else {
      setDisplayValue(displayValue === '0' ? value : displayValue + value);
    }
  };

  // Функция обработки операторов
  const handleOperator = (value) => {
    if (value === 'AC') {
      resetCalculator();
    } else if (value === '=') {
      if (operator && firstValue !== null) {
        const result = calculate(firstValue, displayValue, operator);
        setDisplayValue(String(result));
        setFirstValue(result);
        setOperator(null);
        setWaitingForSecondValue(true);
      }
    } else {
      if (firstValue === null) {
        setFirstValue(displayValue);
      } else if (operator) {
        const result = calculate(firstValue, displayValue, operator);
        setDisplayValue(String(result));
        setFirstValue(result);
      }
      setOperator(value);
      setWaitingForSecondValue(true);
    }
  };

  // Функция вычислений
  const calculate = (first, second, operator) => {
    const firstNum = parseFloat(first);
    const secondNum = parseFloat(second);

    if (operator === '+') return firstNum + secondNum;
    if (operator === '-') return firstNum - secondNum;
    if (operator === '×') return firstNum * secondNum;
    if (operator === '÷') return firstNum / secondNum;
    return secondNum;
  };

  // Функция сброса калькулятора
  const resetCalculator = () => {
    setDisplayValue('0');
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecondValue(false);
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">{displayValue}</div>
        <div className="buttons">
          {['AC', '+/-', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((btn, index) => (
            <button key={index} onClick={() => handleButtonClick(btn)}>{btn}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
