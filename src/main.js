// Get all required html by their respective IDs
const passwordResultEl = document.getElementById('password-result');
const passwordLengthEl = document.getElementById('password-length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const digitsEl = document.getElementById('digits');
const symbolsEl = document.getElementById('symbols');
const generateBtnEl = document.getElementById('submit-btn');
const clipboardEl = document.getElementById('clipboard');

// MAke a randomFunction object with the generated functions
const randomFunction = {
  lower: randomLower,
  upper: randomUpper,
  number: randomNumber,
  symbol: randomSymbols
}

// Add click event listener to the clipboard to copy the password
clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = passwordResultEl.innerText;

  // For empty password
  if (!password) { return; }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Password copied to clipboard');
});

//  Add a click event listener to the generate button
generateBtnEl.addEventListener('click', () => {
  event.preventDefault()
  const length = passwordLengthEl.value;
  const hasUpper = uppercaseEl.checked;
  const hasLower = lowercaseEl.checked;
  const hasDigits = digitsEl.checked;
  const hasSymbol = symbolsEl.checked;

  // Assign the generated password to the password result element
  passwordResultEl.innerText = generatePassword(hasLower, hasUpper, hasDigits, hasSymbol, length)
});

// This function generates a random password
function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = '';

  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

  if (typesCount === 0) {
    return '';
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunction[funcName]();
    });
  }
  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

function randomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function randomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function randomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function randomSymbols() {
  const specialCharacters = '!#$%&()*+,-/:;<=>?@[\]^_{|}~'
  return specialCharacters[Math.floor(Math.random() * specialCharacters.length)]
}

