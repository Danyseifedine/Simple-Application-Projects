const passwordEl = document.getElementById('password');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const strengthEl = document.getElementById('strength');
const excludeSimilarEl = document.getElementById('exclude-similar');
const excludeAmbiguousEl = document.getElementById('exclude-ambiguous');
const minNumbersEl = document.getElementById('min-numbers');
const minSymbolsEl = document.getElementById('min-symbols');
const noRepeatingEl = document.getElementById('no-repeating');
const beginWithLetterEl = document.getElementById('begin-with-letter');
const passwordHistoryEl = document.getElementById('password-history');

// Character sets
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const similarChars = 'iIlL1oO0';
const ambiguousChars = '{}[]()/\'"`~,;:.<>';

// Password history
let passwordHistory = [];

// Generate password
function generatePassword() {
    let chars = '';
    let password = '';
    let requiredChars = '';

    if (uppercaseEl.checked) chars += uppercaseChars;
    if (lowercaseEl.checked) chars += lowercaseChars;
    if (numbersEl.checked) chars += numberChars;
    if (symbolsEl.checked) chars += symbolChars;

    if (excludeSimilarEl.checked) {
        chars = chars.split('').filter(char => !similarChars.includes(char)).join('');
    }

    if (excludeAmbiguousEl.checked) {
        chars = chars.split('').filter(char => !ambiguousChars.includes(char)).join('');
    }

    const length = +lengthEl.value;
    const minNumbers = +minNumbersEl.value;
    const minSymbols = +minSymbolsEl.value;

    if (chars.length === 0) {
        alert('Please select at least one character type.');
        return;
    }

    // Add required characters
    if (numbersEl.checked) {
        for (let i = 0; i < minNumbers; i++) {
            requiredChars += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
        }
    }

    if (symbolsEl.checked) {
        for (let i = 0; i < minSymbols; i++) {
            requiredChars += symbolChars.charAt(Math.floor(Math.random() * symbolChars.length));
        }
    }

    // Generate remaining characters
    for (let i = 0; i < length - requiredChars.length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Mix in required characters
    password = shuffleString(password + requiredChars);

    // Ensure password begins with a letter if option is selected
    if (beginWithLetterEl.checked && !/^[a-zA-Z]/.test(password)) {
        const letterChars = (uppercaseEl.checked ? uppercaseChars : '') + (lowercaseEl.checked ? lowercaseChars : '');
        password = letterChars.charAt(Math.floor(Math.random() * letterChars.length)) + password.slice(1);
    }

    // Remove repeating characters if option is selected
    if (noRepeatingEl.checked) {
        password = removeRepeatingChars(password);
    }

    passwordEl.value = password;
    updateStrengthMeter(password);
    addToPasswordHistory(password);
}

// Shuffle string
function shuffleString(str) {
    return str.split('').sort(() => Math.random() - 0.5).join('');
}

// Remove repeating characters
function removeRepeatingChars(str) {
    return str.split('').filter((char, index, arr) => char !== arr[index - 1]).join('');
}

// Update strength meter
function updateStrengthMeter(password) {
    const strength = calculatePasswordStrength(password);
    strengthEl.value = strength;
    strengthEl.className = getStrengthClass(strength);
}

// Calculate password strength
function calculatePasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[a-z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 10;
    if (/[^A-Za-z0-9]/.test(password)) strength += 10;
    return Math.min(strength, 100);
}

// Get strength class for color coding
function getStrengthClass(strength) {
    if (strength < 30) return 'weak';
    if (strength < 60) return 'medium';
    return 'strong';
}

// Copy password to clipboard
function copyToClipboard() {
    passwordEl.select();
    document.execCommand('copy');
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
        copyBtn.textContent = 'Copy';
    }, 2000);
}

// Add password to history
function addToPasswordHistory(password) {
    passwordHistory.unshift(password);
    if (passwordHistory.length > 5) {
        passwordHistory.pop();
    }
    updatePasswordHistory();
}

// Update password history display
function updatePasswordHistory() {
    passwordHistoryEl.innerHTML = '';
    passwordHistory.forEach(password => {
        const li = document.createElement('li');
        li.textContent = password;
        passwordHistoryEl.appendChild(li);
    });
}

// Event listeners
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);

// Generate initial password
generatePassword();