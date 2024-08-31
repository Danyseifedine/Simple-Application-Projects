// Add this function to create a default card
function createDefaultCard() {
    const cardPreview = document.getElementById('cardPreview');
    cardPreview.innerHTML = `
        <h2 class="h2-1">Welcome to Card Generator</h2>
        <p class="p-1">This is a sample card to get you started. Feel free to modify or delete these elements and add your own!</p>
        <button class="button-1">Learn More</button>
    `;

    // Style the card
    cardPreview.style.width = '300px';
    cardPreview.style.height = 'auto';
    cardPreview.style.padding = '20px';
    cardPreview.style.backgroundColor = '#f0f0f0';
    cardPreview.style.borderRadius = '10px';
    cardPreview.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    cardPreview.style.display = 'flex';
    cardPreview.style.flexDirection = 'column';
    cardPreview.style.alignItems = 'center';
    cardPreview.style.textAlign = 'center';

    // Style the elements
    const h2 = cardPreview.querySelector('.h2-1');
    h2.style.color = '#333';
    h2.style.marginBottom = '15px';

    const p = cardPreview.querySelector('.p-1');
    p.style.color = '#666';
    p.style.marginBottom = '20px';
    p.style.lineHeight = '1.5';

    const button = cardPreview.querySelector('.button-1');
    button.style.backgroundColor = '#007bff';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.padding = '10px 20px';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.transition = 'background-color 0.3s';
    button.style.marginBottom = '10px';

    // Add hover effect to the button
    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = '#0056b3';
    });
    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = '#007bff';
    });

    // Make elements draggable
    Array.from(cardPreview.children).forEach(child => {
        child.draggable = true;
        child.addEventListener('dragstart', dragStart);
        child.addEventListener('dragover', dragOver);
        child.addEventListener('drop', drop);
        child.addEventListener('dragenter', dragEnter);
        child.addEventListener('dragleave', dragLeave);
        child.addEventListener('click', (e) => {
            e.stopPropagation();
            selectElement(child);
        });
    });

    // Update outputs
    updateOutputs();
}


const cardPreview = document.getElementById('cardPreview');
const resetButton = document.getElementById('resetButton');
const toolbox = document.getElementById('toolbox');
const elementProperties = document.getElementById('elementProperties');
const deleteElementBtn = document.getElementById('deleteElementBtn');

let selectedElement = null;


document.querySelector('.toggle-btn').addEventListener('click', function() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    sidebar.classList.toggle('closed');
    if (window.innerWidth > 768) {
        mainContent.style.marginLeft = sidebar.classList.contains('closed') ? '0' : '0';
    }
});

window.addEventListener('resize', function() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    if (window.innerWidth <= 768) {
        mainContent.style.marginLeft = '0';
    } else {
        mainContent.style.marginLeft = sidebar.classList.contains('closed') ? '0' : '0';
    }
});

function createDraggableElement(type) {
    let element;
    switch (type) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
        case 'p':
            element = document.createElement(type);
            element.textContent = `${type.toUpperCase()} Content`;
            break;
        case 'button':
            element = document.createElement('button');
            element.textContent = 'Button';
            break;
        case 'input':
            element = document.createElement('input');
            element.type = 'text';
            element.placeholder = 'Input field';
            break;
        case 'img':
            element = document.createElement('img');
            element.src = 'https://via.placeholder.com/150';
            element.alt = 'Placeholder image';
            break;
        case 'div':
            element = document.createElement('div');
            element.style.border = '1px dashed #ccc';
            element.style.padding = '10px';
            element.style.minHeight = '50px';
            break;
    }

    if (element) {
        const elementCount = document.querySelectorAll(`.${type}`).length + 1;
        element.className = `${type}-${elementCount}`;
        element.id = 'element-' + Date.now(); // Assign a unique ID
        element.style.backgroundColor = '#FFFFFF';
        element.style.color = '#000000';
        element.draggable = true; // Make the element draggable
        element.addEventListener('dragstart', dragStart);
        element.addEventListener('dragover', dragOver);
        element.addEventListener('drop', drop);
        element.addEventListener('dragenter', dragEnter);
        element.addEventListener('dragleave', dragLeave);
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            selectElement(element);
        });
        element.addEventListener('mouseenter', applyAnimation);
        element.addEventListener('mouseleave', removeAnimation);
    }

    return element;
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => e.target.classList.add('dragging'), 0);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    const dropzone = e.target.closest('.element') || cardPreview;
    
    if (dropzone !== draggableElement) {
        if (dropzone === cardPreview) {
            dropzone.appendChild(draggableElement);
        } else {
            dropzone.parentNode.insertBefore(draggableElement, dropzone);
        }
    }
    draggableElement.classList.remove('dragging');
    updateOutputs();
}

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}



