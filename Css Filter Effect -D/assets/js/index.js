// Output the code, display the image, and apply the new design
document.addEventListener('DOMContentLoaded', function() {
    const image = document.getElementById('preview');
    const fileInput = document.getElementById('fileInput');

    // Filter controls
    const blurControl = document.getElementById('blur');
    const brightnessControl = document.getElementById('brightness');
    const contrastControl = document.getElementById('contrast');
    const grayscaleControl = document.getElementById('grayscale');
    const saturationControl = document.getElementById('saturation');
    const hueRotateControl = document.getElementById('hue-rotate');
    const sepiaControl = document.getElementById('sepia');
    const opacityControl = document.getElementById('opacity');
    const invertControl = document.getElementById('invert');

    // Drop Shadow controls
    const dropShadowXControl = document.getElementById('drop-shadow-x');
    const dropShadowYControl = document.getElementById('drop-shadow-y');
    const dropShadowBlurControl = document.getElementById('drop-shadow-blur');
    const dropShadowColorControl = document.getElementById('drop-shadow-color');

    // Transform controls
    const rotateControl = document.getElementById('rotate');
    const scaleControl = document.getElementById('scale');
    const translateXControl = document.getElementById('translate-x');
    const translateYControl = document.getElementById('translate-y');
    const skewXControl = document.getElementById('skew-x');
    const skewYControl = document.getElementById('skew-y');

    // Image dimensions controls
    const borderRadiusControl = document.getElementById('border-radius');
    const widthControl = document.getElementById('width');
    const heightControl = document.getElementById('height');

    // Clip Path control
    const clipPathControl = document.getElementById('clip-path');

    function updateFilters() {
        const blur = blurControl.value;
        const brightness = brightnessControl.value;
        const contrast = contrastControl.value;
        const grayscale = grayscaleControl.value;
        const saturation = saturationControl.value;
        const hueRotate = hueRotateControl.value;
        const sepia = sepiaControl.value;
        const opacity = opacityControl.value;
        const invert = invertControl.checked ? 'invert(1)' : 'invert(0)';

        const dropShadowX = dropShadowXControl.value;
        const dropShadowY = dropShadowYControl.value;
        const dropShadowBlur = dropShadowBlurControl.value;
        const dropShadowColor = dropShadowColorControl.value;
        const dropShadow = `drop-shadow(${dropShadowX}px ${dropShadowY}px ${dropShadowBlur}px ${dropShadowColor})`;

        const rotate = rotateControl.value;
        const scale = scaleControl.value;
        const translateX = translateXControl.value;
        const translateY = translateYControl.value;
        const skewX = skewXControl.value;
        const skewY = skewYControl.value;
        const transform = `rotate(${rotate}deg) scale(${scale}) translate(${translateX}px, ${translateY}px) skew(${skewX}deg, ${skewY}deg)`;

        const borderRadius = borderRadiusControl.value;
        const width = widthControl.value;
        const height = heightControl.value;

        const clipPath = clipPathControl.value;

        image.style.filter = `
            blur(${blur}px)
            brightness(${brightness})
            contrast(${contrast})
            grayscale(${grayscale})
            saturate(${saturation})
            hue-rotate(${hueRotate}deg)
            sepia(${sepia})
            opacity(${opacity})
            ${invert}
            ${dropShadow}
        `;

        image.style.transform = transform;
        image.style.borderRadius = `${borderRadius}%`;
        image.style.width = `${width}%`;
        image.style.height = `${height}%`;
        image.style.clipPath = clipPath;

        updateCode();
    }

    function updateCode() {
        const codeTextarea = document.getElementById('textarea_code');
        const styles = image.style.cssText.split('; ').join(';\n');
        codeTextarea.value = `${styles}`;
    }

    function previewImage(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                image.src = e.target.result;
                image.style.display = 'block';
                document.getElementById('placeholder').style.display = 'none';
                updateFilters();
            };
            reader.readAsDataURL(file);
        }
    }

    // Add event listeners
    blurControl.addEventListener('input', updateFilters);
    brightnessControl.addEventListener('input', updateFilters);
    contrastControl.addEventListener('input', updateFilters);
    grayscaleControl.addEventListener('input', updateFilters);
    saturationControl.addEventListener('input', updateFilters);
    hueRotateControl.addEventListener('input', updateFilters);
    sepiaControl.addEventListener('input', updateFilters);
    opacityControl.addEventListener('input', updateFilters);
    invertControl.addEventListener('change', updateFilters);
    dropShadowXControl.addEventListener('input', updateFilters);
    dropShadowYControl.addEventListener('input', updateFilters);
    dropShadowBlurControl.addEventListener('input', updateFilters);
    dropShadowColorControl.addEventListener('input', updateFilters);
    rotateControl.addEventListener('input', updateFilters);
    scaleControl.addEventListener('input', updateFilters);
    translateXControl.addEventListener('input', updateFilters);
    translateYControl.addEventListener('input', updateFilters);
    skewXControl.addEventListener('input', updateFilters);
    skewYControl.addEventListener('input', updateFilters);
    borderRadiusControl.addEventListener('input', updateFilters);
    widthControl.addEventListener('input', updateFilters);
    heightControl.addEventListener('input', updateFilters);
    clipPathControl.addEventListener('input', updateFilters);
    fileInput.addEventListener('change', previewImage);
});


