const svg = document.getElementById('svg-preview');
const path = document.getElementById('path');
const shapeSelector = document.getElementById('shape-selector');
const generateRandomButton = document.getElementById('generate-random-shape');
const copyButton = document.getElementById('copy-button');
const downloadButton = document.getElementById('download-button');
const generatedCssElement = document.getElementById('generated-css');
const colorPicker = document.getElementById('color-picker');
const gradientColorPicker = document.getElementById('gradient-color-picker');
const opacitySlider = document.getElementById('opacity-slider');
const addPointButton = document.getElementById('add-point');
const gradient = document.getElementById('gradient');

// Modal elements
const downloadModal = document.getElementById('download-modal');
const confirmDownloadButton = document.getElementById('confirm-download');
const cancelDownloadButton = document.getElementById('cancel-download');
const svgWidthInput = document.getElementById('svg-width');
const svgHeightInput = document.getElementById('svg-height');

let points = [];
let isDragging = false;
let draggedPointIndex = -1;

function initializeShape() {
    shapeSelector.value = 'rectangle';
    generatePredefinedShape('rectangle');
    updateGradient();
    updateOpacity();
}

function generatePredefinedShape(shapeType) {
    switch (shapeType) {
        case 'rectangle':
            points = [[50, 50], [250, 50], [250, 250], [50, 250]];
            break;
        case 'triangle':
            points = [[150, 50], [250, 250], [50, 250]];
            break;
        case 'circle':
            points = Array.from({ length: 8 }, (_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                return [150 + Math.cos(angle) * 100, 150 + Math.sin(angle) * 100];
            });
            break;
    }
    updateShape();
}

function generateRandomShape() {
    const numPoints = Math.floor(Math.random() * 5) + 5;
    const noise = new SimplexNoise();
    points = Array.from({ length: numPoints }, (_, i) => {
        const angle = (i / numPoints) * Math.PI * 2;
        const radius = 100 + noise.noise2D(Math.cos(angle), Math.sin(angle)) * 20;
        return [150 + Math.cos(angle) * radius, 150 + Math.sin(angle) * radius];
    });
    updateShape();
}

function addRandomPoint() {
    if (points.length < 18) {
        const index = Math.floor(Math.random() * points.length);
        const [x1, y1] = points[index];
        const [x2, y2] = points[(index + 1) % points.length];
        const newX = (x1 + x2) / 2 + (Math.random() - 0.5) * 20;
        const newY = (y1 + y2) / 2 + (Math.random() - 0.5) * 20;
        points.splice(index + 1, 0, [newX, newY]);
        updateShape();
    } else {
        alert('You can add up to 18 points only.');
    }
}

function updateShape() {
    let pathData;
    if (shapeSelector.value === 'circle') {
        pathData = `M${points[0][0]},${points[0][1]}`;
        for (let i = 1; i < points.length; i++) {
            const p1 = points[i];
            const p2 = points[(i + 1) % points.length];
            const midX = (p1[0] + p2[0]) / 2;
            const midY = (p1[1] + p2[1]) / 2;
            pathData += ` Q${p1[0]},${p1[1]} ${midX},${midY}`;
        }
        pathData += ` Q${points[points.length - 1][0]},${points[points.length - 1][1]} ${points[0][0]},${points[0][1]}`;
    } else {
        pathData = `M${points.map(p => p.join(',')).join(' L')}Z`;
    }

    path.setAttribute('d', pathData);
    generatedCssElement.textContent = `clip-path: path('${pathData}');`;
    updatePointElements();
    updateGradient();
    updateOpacity();
}

function updatePointElements() {
    svg.querySelectorAll('.point').forEach(el => el.remove());
    points.forEach((point, index) => {
        const pointElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        pointElement.setAttribute("cx", point[0]);
        pointElement.setAttribute("cy", point[1]);
        pointElement.setAttribute("r", 5);
        pointElement.setAttribute("class", "point");
        pointElement.setAttribute("data-index", index);
        svg.appendChild(pointElement);
    });
}

function updateGradient() {
    const color1 = colorPicker.value;
    const color2 = gradientColorPicker.value;
    gradient.querySelector('stop[offset="0%"]').setAttribute('stop-color', color1);
    gradient.querySelector('stop[offset="100%"]').setAttribute('stop-color', color2);
}

function updateOpacity() {
    const opacity = opacitySlider.value;
    path.setAttribute('opacity', opacity);
}

svg.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('point')) {
        isDragging = true;
        draggedPointIndex = parseInt(e.target.getAttribute('data-index'));
    }
});

svg.addEventListener('mousemove', (e) => {
    if (isDragging && draggedPointIndex !== -1) {
        const rect = svg.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        points[draggedPointIndex] = [x, y];
        updateShape();
    }
});

svg.addEventListener('mouseup', () => {
    isDragging = false;
    draggedPointIndex = -1;
});

svg.addEventListener('mouseleave', () => {
    isDragging = false;
    draggedPointIndex = -1;
});

shapeSelector.addEventListener('change', () => {
    generatePredefinedShape(shapeSelector.value);
});

generateRandomButton.addEventListener('click', generateRandomShape);
addPointButton.addEventListener('click', addRandomPoint);
colorPicker.addEventListener('input', updateGradient);
gradientColorPicker.addEventListener('input', updateGradient);
opacitySlider.addEventListener('input', updateOpacity);

copyButton.addEventListener('click', () => {
    const cssCode = generatedCssElement.textContent;
    navigator.clipboard.writeText(cssCode).then(() => {
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = 'Copy CSS';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});

downloadButton.addEventListener('click', () => {
    downloadModal.style.display = 'block';
});

confirmDownloadButton.addEventListener('click', () => {
    const width = svgWidthInput.value;
    const height = svgHeightInput.value;
    downloadSVG(width, height);
    downloadModal.style.display = 'none';
});

cancelDownloadButton.addEventListener('click', () => {
    downloadModal.style.display = 'none';
});

function downloadSVG(width, height) {
    const points = svg.querySelectorAll('.point');
    points.forEach(point => point.remove());

    const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    newSvg.setAttribute("width", width);
    newSvg.setAttribute("height", height);
    newSvg.setAttribute("viewBox", "0 0 300 300");

    newSvg.innerHTML = svg.innerHTML;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(newSvg);

    const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'clip-path.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);

    updatePointElements();
}

initializeShape();