function selectElement(element) {
    if (selectedElement) {
        selectedElement.style.outline = 'none';
    }
    selectedElement = element;
    // selectedElement.style.outline = '2px solid blue';
    elementProperties.classList.remove('hidden');
    updateElementProperties();
}

function updateElementProperties() {
    document.getElementById('elementWidthValue').value = selectedElement.style.width.replace('px', '');
    document.getElementById('elementHeightValue').value = selectedElement.style.height.replace('px', '');
    document.getElementById('elementFontSize').value = selectedElement.style.fontSize.replace('px', '');
    document.getElementById('elementColor').value = rgbToHex(selectedElement.style.color) || '#000000';
    document.getElementById('elementBgColor').value = rgbToHex(selectedElement.style.backgroundColor) || '#FFFFFF';
    document.getElementById('elementBorderWidth').value = selectedElement.style.borderWidth.replace('px', '');
    document.getElementById('elementBorderStyle').value = selectedElement.style.borderStyle;
    document.getElementById('elementBorderColor').value = rgbToHex(selectedElement.style.borderColor);
    // document.getElementById('elementBorderRadius').value = selectedElement.style.borderRadius.replace('px', '');
    document.getElementById('elementPaddingTop').value = selectedElement.style.paddingTop.replace('px', '');
    document.getElementById('elementPaddingRight').value = selectedElement.style.paddingRight.replace('px', '');
    document.getElementById('elementPaddingBottom').value = selectedElement.style.paddingBottom.replace('px', '');
    document.getElementById('elementPaddingLeft').value = selectedElement.style.paddingLeft.replace('px', '');
    document.getElementById('elementMarginTop').value = selectedElement.style.marginTop.replace('px', '');
    document.getElementById('elementMarginRight').value = selectedElement.style.marginRight.replace('px', '');
    document.getElementById('elementMarginBottom').value = selectedElement.style.marginBottom.replace('px', '');
    document.getElementById('elementMarginLeft').value = selectedElement.style.marginLeft.replace('px', '');
    document.getElementById('elementText').value = selectedElement.textContent || selectedElement.value || '';
    document.getElementById('elementBorderRadius').value = parseInt(selectedElement.style.borderRadius) || 0;
    document.getElementById('elementBorderRadiusValue').textContent = document.getElementById('elementBorderRadius').value;
    const paddingProps = ['Top', 'Right', 'Bottom', 'Left'];
    paddingProps.forEach(prop => {
        const value = parseInt(selectedElement.style[`padding${prop}`]) || 0;
        document.getElementById(`elementPadding${prop}`).value = value;
        document.getElementById(`elementPadding${prop}Value`).textContent = value;
    });

    const marginProps = ['Top', 'Right', 'Bottom', 'Left'];
    marginProps.forEach(prop => {
        const value = parseInt(selectedElement.style[`margin${prop}`]) || 0;
        document.getElementById(`elementMargin${prop}`).value = value;
        document.getElementById(`elementMargin${prop}Value`).textContent = value;
    });

    const elementTextContent = document.getElementById('elementText');
    const elementImageContent = document.getElementById('elementImageContent');
    const textShadowProperties = document.getElementById('textShadowProperties');


    if (selectedElement.tagName.toLowerCase() === 'img') {
        elementTextContent.style.display = 'none';
        document.getElementById('TextContentLabel').style.display = 'none';
        elementImageContent.style.display = 'block';
        textShadowProperties.style.display = 'none';  // Hide text shadow for images
        document.getElementById('elementImageUrl').value = selectedElement.src;
    } else {
        elementTextContent.style.display = 'block';
        document.getElementById('TextContentLabel').style.display = 'block';
        elementImageContent.style.display = 'none';
        textShadowProperties.style.display = 'block';  // Show text shadow for non-images
        document.getElementById('elementText').value = selectedElement.textContent || selectedElement.value || '';
    }

    const elementFlexProperties = document.getElementById('elementFlexProperties');
    if (selectedElement.parentElement.style.display === 'flex') {
        elementFlexProperties.style.display = 'block';
        document.getElementById('elementFlexGrow').value = selectedElement.style.flexGrow || 0;
        document.getElementById('elementFlexShrink').value = selectedElement.style.flexShrink || 1;
        document.getElementById('elementFlexGrowValue').textContent = selectedElement.style.flexGrow || 0;
        document.getElementById('elementFlexShrinkValue').textContent = selectedElement.style.flexShrink || 1;
    } else {
        elementFlexProperties.style.display = 'none';
    }
}