// change the input value
document.addEventListener('DOMContentLoaded', (event) => {
    const inputIds = [
        'blur', 'brightness', 'contrast', 'grayscale', 'saturation', 'hue-rotate', 'sepia', 'opacity', 
        'drop-shadow-x', 'drop-shadow-y', 'drop-shadow-blur', 
        'rotate', 'scale', 'translate-x', 'translate-y', 'skew-x', 'skew-y',
        'border-radius', 'width', 'height'
    ];

    const pxUnits = ['blur', 'drop-shadow-x', 'drop-shadow-y', 'drop-shadow-blur', 'translate-x', 'translate-y'];
    const degUnits = ['rotate', 'hue-rotate', 'skew-x', 'skew-y'];
    const percentageUnits = ['border-radius', 'width', 'height'];

    inputIds.forEach(id => {
        const input = document.getElementById(id);
        const valueSpan = document.createElement('span');
        valueSpan.className = 'range-value';
        let unit = '';
        if (pxUnits.includes(id)) {
            unit = 'px';
        } else if (degUnits.includes(id)) {
            unit = 'deg';
        } else if (percentageUnits.includes(id)) {
            unit = '%';
        }
        valueSpan.textContent = input.value + unit;
        valueSpan.style.color = 'orangered';
        input.parentNode.querySelector('label').appendChild(valueSpan);

        input.addEventListener('input', () => {
            valueSpan.textContent = input.value + unit;
        });
    });
});



// copy code action
document.addEventListener("DOMContentLoaded", function () {
    const copyButton = document.getElementById("copy-css");
    const cssOutput = document.getElementById('textarea_code');
    let click = false;

    copyButton.addEventListener("click", function () {
        try {
            navigator.clipboard.writeText(cssOutput.value).then(function () {
                if (click === false) {
                    setTimeout(function () {
                        copyButton.innerHTML = '';
                        copyButton.append('Copied!');
                        copyButton.style.cursor = 'not-allowed';

                        click = true;
                    }, 0);

                    setTimeout(function () {
                        copyButton.innerHTML = '';
                        copyButton.append('Copy Code');
                        copyButton.style.cursor = 'pointer';

                        click = false;
                    }, 1500);
                }
            });
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    });
});


// download the image
document.addEventListener("DOMContentLoaded", function () {
    const image = document.getElementById('preview');
    const downloadButton = document.getElementById('downloadButton');

    downloadButton.addEventListener('click', function() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const width = image.width;
        const height = image.height;

        canvas.width = width;
        canvas.height = height;

        context.filter = image.style.filter;
        context.drawImage(image, 0, 0, width, height);

        canvas.toBlob(function(blob) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'filtered-image.png';
            link.click();
        }, 'image/png');
    });
});

const sidebar = document.querySelector('.controls');
const toggleButton = document.querySelector('.toggle-button'); // Add a toggle button in your HTML if needed

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});