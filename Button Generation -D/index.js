document.addEventListener('DOMContentLoaded', function () {

    const sidebar = document.getElementById('sidebar');
    console.log(sidebar)
    const toggleBtn = document.getElementById('toggleSidebar');
    console.log(toggleBtn)
    const body = document.body;

    toggleBtn.addEventListener('click', function () {
        sidebar.classList.toggle('closed');
        body.classList.toggle('sidebar-closed');
    });
    
    // Navbar functionality
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('nav ul li');

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            const targetClass = item.getAttribute('data-target');
            sections.forEach(section => {
                section.classList.toggle('active', section.classList.contains(targetClass));
            });
        });
    });

    // Button generator functionality
    const btn = document.getElementById('btn');
    const inputs = document.querySelectorAll('input, select');
    const className = document.getElementById('className').value;

    function updateButtonStyle(id, value) {
        switch (id) {
            case 'text':
                btn.textContent = value || 'Button';
                break;
            case 'fontSize':
                btn.style.fontSize = `${value}px`;
                document.getElementById('fontSizeValue').textContent = `${value}px`;
                break;
            case 'className':
                btn.className = value;
                break;
            case 'fontFamily':
                btn.style.fontFamily = value;
                break;
            case 'bold':
                btn.style.fontWeight = value ? 'bold' : 'normal';
                break;
            case 'italy':
                btn.style.fontStyle = value ? 'italic' : 'normal';
                break;
            case 'textColor':
                btn.style.color = value;
                break;
            case 'hoverTextColor':
                btn.addEventListener('mouseenter', () => btn.style.color = value);
                btn.addEventListener('mouseleave', () => btn.style.color = document.getElementById('textColor').value);
                break;
            case 'borderRadius':
                btn.style.borderRadius = `${value}px`;
                document.getElementById('borderRadiusValue').textContent = `${value}px`;
                break;
            case 'borderSize':
                btn.style.borderWidth = `${value}px`;
                document.getElementById('borderSizeValue').textContent = `${value}px`;
                break;
            case 'borderColor':
                btn.style.borderColor = value;
                break;
            case 'backgroundColor':
                btn.style.backgroundColor = value;
                break;
            case 'hoverBackgroundColor':
                btn.addEventListener('mouseenter', () => btn.style.backgroundColor = value);
                btn.addEventListener('mouseleave', () => btn.style.backgroundColor = document.getElementById('backgroundColor').value);
                break;
            case 'cursorType':
                btn.style.cursor = value;
                break;
            default:
                if (id.startsWith('padding') || id.startsWith('margin')) {
                    btn.style[id] = `${value}px`;
                    document.getElementById(`${id}Value`).textContent = `${value}px`;
                }
                break;
        }
    }

    function updateBoxShadow() {
        const inset = document.getElementById('inset').checked ? 'inset ' : '';
        const horizontalPosition = `${document.getElementById('horizontalPosition').value}px`;
        const verticalPosition = `${document.getElementById('verticalPosition').value}px`;
        const blurRadius = `${document.getElementById('blurRadius').value}px`;
        const spreadRadius = `${document.getElementById('spreadRadius').value}px`;
        const boxShadowColor = document.getElementById('boxShadowColor').value;
        const boxShadowOpacity = document.getElementById('boxShadowOpacity').value || '1';

        const color = hexToRgba(boxShadowColor, boxShadowOpacity);

        document.getElementById('horizontalPositionValue').textContent = horizontalPosition;
        document.getElementById('verticalPositionValue').textContent = verticalPosition;
        document.getElementById('blurRadiusValue').textContent = blurRadius;
        document.getElementById('spreadRadiusValue').textContent = spreadRadius;
        document.getElementById('boxShadowOpacityValue').textContent = parseFloat(boxShadowOpacity).toFixed(2);

        btn.style.boxShadow = `${inset}${horizontalPosition} ${verticalPosition} ${blurRadius} ${spreadRadius} ${color}`;
    }

    function updateTextShadow() {
        const horizontalPosition = `${document.getElementById('textHorizontalPosition').value}px`;
        const verticalPosition = `${document.getElementById('textVerticalPosition').value}px`;
        const blurRadius = `${document.getElementById('textBlurRadius').value}px`;
        const textShadowColor = document.getElementById('textShadowColor').value;
        const textShadowOpacity = document.getElementById('textShadowOpacity').value || '1';

        const color = hexToRgba(textShadowColor, textShadowOpacity);

        document.getElementById('textHorizontalPositionValue').textContent = horizontalPosition;
        document.getElementById('textVerticalPositionValue').textContent = verticalPosition;
        document.getElementById('textBlurRadiusValue').textContent = blurRadius;
        document.getElementById('textShadowOpacityValue').textContent = parseFloat(textShadowOpacity).toFixed(2);

        btn.style.textShadow = `${horizontalPosition} ${verticalPosition} ${blurRadius} ${color}`;
    }

    function hexToRgba(hex, opacity) {
        hex = hex.replace('#', '');
        if (typeof hex !== 'string' || hex.length !== 6) {
            console.warn('hexToRgba: hex should be a 6-digit hex string');
            return `rgba(0, 0, 0, ${opacity || 1})`;
        }

        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);

        return `rgba(${r}, ${g}, ${b}, ${opacity || 1})`;
    }

    function updateGeneratedCode() {
        const className = document.getElementById('className').value;
        let generatedCode = `.${className} {\n`;

        inputs.forEach(input => {
            const id = input.id;
            const value = input.type === 'checkbox' ? input.checked : input.value;

            switch (id) {
                case 'fontSize':
                    if (value !== '0') generatedCode += `  font-size: ${value}px;\n`;
                    break;
                case 'fontFamily':
                    if (value) generatedCode += `  font-family: ${value};\n`;
                    break;
                case 'bold':
                    if (value) generatedCode += `  font-weight: bold;\n`;
                    break;
                case 'italy':
                    if (value) generatedCode += `  font-style: italic;\n`;
                    break;
                case 'textColor':
                    generatedCode += `  color: ${value};\n`;
                    break;
                case 'borderRadius':
                    if (value !== '0') generatedCode += `  border-radius: ${value}px;\n`;
                    break;
                case 'borderSize':
                    if (value !== '0') {
                        generatedCode += `  border-width: ${value}px;\n`;
                        generatedCode += `  border-style: solid;\n`;
                        generatedCode += `  border-color: ${document.getElementById('borderColor').value};\n`;
                    }
                    break;
                case 'backgroundColor':
                    generatedCode += `  background-color: ${value};\n`;
                    break;
                case 'cursorType':
                    if (value !== 'default') generatedCode += `  cursor: ${value};\n`;
                    break;
                default:
                    if (id.startsWith('padding') || id.startsWith('margin')) {
                        if (value !== '0') generatedCode += `  ${id}: ${value}px;\n`;
                    }
                    break;
            }
        });

        // Box shadow
        const boxShadow = btn.style.boxShadow;
        if (boxShadow && boxShadow !== 'none') {
            generatedCode += `  box-shadow: ${boxShadow};\n`;
        }

        // Text shadow
        const textShadow = btn.style.textShadow;
        if (textShadow && textShadow !== 'none') {
            generatedCode += `  text-shadow: ${textShadow};\n`;
        }

        generatedCode += `}\n\n`;

        const hoverTextColor = document.getElementById('hoverTextColor').value;
        const hoverBackgroundColor = document.getElementById('hoverBackgroundColor').value;

        if (hoverTextColor !== '#000000' || hoverBackgroundColor !== '#000000') {
            generatedCode += `.${className}:hover {\n`;
            if (hoverTextColor !== '#000000') generatedCode += `  color: ${hoverTextColor};\n`;
            if (hoverBackgroundColor !== '#000000') generatedCode += `  background-color: ${hoverBackgroundColor};\n`;
            generatedCode += `}\n`;
        }

        document.querySelector('.generated-code').textContent = generatedCode;
    }

    inputs.forEach((input) => {
        input.addEventListener('input', function () {
            const id = input.id;
            const value = input.type === 'checkbox' ? input.checked : input.value;

            updateButtonStyle(id, value);

            if (['inset', 'horizontalPosition', 'verticalPosition', 'blurRadius', 'spreadRadius', 'boxShadowColor', 'boxShadowOpacity'].includes(id)) {
                updateBoxShadow();
            } else if (['textHorizontalPosition', 'textVerticalPosition', 'textBlurRadius', 'textShadowColor', 'textShadowOpacity'].includes(id)) {
                updateTextShadow();
            }

            updateGeneratedCode();
        });
    });

    // Initial update
    updateGeneratedCode();

    // Copy to clipboard functionality
    const copyButton = document.getElementById('copyButton');
    copyButton.addEventListener('click', () => {
        const textToCopy = document.querySelector('.generated-code').textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            copyButton.textContent = "Copied!";
            setTimeout(() => {
                copyButton.textContent = "Copy to Clipboard";
            }, 2000);
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    });

    // Clear functionality
    const clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', () => {
        document.querySelector('.generated-code').textContent = '';
    });
});