// Update Image
document.getElementById('updateImageBtn').addEventListener('click', function() {
    if (selectedElement && selectedElement.tagName.toLowerCase() === 'img') {
        selectedElement.src = document.getElementById('elementImageUrl').value;
        updateOutputs();
    }
});

function rgbToHex(rgb) {
    if (!rgb) return null; // Return white if no color is set
    const [r, g, b] = rgb.match(/\d+/g);
    return `#${((1 << 24) + (+r << 16) + (+g << 8) + +b).toString(16).slice(1)}`;
}

function updateOutputs() {
    const cardPreview = document.getElementById('cardPreview');
    let htmlOutput = '<div class="card">\n';
    let cssOutput = '.card {\n';
    let hoverCSS = '';
    let usedAnimations = new Set();

    // Card styles
    const cardProperties = ['width', 'height', 'borderWidth', 'borderStyle', 'borderColor', 'borderRadius', 'padding', 'margin', 'display', 'flexDirection', 'justifyContent', 'alignItems', 'gap', 'boxShadow', 'textAlign'];
    cardProperties.forEach(prop => {
        if (cardPreview.style[prop]) {
            cssOutput += `  ${camelToKebab(prop)}: ${cardPreview.style[prop]};\n`;
        }
    });

    // Handle background separately
    if (cardPreview.style.background) {
        cssOutput += `  background: ${cardPreview.style.background};\n`;
    } else if (cardPreview.style.backgroundColor) {
        cssOutput += `  background-color: ${cardPreview.style.backgroundColor};\n`;
    }

    cssOutput += '}\n\n';

    // Card hover animation
    if (cardPreview.dataset.hoverAnimation) {
        hoverCSS += '.card:hover {\n';
        hoverCSS += `  animation: ${cardPreview.dataset.hoverAnimation} ${cardPreview.style.transitionDuration || '1s'} forwards;\n`;
        hoverCSS += '}\n\n';
        usedAnimations.add(cardPreview.dataset.hoverAnimation);
    }

    // Element styles
    cardPreview.childNodes.forEach((child) => {
        if (child.nodeType === Node.ELEMENT_NODE) {
            const elementType = child.tagName.toLowerCase();
            const elementClass = child.className;
            
            htmlOutput += `  <${elementType} class="${elementClass}">${child.innerHTML}</${elementType}>\n`;

            const elementProperties = ['width', 'height', 'color', 'backgroundColor', 'fontSize', 'fontWeight', 'textAlign', 'padding', 'margin', 'borderWidth', 'borderStyle', 'borderColor', 'borderRadius', 'flexGrow', 'flexShrink', 'lineHeight', 'cursor', 'transition'];
            let elementCSS = '';
            elementProperties.forEach(prop => {
                if (child.style[prop]) {
                    elementCSS += `  ${camelToKebab(prop)}: ${child.style[prop]};\n`;
                }
            });

            if (elementCSS) {
                cssOutput += `.card .${elementClass} {\n${elementCSS}}\n\n`;
            }

            // Element hover styles
            if (child.tagName.toLowerCase() === 'button') {
                cssOutput += `.card .${elementClass}:hover {\n  background-color: #0056b3;\n}\n\n`;
            }

            // Element hover animation
            if (child.dataset.hoverAnimation) {
                hoverCSS += `.card .${elementClass}:hover {\n`;
                hoverCSS += `  animation: ${child.dataset.hoverAnimation} ${child.style.transitionDuration || '1s'} forwards;\n`;
                hoverCSS += '}\n\n';
                usedAnimations.add(child.dataset.hoverAnimation);
            }
        }
    });

    htmlOutput += '</div>';

    // Combine all CSS
    cssOutput += hoverCSS;

    // Add only the used animation keyframes
    if (usedAnimations.size > 0) {
        cssOutput += generateUsedAnimationKeyframes(usedAnimations);
    }

    document.getElementById('htmlOutput').textContent = htmlOutput;
    document.getElementById('cssOutput').textContent = cssOutput;
}

