document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('email-form');
    const generatedEmail = document.getElementById('generated-email');
    const copyBtn = document.getElementById('copy-btn');
    const prefixType = document.getElementById('prefix-type');
    const customPrefixGroup = document.getElementById('custom-prefix-group');
    const nameFormatGroup = document.getElementById('name-format-group');
    const excludeSimilar = document.getElementById('exclude-similar');
    const tempEmail = document.getElementById('temp-email');

    prefixType.addEventListener('change', () => {
        customPrefixGroup.style.display = prefixType.value === 'custom' ? 'block' : 'none';
        nameFormatGroup.style.display = prefixType.value === 'format' ? 'block' : 'none';
    });



    function generateEmailPrefix() {
        switch (prefixType.value) {
            case 'custom':
                return document.getElementById('custom-prefix').value;
            case 'word':
                return generateRandomWord();
            case 'format':
                return generateNameFormat();
            default:
                return generateRandomChars();
        }
    }

    function generateRandomChars() {
        const length = parseInt(document.getElementById('length').value);
        let chars = '';
        if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (numbers) chars += '0123456789';
        if (symbols) chars += '!@#$%^&*()_+[]{}|;:,.<>?';

        if (excludeSimilar.checked) {
            chars = chars.replace(/[1lI0O]/g, '');
        }

        let emailAddress = '';
        for (let i = 0; i < length; i++) {
            emailAddress += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return emailAddress;
    }

    function generateRandomWord() {
        const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon'];
        return words[Math.floor(Math.random() * words.length)] + Math.floor(Math.random() * 1000);
    }



    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = generateEmail();
        generatedEmail.value = email;
    });

    copyBtn.addEventListener('click', () => {
        generatedEmail.select();
        document.execCommand('copy');
        alert('Email copied to clipboard!');
    });

    function generateEmail() {
        const length = parseInt(document.getElementById('length').value);
        const lowercase = document.getElementById('lowercase').checked;
        const uppercase = document.getElementById('uppercase').checked;
        const numbers = document.getElementById('numbers').checked;
        const symbols = document.getElementById('symbols').checked;
        const emailService = document.getElementById('extension').value;
        const domainExtension = document.getElementById('domain').value;
        const prefixType = document.getElementById('prefix-type').value;
        const excludeSimilar = document.getElementById('exclude-similar').checked;
        const tempEmail = document.getElementById('temp-email').checked;

        let chars = '';
        if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (numbers) chars += '0123456789';
        if (symbols) chars += '!@#$%^&*()_+[]{}|;:,.<>?';

        if (excludeSimilar) {
            chars = chars.replace(/[1lI0O]/g, '');
        }

        if (chars === '') {
            alert('Please select at least one character type.');
            return '';
        }

        let prefix = '';
        switch (prefixType) {
            case 'custom':
                prefix = document.getElementById('custom-prefix').value;
                break;
            case 'word':
                prefix = generateRandomWord();
                break;
            case 'format':
                prefix = generateNameFormat();
                break;
            default:
                // For 'random', we'll generate it as part of the email address
                break;
        }

        let emailAddress = prefix;
        const remainingLength = Math.max(0, length - prefix.length);

        for (let i = 0; i < remainingLength; i++) {
            emailAddress += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        const domain = tempEmail ? 'temp-mail.org' : `${emailService}.${domainExtension}`;
        return `${emailAddress}@${domain}`;
    }

    function generateRandomWord() {
        const words = [
            'apple', 'banana', 'cherry', 'date', 'elderberry', 'fig',
            'grape', 'honeydew', 'kiwi', 'lemon', 'mango', 'nectarine', 'orange',
            'papaya', 'quince', 'raspberry', 'strawberry', 'tangerine',
            'ugli fruit', 'vanilla', 'watermelon', 'xigua', 'yuzu', 'zucchini',
            'apricot', 'blackberry', 'coconut', 'dragonfruit', 'eggplant', 'feijoa',
            'guava', 'huckleberry', 'jackfruit', 'kumquat', 'lime', 'mulberry',
            'nance', 'olive', 'persimmon', 'quince', 'rambutan', 'soursop', 'tamarind',
            'ugni', 'voavanga', 'wolfberry', 'ximenia', 'yam', 'ziziphus',
            'avocado', 'blueberry', 'cantaloupe', 'durian', 'entawak', 'figs',
            'grapefruit', 'honeydew', 'imbe', 'jujube', 'kiwano', 'longan', 'mandarin',
            'nashi', 'orangelo', 'pomegranate', 'quandong', 'rhubarb',
            'starfruit', 'tomato', 'ugli', 'velvet apple', 'wampee', 'xoconostle',
            'yangmei', 'zapote'
        ];
        return words[Math.floor(Math.random() * words.length)] + Math.floor(Math.random() * 1000);
    }

    function generateNameFormat() {
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const format = document.getElementById('name-format').value;

        switch (format) {
            case 'firstlast':
                return `${firstname}.${lastname}`;
            case 'firstinitiallast':
                return `${firstname[0]}.${lastname}`;
            case 'lastfirst':
                return `${lastname}.${firstname}`;
        }
    }
});