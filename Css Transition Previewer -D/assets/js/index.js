document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('textarea_code');
    const previewBox = document.getElementById('preview-box');
    const resetButton = document.getElementById('reset-transition');
    const bgColor = document.getElementById('bgColor'); 

    bgColor.addEventListener('input', function() {
        previewBox.style.cssText = `background-color: ${bgColor.value}; width: 10rem; height: 10rem; border-radius: 0.25rem;`;        
    });

    // Width transition controls
    const widthControl = document.getElementById('width');
    const widthValueControl = document.getElementById('widthValue');
    const widthDurationControl = document.getElementById('widthDuration');
    const widthDelayControl = document.getElementById('widthDelay');
    const widthTimingFunctionControl = document.getElementById('widthTimingFunction');
    const widthHoverControl = document.getElementById('widthHover');
    const widthFocusControl = document.getElementById('widthFocus');

    // Height transition controls
    const heightControl = document.getElementById('height');
    const heightValueControl = document.getElementById('heightValue');
    const heightDurationControl = document.getElementById('heightDuration');
    const heightDelayControl = document.getElementById('heightDelay');
    const heightTimingFunctionControl = document.getElementById('heightTimingFunction');
    const heightHoverControl = document.getElementById('heightHover');
    const heightFocusControl = document.getElementById('heightFocus');

    // Background color transition controls
    const bgColorControl = document.getElementById('background-color');
    const bgColorPicker = document.getElementById('bgColorPicker');
    const bgColorDurationControl = document.getElementById('bgColorDuration');
    const bgColorDelayControl = document.getElementById('bgColorDelay');
    const bgColorTimingFunctionControl = document.getElementById('bgColorTimingFunction');
    const bgColorHoverControl = document.getElementById('bgColorHover');
    const bgColorFocusControl = document.getElementById('bgColorFocus');

    // Transform transition controls
    const transformControl = document.getElementById('transform');
    const transformDurationControl = document.getElementById('transformDuration');
    const transformDelayControl = document.getElementById('transformDelay');
    const transformRotateControl = document.getElementById('transformRotate');
    const transformScaleControl = document.getElementById('transformScale');
    const translateXControl = document.getElementById('translate-x');
    const translateYControl = document.getElementById('translate-y');
    const transformSkewXControl = document.getElementById('transformSkewX');
    const transformSkewYControl = document.getElementById('transformSkewY');
    const transformTimingFunctionControl = document.getElementById('transformTimingFunction');
    const transformHoverControl = document.getElementById('transformHover');
    const transformFocusControl = document.getElementById('transformFocus');

    // Opacity transition controls
    const opacityControl = document.getElementById('opacity');
    const opacityValueControl = document.getElementById('opacityValue');
    const opacityDurationControl = document.getElementById('opacityDuration');
    const opacityDelayControl = document.getElementById('opacityDelay');
    const opacityTimingFunctionControl = document.getElementById('opacityTimingFunction');
    const opacityHoverControl = document.getElementById('opacityHover');
    const opacityFocusControl = document.getElementById('opacityFocus');

    function changeBoxStyle(transitionStyles, hoverStyles, focusStyles) {
        // Function to reset styles
        function resetStyles() {
            previewBox.style.transition = '';
            previewBox.style.backgroundColor = '';
            previewBox.style.width = '';
            previewBox.style.height = '';
            previewBox.style.borderRadius = '';
            previewBox.style.transform = '';
        
            previewBox.style.transition = 'all 1s ease-out';
            previewBox.style.backgroundColor = bgColor.value;
            previewBox.style.width = '10rem';
            previewBox.style.height = '10rem';
            previewBox.style.borderRadius = '0.25rem';
            previewBox.style.transform = 'rotate(0deg) skewX(0deg) skewY(0deg) scale(1) translateX(0) translateY(0)';
        }
    
        // Function to handle mouse enter
        function handleMouseEnter() {
            previewBox.style.transition = '';
            previewBox.style.cssText = '';

            previewBox.style.transition = transitionStyles;
            previewBox.style.cssText += hoverStyles;
        }
    
        // Function to handle mouse leave
        function handleMouseLeave() {
            resetStyles();
        }
    
        // Function to handle focus
        function handleFocus() {
            previewBox.style.transition = '';
            previewBox.style.cssText = '';

            previewBox.style.transition = transitionStyles;
            previewBox.style.cssText += focusStyles;
        }
    
        // Function to handle blur
        function handleBlur() {
            resetStyles();
        }

        if (hoverStyles) {
            previewBox.addEventListener('mouseenter', handleMouseEnter);
            previewBox.addEventListener('mouseleave', handleMouseLeave);
        } else {
            previewBox.addEventListener('mouseenter', resetStyles);
        }

        if (focusStyles) {
            previewBox.addEventListener('focus', handleFocus);
            previewBox.addEventListener('blur', handleBlur);
        } else {
            previewBox.addEventListener('focus', resetStyles);
        }

    }
    

    function updateStyles() {
        let transitionStyles = '';
        let hoverStyles = '';
        let focusStyles = '';

        // Width
        if (widthControl.checked) {
            const widthValue = widthValueControl.value;
            const widthDuration = widthDurationControl.value;
            const widthDelay = widthDelayControl.value;
            const widthTimingFunction = widthTimingFunctionControl.value;

            transitionStyles += `width ${widthDuration}s ${widthTimingFunction} ${widthDelay}s,`;

            if (widthHoverControl.checked) {
                hoverStyles += `  width: ${widthValue}px;\n`;
            } else {
                hoverStyles += '';
            }
    
            if (widthFocusControl.checked) {
                focusStyles += `  width: ${widthValue}px;\n`;
            }  else {
                focusStyles += '';
            }
        } else {
            transitionStyles += '';
        }

        // Height
        if (heightControl.checked) {
            const heightValue = heightValueControl.value;
            const heightDuration = heightDurationControl.value;
            const heightDelay = heightDelayControl.value;
            const heightTimingFunction = heightTimingFunctionControl.value;

            transitionStyles += `height ${heightDuration}s ${heightTimingFunction} ${heightDelay}s,`;

            if (heightHoverControl.checked) {
                hoverStyles += `  height: ${heightValue}px;\n`;
            } else {
                hoverStyles += '';
            }

            if (heightFocusControl.checked) {
                focusStyles += `  height: ${heightValue}px;\n`;
            } else {
                focusStyles += '';
            }
        } else {
            transitionStyles += '';
        }

        // Background color
        if (bgColorControl.checked) {
            const bgColorValue = bgColorPicker.value;
            const bgColorDuration = bgColorDurationControl.value;
            const bgColorDelay = bgColorDelayControl.value;
            const bgColorTimingFunction = bgColorTimingFunctionControl.value;

            transitionStyles += `background-color ${bgColorDuration}s ${bgColorTimingFunction} ${bgColorDelay}s,`;

            if (bgColorHoverControl.checked) {
                hoverStyles += `  background-color: ${bgColorValue};\n`;
            } else {
                hoverStyles += '';
            }

            if (bgColorFocusControl.checked) {
                focusStyles += `  background-color: ${bgColorValue};\n`;
            } else {
                focusStyles += '';
            }
        } else {
            transitionStyles += '';
        }

        // Transform
        if (transformControl.checked) {
            const transformDuration = transformDurationControl.value;
            const transformDelay = transformDelayControl.value;
            const transformRotate = transformRotateControl.value;
            const transformScale = transformScaleControl.value;
            const translateX = translateXControl.value;
            const translateY = translateYControl.value;
            const transformSkewX = transformSkewXControl.value;
            const transformSkewY = transformSkewYControl.value;
            const transformTimingFunction = transformTimingFunctionControl.value;

            transitionStyles += `transform ${transformDuration}s ${transformTimingFunction} ${transformDelay}s,`;

            if (transformHoverControl.checked) {
                hoverStyles += `  transform: scale(${transformScale}) rotate(${transformRotate}deg) translateX(${translateX}px) translateY(${translateY}px) skewX(${transformSkewX}deg) skewY(${transformSkewY}deg);\n`;
            } else {
                hoverStyles += '';
            }

            if (transformFocusControl.checked) {
                focusStyles += `  transform: scale(${transformScale}) rotate(${transformRotate}deg) translateX(${translateX}px) translateY(${translateY}px) skewX(${transformSkewX}deg) skewY(${transformSkewY}deg);\n`;
            } else {
                focusStyles += '';
            }
        } else {
            transitionStyles += '';
        }

        // Opacity
        if (opacityControl.checked) {
            const opacityValue = opacityValueControl.value;
            const opacityDuration = opacityDurationControl.value;
            const opacityDelay = opacityDelayControl.value;
            const opacityTimingFunction = opacityTimingFunctionControl.value;
            
            transitionStyles += `opacity ${opacityDuration}s ${opacityTimingFunction} ${opacityDelay}s,`;

            if (opacityHoverControl.checked) {
                hoverStyles += ` opacity: ${opacityValue};\n`;
            } else {
                hoverStyles += '';
            }

            if (opacityFocusControl.checked) {
                focusStyles += ` opacity: ${opacityValue};\n`;
            } else {
                focusStyles += '';
            }
        } else {
            transitionStyles += '';
        }

        transitionStyles = transitionStyles.replace(/,\s*$/, '');

       // Apply styles to preview box
       changeBoxStyle(transitionStyles, hoverStyles, focusStyles);

        // Combine styles
        textarea.textContent = `#preview-box {\n  transition: ${transitionStyles};\n}\n\n#preview-box:hover {\n${hoverStyles}}\n\n#preview-box:focus {\n${focusStyles}}`;
    }

    // Event listeners for individual controls
    widthControl.addEventListener('change', updateStyles);
    widthValueControl.addEventListener('input', updateStyles);
    widthDurationControl.addEventListener('input', updateStyles);
    widthDelayControl.addEventListener('input', updateStyles);
    widthTimingFunctionControl.addEventListener('input', updateStyles);
    widthHoverControl.addEventListener('change', updateStyles);
    widthFocusControl.addEventListener('change', updateStyles);

    heightControl.addEventListener('change', updateStyles);
    heightValueControl.addEventListener('input', updateStyles);
    heightDurationControl.addEventListener('input', updateStyles);
    heightDelayControl.addEventListener('input', updateStyles);
    heightTimingFunctionControl.addEventListener('input', updateStyles);
    heightHoverControl.addEventListener('change', updateStyles);
    heightFocusControl.addEventListener('change', updateStyles);

    bgColorControl.addEventListener('change', updateStyles);
    bgColorPicker.addEventListener('input', updateStyles);
    bgColorDurationControl.addEventListener('input', updateStyles);
    bgColorDelayControl.addEventListener('input', updateStyles);
    bgColorTimingFunctionControl.addEventListener('input', updateStyles);
    bgColorHoverControl.addEventListener('change', updateStyles);
    bgColorFocusControl.addEventListener('change', updateStyles);

    transformControl.addEventListener('change', updateStyles);
    transformDurationControl.addEventListener('input', updateStyles);
    transformDelayControl.addEventListener('input', updateStyles);
    transformRotateControl.addEventListener('input', updateStyles);
    transformScaleControl.addEventListener('input', updateStyles);
    translateXControl.addEventListener('input', updateStyles);
    translateYControl.addEventListener('input', updateStyles);
    transformSkewXControl.addEventListener('input', updateStyles);
    transformSkewYControl.addEventListener('input', updateStyles);
    transformTimingFunctionControl.addEventListener('input', updateStyles);
    transformHoverControl.addEventListener('change', updateStyles);
    transformFocusControl.addEventListener('change', updateStyles);

    opacityControl.addEventListener('change', updateStyles);
    opacityValueControl.addEventListener('input', updateStyles);
    opacityDurationControl.addEventListener('input', updateStyles);
    opacityDelayControl.addEventListener('input', updateStyles);
    opacityTimingFunctionControl.addEventListener('input', updateStyles);
    opacityHoverControl.addEventListener('change', updateStyles);
    opacityFocusControl.addEventListener('change', updateStyles);



    // display change for inputs values
    function handleValues() {
        const inputIds = [
            'widthValue',
            'widthDuration',
            'widthDelay',
            'heightValue',
            'heightDuration',
            'heightDelay',
            'bgColorDuration',
            'bgColorDelay',
            'transformDuration',
            'transformDelay',
            'transformRotate',
            'transformScale',
            'translate-x',
            'translate-y',
            'transformSkewX',
            'transformSkewY',
            'opacityValue',
            'opacityDuration',
            'opacityDelay'
        ];
      
        inputIds.forEach(id => { 
            const input = document.getElementById(id);
            const valueSpan = document.createElement('span');

            valueSpan.textContent = '';

            valueSpan.className = 'range-value';
            valueSpan.textContent = input.value;

            if(input.parentNode.querySelector('label').querySelector('span')) {
                const span = input.parentNode.querySelector('label').querySelector('span');

                span.textContent = '';
                span.textContent = input.value;
            } else {
                input.parentNode.querySelector('label').appendChild(valueSpan);
            }
      
            input.addEventListener('input', () => {
                valueSpan.textContent = input.value;
            });
        });
    }
    handleValues();

    // reset all
    resetButton.addEventListener('click', function() {
        // previewBox.style = '';
        document.querySelectorAll('input[type=range], input[type=color]').forEach(input => input.value = input.getAttribute('value'));
        document.querySelectorAll('input[type=checkbox]').forEach(checkbox => checkbox.checked = false);
        document.querySelectorAll('select').forEach(select => select.selectedIndex = 0);
        updateStyles();
        handleValues();
    });

    // Initial style update
    updateStyles();
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

// sidebar
const sidebar = document.querySelector('.controls');
const toggleButton = document.querySelector('.toggle-button');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});