function generateUsedAnimationKeyframes(usedAnimations) {
    const allKeyframes = {
        fade: `
@keyframes fade {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
}`,
        slide: `
@keyframes slide {
    0% { transform: translateX(0); }
    50% { transform: translateX(10px); }
    100% { transform: translateX(0); }
}`,
        rotate: `
@keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}`,
        scale: `
@keyframes scale {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}`,
        flip: `
@keyframes flip {
    0% { transform: perspective(400px) rotateY(0); }
    100% { transform: perspective(400px) rotateY(360deg); }
}`,
        shake: `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
}`,
        bounce: `
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-30px); }
    60% { transform: translateY(-15px); }
}`,
        pulse: `
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}`,
        wobble: `
@keyframes wobble {
    0% { transform: translateX(0%); }
    15% { transform: translateX(-25%) rotate(-5deg); }
    30% { transform: translateX(20%) rotate(3deg); }
    45% { transform: translateX(-15%) rotate(-3deg); }
    60% { transform: translateX(10%) rotate(2deg); }
    75% { transform: translateX(-5%) rotate(-1deg); }
    100% { transform: translateX(0%); }
}`,
        swing: `
@keyframes swing {
    20% { transform: rotate(15deg); }
    40% { transform: rotate(-10deg); }
    60% { transform: rotate(5deg); }
    80% { transform: rotate(-5deg); }
    100% { transform: rotate(0deg); }
}`
    };

    let keyframesOutput = '';
    usedAnimations.forEach(animation => {
        if (allKeyframes[animation]) {
            keyframesOutput += allKeyframes[animation] + '\n\n';
        }
    });

    return keyframesOutput;
}

// Helper function to convert camelCase to kebab-case
function camelToKebab(string) {
    return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

cardPreview.addEventListener('dragover', (e) => e.preventDefault());
cardPreview.addEventListener('drop', (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('text');
    const element = createDraggableElement(type);
    if (element) {
        cardPreview.appendChild(element);
        updateOutputs();
    }
});

toolbox.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text', e.target.dataset.type);
});

resetButton.addEventListener('click', () => {
    cardPreview.innerHTML = '';
    cardPreview.style.width = '400px';
    cardPreview.style.height = '500px';
    updateOutputs();
});

