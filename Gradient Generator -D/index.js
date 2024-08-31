const gradientPreview = document.getElementById('gradientPreview');
const gradientBar = document.getElementById('gradientBar');
const colorStopsList = document.getElementById('colorStopsList');
const linearBtn = document.getElementById('linearBtn');
const radialBtn = document.getElementById('radialBtn');
const degreeInput = document.getElementById('degreeInput');
const gradientCode = document.getElementById('gradientCode');
const copyButton = document.getElementById('copyButton');
const downloadButton = document.getElementById('downloadButton');
const addRandomStopBtn = document.getElementById('addRandomStopBtn');
const reverseGradientBtn = document.getElementById('reverseGradientBtn');
const rotateLeftBtn = document.getElementById('rotateLeftBtn');
const rotateRightBtn = document.getElementById('rotateRightBtn');

let colorStops = [
    { color: 'rgba(255,0,0,1)', position: 0 },
    { color: 'rgba(0,0,255,1)', position: 100 }
];

let activeStopIndex = null;
let pickrInstances = [];


let isDragging = false;
let draggedStopIndex = null;

// Add this new function to your code
function parseAndRoundGradient(gradientString) {
    return gradientString.replace(/rgba\(([^)]+)\)/g, (match, p1) => {
        const values = p1.split(',').map(v => {
            const parsed = parseFloat(v.trim());
            return isNaN(parsed) ? v.trim() : Math.round(parsed);
        });
        return `rgba(${values.join(', ')})`;
    });
}

// Modify the updateGradient function
function updateGradient() {
    const gradientType = linearBtn.classList.contains('active') ? 'linear' : 'radial';
    const degree = gradientType === 'linear' ? `${degreeInput.value}deg, ` : '';
    const stops = colorStops.map(stop => `${stop.color} ${stop.position}%`).join(', ');
    const gradientString = `${gradientType}-gradient(${degree}${stops})`;

    const roundedGradientString = parseAndRoundGradient(gradientString);

    gradientPreview.style.background = roundedGradientString;
    gradientBar.style.background = parseAndRoundGradient(`linear-gradient(to right, ${stops})`);

    gradientCode.value = `background: ${roundedGradientString};`;

    updateColorStops();
}

// Modify the updateColorStops function
function updateColorStops() {
    gradientBar.innerHTML = '';
    colorStopsList.innerHTML = '';

    colorStops.forEach((stop, index) => {
        // Create color stop for gradient bar
        const stopElement = document.createElement('div');
        stopElement.className = 'color-stop';
        stopElement.style.left = `${stop.position}%`;
        stopElement.style.backgroundColor = stop.color;
        stopElement.dataset.index = index;
        stopElement.addEventListener('mousedown', startDragging);

        // Create position indicator
        const positionIndicator = document.createElement('div');
        positionIndicator.className = 'position-indicator';
        positionIndicator.textContent = `${stop.position}%`;
        stopElement.appendChild(positionIndicator);

        gradientBar.appendChild(stopElement);

        // Create color stop item for list
        const stopItem = document.createElement('div');
        stopItem.className = 'color-stop-item';
        stopItem.innerHTML = `
            <div class="color-preview" style="background-color: ${stop.color}"></div>
            <div class="color-picker" data-index="${index}"></div>
            <input type="number" class="position-input" value="${stop.position}" min="0" max="100" data-index="${index}">
            <button class="remove-stop" data-index="${index}" ${colorStops.length <= 2 ? 'disabled' : ''}>×</button>
        `;
        colorStopsList.appendChild(stopItem);

        initializePickr(stopItem.querySelector('.color-picker'), index);
    });
}

function initializePickr(element, index) {
    if (pickrInstances[index]) {
        pickrInstances[index].destroyAndRemove();
    }

    const pickerElement = document.createElement('div');
    pickerElement.className = 'color-picker';
    element.appendChild(pickerElement);

    pickrInstances[index] = Pickr.create({
        el: pickerElement,
        theme: 'classic',
        default: colorStops[index].color,
        components: {
            preview: true,
            opacity: true,
            hue: true,
            interaction: {
                input: true,
                clear: true,
                save: true
            }
        }
    });

    pickrInstances[index].on('save', (color) => {
        if (color) {
            colorStops[index].color = color.toRGBA().toString();
            updateGradient();
            updateColorPreview(element.closest('.color-stop-item'), color);
        }
        pickrInstances[index].hide();
    });
}

