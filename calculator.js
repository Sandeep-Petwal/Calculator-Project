document.addEventListener('DOMContentLoaded', function () {
  let inputText = '';
  let logText = '';

  function updateScreen() {
    document.querySelector('.input').textContent = inputText;
    document.querySelector('.log').textContent = logText;
  }

  function clearLog() {
    logText = '';
    updateScreen();
  }

  function getValue(value) {
    if (value === 'C') {
      inputText = '';
      clearLog();
    } else if (value === '<') {
      inputText = inputText.slice(0, -1);
    } else {
      if (inputText.length < 10) {
        inputText += value;
      }
    }

    updateScreen();
  }

  function result() {
    // clearLog();
    try {
      const sanitizedInput = inputText.replace(/[^-()\d/*+.]/g, '');
      const resultValue = new Function('return ' + sanitizedInput)();
      logText = inputText;
      inputText = resultValue.toString().slice(0, 12);
    } catch (error) {
      logText = 'Error';
    }

    updateScreen();
  }

  // Attach event listeners to each button
  document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', function () {
      const buttonValue = this.textContent;
      if (buttonValue === '=') {
        result();
      } else if (buttonValue === '⌫') {
        getValue('<');
      } else {
        getValue(buttonValue);
      }
    });
  });

  // Add event listener for keyboard input
  document.addEventListener('keydown', function (event) {
    const key = event.key;
    if (/^[0-9C+\-*/.]$/.test(key) || (key === 'Enter' && inputText !== '')) {
      event.preventDefault();
      if (key === 'Enter') {
        result();
      } else if (key === 'Backspace') {
        getValue('<');
      } else {
        getValue(key);
      }
    }
  });
});