deleteElementBtn.addEventListener('click', () => {
    if (selectedElement) {
        selectedElement.remove();
        selectedElement = null;
        elementProperties.classList.add('hidden');
        updateOutputs();
    }
});

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    const copyButton = document.querySelector(`button[onclick="copyToClipboard('${elementId}')"]`);
    
    navigator.clipboard.writeText(text).then(() => {
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copied!';
        
        // Reset the button text after 2 seconds
        setTimeout(() => {
            copyButton.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Add event listeners for property inputs
const cardInputs = [
    'cardWidthValue', 'cardWidth', 'cardHeightValue', 'cardHeight', 'cardDisplay',
    'cardFlexDirection', 'cardJustifyContent', 'cardAlignItems', 'cardBgColor',
    'cardBorderWidth', 'cardBorderStyle', 'cardBorderColor', 'cardBorderRadius',
    'cardPaddingTop', 'cardPaddingRight', 'cardPaddingBottom', 'cardPaddingLeft',
    'cardMarginTop', 'cardMarginRight', 'cardMarginBottom', 'cardMarginLeft',
    'cardBoxShadowX', 'cardBoxShadowY', 'cardBoxShadowBlur', 'cardBoxShadowColor',
    'cardAnimation', 'cardAnimationDuration'
];

cardInputs.forEach(id => {
    document.getElementById(id).addEventListener('input', updateCardStyle);
});

const elementInputs = [
    'elementWidthValue', 'elementWidth', 'elementHeightValue', 'elementHeight',
    'elementFontSize', 'elementColor', 'elementBgColor', 'elementBorderWidth',
    'elementBorderStyle', 'elementBorderColor', 'elementBorderRadius',
    'elementPaddingTop', 'elementPaddingRight', 'elementPaddingBottom', 'elementPaddingLeft',
    'elementMarginTop', 'elementMarginRight', 'elementMarginBottom', 'elementMarginLeft',
    'elementBoxShadowX', 'elementBoxShadowY', 'elementBoxShadowBlur', 'elementBoxShadowColor',
    'elementTextShadowX', 'elementTextShadowY', 'elementTextShadowBlur', 'elementTextShadowColor',
    'elementAnimation', 'elementAnimationDuration', 'elementText'
];

elementInputs.forEach(id => {
    document.getElementById(id).addEventListener('input', updateElementStyle);
});

function updateCardStyle() {
    const width = document.getElementById('cardWidth').value === 'px' ?
        `${document.getElementById('cardWidthValue').value}px` :
        document.getElementById('cardWidth').value;
    const height = document.getElementById('cardHeight').value === 'px' ?
        `${document.getElementById('cardHeightValue').value}px` :
        document.getElementById('cardHeight').value;

    cardPreview.style.width = width;
    cardPreview.style.height = height;
    cardPreview.style.display = document.getElementById('cardDisplay').value;
    cardPreview.style.flexDirection = document.getElementById('cardFlexDirection').value;
    cardPreview.style.justifyContent = document.getElementById('cardJustifyContent').value;
    cardPreview.style.alignItems = document.getElementById('cardAlignItems').value;
    // cardPreview.style.backgroundColor = document.getElementById('cardBgColor').value;
    cardPreview.style.borderWidth = `${document.getElementById('cardBorderWidth').value}px`;
    cardPreview.style.borderStyle = document.getElementById('cardBorderStyle').value;
    cardPreview.style.borderColor = document.getElementById('cardBorderColor').value;
    cardPreview.style.borderRadius = `${document.getElementById('cardBorderRadius').value}px`;
    cardPreview.style.paddingTop = `${document.getElementById('cardPaddingTop').value}px`;
    cardPreview.style.paddingRight = `${document.getElementById('cardPaddingRight').value}px`;
    cardPreview.style.paddingBottom = `${document.getElementById('cardPaddingBottom').value}px`;
    cardPreview.style.paddingLeft = `${document.getElementById('cardPaddingLeft').value}px`;
    cardPreview.style.marginTop = `${document.getElementById('cardMarginTop').value}px`;
    cardPreview.style.marginRight = `${document.getElementById('cardMarginRight').value}px`;
    cardPreview.style.marginBottom = `${document.getElementById('cardMarginBottom').value}px`;
    cardPreview.style.marginLeft = `${document.getElementById('cardMarginLeft').value}px`;

    const boxShadowX = document.getElementById('cardBoxShadowX').value;
    const boxShadowY = document.getElementById('cardBoxShadowY').value;
    const boxShadowBlur = document.getElementById('cardBoxShadowBlur').value;
    const boxShadowColor = document.getElementById('cardBoxShadowColor').value;
    cardPreview.style.boxShadow = `${boxShadowX}px ${boxShadowY}px ${boxShadowBlur}px ${boxShadowColor}`;

    const paddingProps = ['Top', 'Right', 'Bottom', 'Left'];
    paddingProps.forEach(prop => {
        const value = document.getElementById(`cardPadding${prop}`).value;
        cardPreview.style[`padding${prop}`] = `${value}px`;
        document.getElementById(`cardPadding${prop}Value`).textContent = value;
    });

    const marginProps = ['Top', 'Right', 'Bottom', 'Left'];
    marginProps.forEach(prop => {
        const value = document.getElementById(`cardMargin${prop}`).value;
        cardPreview.style[`margin${prop}`] = `${value}px`;
        document.getElementById(`cardMargin${prop}Value`).textContent = value;
    });

    const animation = document.getElementById('cardAnimation').value;
    const animationDuration = document.getElementById('cardAnimationDuration').value;
    document.getElementById('cardAnimationDurationValue').textContent = animationDuration;

    if (animation) {
        cardPreview.style.transition = `all ${animationDuration}s`;
        cardPreview.dataset.hoverAnimation = animation;
    } else {
        cardPreview.style.transition = '';
        delete cardPreview.dataset.hoverAnimation;
    }

    const display = document.getElementById('cardDisplay').value;
    cardPreview.style.display = display;

    if (display === 'flex') {
        cardPreview.style.flexDirection = document.getElementById('cardFlexDirection').value;
        cardPreview.style.justifyContent = document.getElementById('cardJustifyContent').value;
        cardPreview.style.alignItems = document.getElementById('cardAlignItems').value;
        const gap = document.getElementById('cardGap').value;
        cardPreview.style.gap = `${gap}px`;
        document.getElementById('cardGapValue').textContent = gap;
    }

    const useGradient = document.getElementById('cardGradient').checked;
    const bgColor = document.getElementById('cardBgColor').value;
    
    if (useGradient) {
        const gradientColor = document.getElementById('cardGradientColor').value;
        const gradientOpacity = document.getElementById('cardGradientOpacity').value;
        const gradientDirection = document.getElementById('cardGradientDirection').value;
        const rgba = hexToRGBA(gradientColor, gradientOpacity);
        cardPreview.style.background = `linear-gradient(${gradientDirection}, ${bgColor}, ${rgba})`;
    } else {
        cardPreview.style.background = ''; // Clear any existing gradient
        cardPreview.style.backgroundColor = bgColor;
    }

    // Update the gradient opacity value display
    document.getElementById('cardGradientOpacityValue').textContent = document.getElementById('cardGradientOpacity').value;

    updateOutputs();
}

function updateElementStyle() {
    if (selectedElement) {
        const width = document.getElementById('elementWidth').value === 'px' ?
            `${document.getElementById('elementWidthValue').value}px` :
            document.getElementById('elementWidth').value;
        const height = document.getElementById('elementHeight').value === 'px' ?
            `${document.getElementById('elementHeightValue').value}px` :
            document.getElementById('elementHeight').value;

        selectedElement.style.width = width;
        selectedElement.style.height = height;
        selectedElement.style.fontSize = `${document.getElementById('elementFontSize').value}px`;
        selectedElement.style.color = document.getElementById('elementColor').value;
        selectedElement.style.backgroundColor = document.getElementById('elementBgColor').value;
        selectedElement.style.borderWidth = `${document.getElementById('elementBorderWidth').value}px`;
        selectedElement.style.borderStyle = document.getElementById('elementBorderStyle').value;
        selectedElement.style.borderColor = document.getElementById('elementBorderColor').value;
        selectedElement.style.borderRadius = `${document.getElementById('elementBorderRadius').value}px`;
        selectedElement.style.paddingTop = `${document.getElementById('elementPaddingTop').value}px`;
        selectedElement.style.paddingRight = `${document.getElementById('elementPaddingRight').value}px`;
        selectedElement.style.paddingBottom = `${document.getElementById('elementPaddingBottom').value}px`;
        selectedElement.style.paddingLeft = `${document.getElementById('elementPaddingLeft').value}px`;
        selectedElement.style.marginTop = `${document.getElementById('elementMarginTop').value}px`;
        selectedElement.style.marginRight = `${document.getElementById('elementMarginRight').value}px`;
        selectedElement.style.marginBottom = `${document.getElementById('elementMarginBottom').value}px`;
        selectedElement.style.marginLeft = `${document.getElementById('elementMarginLeft').value}px`;

        const boxShadowX = document.getElementById('elementBoxShadowX').value;
        const boxShadowY = document.getElementById('elementBoxShadowY').value;
        const boxShadowBlur = document.getElementById('elementBoxShadowBlur').value;
        const boxShadowColor = document.getElementById('elementBoxShadowColor').value;
        selectedElement.style.boxShadow = `${boxShadowX}px ${boxShadowY}px ${boxShadowBlur}px ${boxShadowColor}`;

        const textShadowX = document.getElementById('elementTextShadowX').value;
        const textShadowY = document.getElementById('elementTextShadowY').value;
        const textShadowBlur = document.getElementById('elementTextShadowBlur').value;
        const textShadowColor = document.getElementById('elementTextShadowColor').value;
        selectedElement.style.textShadow = `${textShadowX}px ${textShadowY}px ${textShadowBlur}px ${textShadowColor}`;

        const animation = document.getElementById('elementAnimation').value;
        const animationDuration = document.getElementById('elementAnimationDuration').value;
        document.getElementById('elementAnimationDurationValue').textContent = animationDuration;

        if (animation) {
            selectedElement.style.transition = `all ${animationDuration}s`;
            selectedElement.dataset.hoverAnimation = animation;
        } else {
            selectedElement.style.transition = '';
            delete selectedElement.dataset.hoverAnimation;
        }

        // Border Radius
        const borderRadius = document.getElementById('elementBorderRadius').value;
        selectedElement.style.borderRadius = `${borderRadius}px`;
        document.getElementById('elementBorderRadiusValue').textContent = borderRadius;

        // Padding
        const paddingProps = ['Top', 'Right', 'Bottom', 'Left'];
        paddingProps.forEach(prop => {
            const value = document.getElementById(`elementPadding${prop}`).value;
            selectedElement.style[`padding${prop}`] = `${value}px`;
            document.getElementById(`elementPadding${prop}Value`).textContent = value;
        });

        // Margin
        const marginProps = ['Top', 'Right', 'Bottom', 'Left'];
        marginProps.forEach(prop => {
            const value = document.getElementById(`elementMargin${prop}`).value;
            selectedElement.style[`margin${prop}`] = `${value}px`;
            document.getElementById(`elementMargin${prop}Value`).textContent = value;
        });

        const parentDisplay = selectedElement.parentElement.style.display;
        if (parentDisplay === 'flex') {
            const flexGrow = document.getElementById('elementFlexGrow').value;
            const flexShrink = document.getElementById('elementFlexShrink').value;
            selectedElement.style.flexGrow = flexGrow;
            selectedElement.style.flexShrink = flexShrink;
            document.getElementById('elementFlexGrowValue').textContent = flexGrow;
            document.getElementById('elementFlexShrinkValue').textContent = flexShrink;
        }

        const text = document.getElementById('elementText').value;
        if (selectedElement.tagName === 'INPUT') {
            selectedElement.value = text;
        } else {
            selectedElement.textContent = text;
        }

        updateOutputs();
    }
}

function hexToRGBA(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

document.getElementById('cardDisplay').addEventListener('change', function() {
    const flexProperties = document.getElementById('cardFlexProperties');
    if (this.value === 'flex') {
        flexProperties.style.display = 'block';
    } else {
        flexProperties.style.display = 'none';
    }
    updateCardStyle();
});

// Add event listeners for real-time updates
const cardPaddingMarginInputs = [
    'cardPaddingTop', 'cardPaddingRight', 'cardPaddingBottom', 'cardPaddingLeft',
    'cardMarginTop', 'cardMarginRight', 'cardMarginBottom', 'cardMarginLeft'
];

cardPaddingMarginInputs.forEach(id => {
    document.getElementById(id).addEventListener('input', updateCardStyle);
});

const elementPaddingMarginInputs = [
    'elementPaddingTop', 'elementPaddingRight', 'elementPaddingBottom', 'elementPaddingLeft',
    'elementMarginTop', 'elementMarginRight', 'elementMarginBottom', 'elementMarginLeft'
];

elementPaddingMarginInputs.forEach(id => {
    document.getElementById(id).addEventListener('input', updateElementStyle);
});

// Add event listeners for animation inputs
document.getElementById('cardAnimation').addEventListener('change', updateCardStyle);
document.getElementById('cardAnimationDuration').addEventListener('input', updateCardStyle);
document.getElementById('elementAnimation').addEventListener('change', updateElementStyle);
document.getElementById('elementAnimationDuration').addEventListener('input', updateElementStyle);

// Add hover event listeners to card and elements
cardPreview.addEventListener('mouseenter', applyAnimation);
cardPreview.addEventListener('mouseleave', removeAnimation);

// Add event listeners for the new inputs
document.getElementById('cardGap').addEventListener('input', updateCardStyle);
document.getElementById('elementFlexGrow').addEventListener('input', updateElementStyle);
document.getElementById('elementFlexShrink').addEventListener('input', updateElementStyle);


// Add these event listeners after your other initialization code
document.getElementById('cardGradient').addEventListener('change', toggleGradientControls);
document.getElementById('cardBgColor').addEventListener('input', updateCardStyle);
document.getElementById('cardGradientColor').addEventListener('input', updateCardStyle);
document.getElementById('cardGradientOpacity').addEventListener('input', updateCardStyle);
document.getElementById('cardGradientDirection').addEventListener('change', updateCardStyle);

function toggleGradientControls() {
    const gradientControls = document.getElementById('gradientControls');
    gradientControls.style.display = this.checked ? 'block' : 'none';
    updateCardStyle();
}

function applyAnimation(event) {
    const target = event.target;
    const animation = target.dataset.hoverAnimation;
    if (animation) {
        target.style.animation = `${animation} ${target.style.transition.split(' ')[1]} forwards`;
    }
}

function removeAnimation(event) {
    const target = event.target;
    target.style.animation = '';
}

// Function to update span value
function updateSpanValue(inputId, spanId) {
    const input = document.getElementById(inputId);
    const span = document.getElementById(spanId);
    span.textContent = input.value;
    
    // Add event listener to update span on input change
    input.addEventListener('input', function() {
        span.textContent = this.value;
    });
}

// Update for card border radius
updateSpanValue('cardBorderRadius', 'cardBorderRadiusValue');

// Update for card box shadow
updateSpanValue('cardBoxShadowX', 'cardBoxShadowXValue');
updateSpanValue('cardBoxShadowY', 'cardBoxShadowYValue');
updateSpanValue('cardBoxShadowBlur', 'cardBoxShadowBlurValue');

// Update for element text shadow
updateSpanValue('elementTextShadowX', 'elementTextShadowXValue');
updateSpanValue('elementTextShadowY', 'elementTextShadowYValue');
updateSpanValue('elementTextShadowBlur', 'elementTextShadowBlurValue');


document.addEventListener('DOMContentLoaded', () => {
    createDefaultCard();
    // Initialize
updateCardStyle();
updateOutputs();
});

