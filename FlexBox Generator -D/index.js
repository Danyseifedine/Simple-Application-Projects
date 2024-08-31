const flexContainer = document.getElementById('flexContainer');
const cssOutput = document.getElementById('cssOutput');
const htmlOutput = document.getElementById('htmlOutput');
const controls = document.getElementById('controls');
const itemControls = document.getElementById('itemControls');
const bootstrapOutput = document.getElementById('bootstrapOutput');
const tailwindOutput = document.getElementById('tailwindOutput');

const flexProperties = {
    'display': ['flex', 'inline-flex'],
    'flex-direction': ['row', 'row-reverse', 'column', 'column-reverse'],
    'justify-content': ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
    'align-items': ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
    'flex-wrap': ['nowrap', 'wrap', 'wrap-reverse'],
    'align-content': ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch']
};

const itemProperties = {
    'flex-grow': 'number',
    'flex-shrink': 'number',
    'flex-basis': ['auto', '0', '25%', '50%', '75%', '100%']
};

function createControls() {
    controls.innerHTML = '';
    for (const [property, values] of Object.entries(flexProperties)) {
        const label = document.createElement('label');
        label.textContent = property + ': ';

        const input = document.createElement('select');
        input.innerHTML = `<option value="">None</option>` +
            values.map(value => `<option value="${value}">${value}</option>`).join('');

        input.id = property;
        input.addEventListener('change', updateFlexbox);

        label.appendChild(input);
        controls.appendChild(label);
    }
}

function updateFlexbox() {
    let css = '.flex-container {\n';
    let bootstrapClasses = [];
    let tailwindClasses = [];

    for (const property of Object.keys(flexProperties)) {
        const value = document.getElementById(property).value;
        if (value) {
            flexContainer.style[property] = value;
            css += `    ${property}: ${value};\n`;
            bootstrapClasses.push(getBootstrapClass(property, value));
            tailwindClasses.push(getTailwindClass(property, value));
        } else {
            flexContainer.style[property] = '';
        }
    }

    css += '}\n\n';
    css += generateItemCSS();

    cssOutput.value = css;

    const { bootstrapItems, tailwindItems } = generateItemClasses();

    bootstrapOutput.value = `<div class="${bootstrapClasses.join(' ')}">
    ${bootstrapItems.join('\n    ')}
</div>`;

    tailwindOutput.value = `<div class="${tailwindClasses.join(' ')}">
    ${tailwindItems.join('\n    ')}
</div>`;

    updateHTML();
}

function generateItemCSS() {
    let css = '';
    const items = flexContainer.children;
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        css += `.flex-item:nth-child(${i + 1}) {\n`;
        for (const property of Object.keys(itemProperties)) {
            const value = item.style[property];
            if (value) {
                css += `    ${property}: ${value};\n`;
            }
        }
        css += '}\n\n';
    }
    return css;
}

function generateItemClasses() {
    const items = flexContainer.children;
    let bootstrapItems = [];
    let tailwindItems = [];

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let bootstrapItemClasses = ['flex-item'];
        let tailwindItemClasses = ['flex-item'];

        for (const property of Object.keys(itemProperties)) {
            const value = item.style[property];
            if (value) {
                bootstrapItemClasses.push(getBootstrapClass(property, value));
                tailwindItemClasses.push(getTailwindClass(property, value));
            }
        }

        bootstrapItems.push(`<div class="${bootstrapItemClasses.join(' ')}">Flex Item ${i + 1}</div>`);
        tailwindItems.push(`<div class="${tailwindItemClasses.join(' ')}">Flex Item ${i + 1}</div>`);
    }

    return { bootstrapItems, tailwindItems };
}

function updateHTML() {
    const items = flexContainer.children;
    let html = '<div class="flex-container">\n';
    for (let i = 0; i < items.length; i++) {
        html += `    <div class="flex-item">
        <span class="item-number">${i + 1}</span>
        Flex Item
    </div>\n`;
    }
    html += '</div>';
    htmlOutput.value = html;
}

function addFlexItem() {
    const itemCount = flexContainer.children.length + 1;
    const item = document.createElement('div');
    item.className = 'flex-item';
    item.innerHTML = `
        <span class="item-number">${itemCount}</span>
        Flex Item
    `;
    flexContainer.appendChild(item);
    updateItemControls();
    updateFlexbox();
}

function updateItemControls() {
    itemControls.innerHTML = '';
    const items = flexContainer.children;
    for (let i = 0; i < items.length; i++) {
        const itemControl = document.createElement('div');
        itemControl.className = 'item-control';
        itemControl.innerHTML = `<h3>Item ${i + 1}</h3>`;

        for (const [property, type] of Object.entries(itemProperties)) {
            const label = document.createElement('label');
            label.textContent = property + ': ';

            let input;
            if (Array.isArray(type)) {
                input = document.createElement('select');
                input.innerHTML = `<option value="">None</option>` +
                    type.map(value => `<option value="${value}">${value}</option>`).join('');
            } else if (type === 'number') {
                input = document.createElement('input');
                input.type = 'number';
                input.min = '0';
                input.step = '1';
            }

            input.addEventListener('change', (e) => updateItemProperty(i, property, e.target.value));
            label.appendChild(input);
            itemControl.appendChild(label);
        }

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove Item';
        removeButton.addEventListener('click', () => removeFlexItem(i));
        itemControl.appendChild(removeButton);

        itemControls.appendChild(itemControl);
    }
}