// Add this new function to update the color preview
function updateColorPreview(colorStopItem, color) {
    const colorPreview = colorStopItem.querySelector('.color-preview');
    if (colorPreview) {
        colorPreview.style.backgroundColor = color.toRGBA().toString();
    }
}

function startDragging(event) {
    isDragging = true;
    draggedStopIndex = parseInt(event.target.dataset.index);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);
    document.body.classList.add('dragging');
}

function drag(event) {
    if (isDragging) {
        const rect = gradientBar.getBoundingClientRect();
        let position = (event.clientX - rect.left) / rect.width * 100;
        position = Math.max(0, Math.min(100, position));
        colorStops[draggedStopIndex].position = Math.round(position);
        updateGradient();
    }
}

function stopDragging() {
    isDragging = false;
    draggedStopIndex = null;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDragging);
    document.body.classList.remove('dragging');
}

function addColorStop(position) {
    const newColor = 'rgba(128,128,128,1)';
    colorStops.push({ color: newColor, position });
    colorStops.sort((a, b) => a.position - b.position);
    updateGradient();
}

function removeColorStop(index) {
    if (colorStops.length > 2) {
        colorStops.splice(index, 1);
        updateGradient();
    }
}

function addRandomStop() {
    const position = Math.floor(Math.random() * 101);
    const color = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},1)`;
    colorStops.push({ color, position });
    colorStops.sort((a, b) => a.position - b.position);
    updateGradient();
}

function reverseGradient() {
    colorStops.forEach(stop => stop.position = 100 - stop.position);
    colorStops.reverse();
    updateGradient();
}

function adjustAngle(amount) {
    let currentAngle = parseInt(degreeInput.value);
    currentAngle = (currentAngle + amount + 360) % 360;
    degreeInput.value = currentAngle;
    updateGradient();
}

function copyCSS() {
    navigator.clipboard.writeText(gradientCode.value).then(() => {
        copyButton.innerHTML = 'Copied!';
        setTimeout(() => {
            copyButton.innerHTML = 'Copy CSS';
        }, 4000);
    }).catch(err => {
        console.error('Failed to copy CSS: ', err);
    });
}

function downloadImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    const gradientType = linearBtn.classList.contains('active') ? 'linear' : 'radial';
    let gradient;

    if (gradientType === 'linear') {
        gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    } else {
        gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, canvas.width / 2
        );
    }

    colorStops.forEach(stop => {
        gradient.addColorStop(stop.position / 100, stop.color);
    });

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const link = document.createElement('a');
    link.download = 'gradient.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Event Listeners
gradientBar.addEventListener('click', (event) => {
    if (!isDragging) {
        const rect = gradientBar.getBoundingClientRect();
        const position = Math.round((event.clientX - rect.left) / rect.width * 100);
        addColorStop(position);
    }
});

colorStopsList.addEventListener('change', (event) => {
    if (event.target.classList.contains('position-input')) {
        const index = parseInt(event.target.dataset.index);
        colorStops[index].position = parseInt(event.target.value);
        updateGradient();
    }
});

colorStopsList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-stop')) {
        const index = parseInt(event.target.dataset.index);
        removeColorStop(index);
    }
});

linearBtn.addEventListener('click', () => {
    linearBtn.classList.add('active');
    radialBtn.classList.remove('active');
    updateGradient();
});

radialBtn.addEventListener('click', () => {
    radialBtn.classList.add('active');
    linearBtn.classList.remove('active');
    updateGradient();
});

degreeInput.addEventListener('input', updateGradient);
copyButton.addEventListener('click', copyCSS);
downloadButton.addEventListener('click', downloadImage);
addRandomStopBtn.addEventListener('click', addRandomStop);
reverseGradientBtn.addEventListener('click', reverseGradient);
rotateLeftBtn.addEventListener('click', () => adjustAngle(-5));
rotateRightBtn.addEventListener('click', () => adjustAngle(5));

// Initialize the gradient on page load
updateGradient();