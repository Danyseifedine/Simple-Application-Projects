document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');
    const preview = document.getElementById('preview');
    const cssOutput = document.getElementById('cssOutput');
    const copyButton = document.getElementById('copy-css');
    const multipleCheckbox = document.getElementById('multiple');
    const secondColorGroup = document.getElementById('secondColorGroup');

    function updateBoxShadow() {
        const hOffset = document.getElementById('hOffset').value;
        const vOffset = document.getElementById('vOffset').value;
        const blur = document.getElementById('blurRadius').value;
        const spread = document.getElementById('spreadRadius').value;
        const color = document.getElementById('shadowColor').value;
        const secondColor = document.getElementById('secondShadowColor').value;
        const opacity = document.getElementById('opacity').value;
        const inset = document.getElementById('inset').checked;
        const backgroundColor = document.getElementById('backgroundColor').value;
        const borderRadius = document.getElementById('borderRadius').value;
        const multiple = document.getElementById('multiple').checked;

        const rgbaColor = hexToRGBA(color, opacity);
        const rgbaSecondColor = hexToRGBA(secondColor, opacity);

        let boxShadow = '';
        if (multiple) {
            boxShadow = `${inset ? 'inset ' : ''}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${rgbaColor},
                        ${inset ? 'inset ' : ''}${-hOffset}px ${-vOffset}px ${blur}px ${spread}px ${rgbaSecondColor}`;
        } else {
            boxShadow = `${inset ? 'inset ' : ''}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${rgbaColor}`;
        }

        preview.style.boxShadow = boxShadow;
        preview.style.backgroundColor = backgroundColor;
        preview.style.borderRadius = `${borderRadius}px`;

        cssOutput.value = `box-shadow: ${boxShadow};\n`;
        cssOutput.value += `background-color: ${backgroundColor};\n`;
        cssOutput.value += `border-radius: ${borderRadius}px;`;

        updateValueDisplays();
    }

    function updateValueDisplays() {
        const valueDisplays = {
            'hOffset': 'px',
            'vOffset': 'px',
            'blurRadius': 'px',
            'spreadRadius': 'px',
            'opacity': '%',
            'borderRadius': 'px',
            'gradientAngle': 'deg'
        };

        for (const [id, unit] of Object.entries(valueDisplays)) {
            const input = document.getElementById(id);
            const display = document.getElementById(`${id}Value`);
            if (input && display) {
                display.textContent = `${input.value}${unit}`;
            }
        }
    }

    function hexToRGBA(hex, opacity) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
    }

    inputs.forEach(input => input.addEventListener('input', updateBoxShadow));

    copyButton.addEventListener('click', () => {
        cssOutput.select();
        document.execCommand('copy');
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = 'Copy CSS';
        }, 2000);
    });

    multipleCheckbox.addEventListener('change', () => {
        secondColorGroup.style.display = multipleCheckbox.checked ? 'block' : 'none';
        updateBoxShadow();
    });

    updateBoxShadow(); // Initial update
});