function updateItemProperty(index, property, value) {
    const item = flexContainer.children[index];
    item.style[property] = value;
    updateFlexbox();
}

function removeFlexItem(index) {
    flexContainer.children[index].remove();
    updateItemControls();
    updateFlexbox();
}

function reset() {
    flexContainer.innerHTML = '';
    for (const property of Object.keys(flexProperties)) {
        document.getElementById(property).value = '';
    }
    addFlexItem();
    addFlexItem();
    addFlexItem();
    updateFlexbox();
}

function getBootstrapClass(property, value) {
    const bootstrapMap = {
        'display': { 'flex': 'd-flex', 'inline-flex': 'd-inline-flex' },
        'flex-direction': { 'row': 'flex-row', 'row-reverse': 'flex-row-reverse', 'column': 'flex-column', 'column-reverse': 'flex-column-reverse' },
        'justify-content': { 'flex-start': 'justify-content-start', 'flex-end': 'justify-content-end', 'center': 'justify-content-center', 'space-between': 'justify-content-between', 'space-around': 'justify-content-around' },
        'align-items': { 'flex-start': 'align-items-start', 'flex-end': 'align-items-end', 'center': 'align-items-center', 'stretch': 'align-items-stretch', 'baseline': 'align-items-baseline' },
        'flex-wrap': { 'nowrap': 'flex-nowrap', 'wrap': 'flex-wrap', 'wrap-reverse': 'flex-wrap-reverse' },
        'align-content': { 'flex-start': 'align-content-start', 'flex-end': 'align-content-end', 'center': 'align-content-center', 'space-between': 'align-content-between', 'space-around': 'align-content-around', 'stretch': 'align-content-stretch' },
        'flex-grow': (value) => `flex-grow-${value}`,
        'flex-shrink': (value) => `flex-shrink-${value}`,
        'flex-basis': (value) => value === 'auto' ? 'flex-basis-auto' : `flex-basis-${value.replace('%', '')}`
    };

    if (typeof bootstrapMap[property] === 'function') {
        return bootstrapMap[property](value);
    }
    return bootstrapMap[property] && bootstrapMap[property][value] ? bootstrapMap[property][value] : '';
}

function getTailwindClass(property, value) {
    const tailwindMap = {
        'display': { 'flex': 'flex', 'inline-flex': 'inline-flex' },
        'flex-direction': { 'row': 'flex-row', 'row-reverse': 'flex-row-reverse', 'column': 'flex-col', 'column-reverse': 'flex-col-reverse' },
        'justify-content': { 'flex-start': 'justify-start', 'flex-end': 'justify-end', 'center': 'justify-center', 'space-between': 'justify-between', 'space-around': 'justify-around', 'space-evenly': 'justify-evenly' },
        'align-items': { 'flex-start': 'items-start', 'flex-end': 'items-end', 'center': 'items-center', 'stretch': 'items-stretch', 'baseline': 'items-baseline' },
        'flex-wrap': { 'nowrap': 'flex-nowrap', 'wrap': 'flex-wrap', 'wrap-reverse': 'flex-wrap-reverse' },
        'align-content': { 'flex-start': 'content-start', 'flex-end': 'content-end', 'center': 'content-center', 'space-between': 'content-between', 'space-around': 'content-around', 'stretch': 'content-stretch' },
        'flex-grow': (value) => `grow-${value}`,
        'flex-shrink': (value) => `shrink-${value}`,
        'flex-basis': (value) => value === 'auto' ? 'basis-auto' : `basis-${value.replace('%', '')}/100`
    };

    if (typeof tailwindMap[property] === 'function') {
        return tailwindMap[property](value);
    }
    return tailwindMap[property] && tailwindMap[property][value] ? tailwindMap[property][value] : '';
}

async function copyOutput(outputId, buttonId) {
    try {
        await navigator.clipboard.writeText(document.getElementById(outputId).value);
        const button = document.getElementById(buttonId);
        button.textContent = 'Copied!';
        setTimeout(() => {
            button.textContent = `Copy ${buttonId.replace('copy', '').replace('Button', '')}`;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

createControls();
reset();

// Add event listeners for copy buttons
document.getElementById('copyCSSButton').addEventListener('click', () => copyOutput('cssOutput', 'copyCSSButton'));
document.getElementById('copyHTMLButton').addEventListener('click', () => copyOutput('htmlOutput', 'copyHTMLButton'));
document.getElementById('copyBootstrapButton').addEventListener('click', () => copyOutput('bootstrapOutput', 'copyBootstrapButton'));
document.getElementById('copyTailwindButton').addEventListener('click', () => copyOutput('tailwindOutput', 'copyTailwindButton'));