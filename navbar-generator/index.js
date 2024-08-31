document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        // General
        brandName: document.getElementById('brand-name'),
        fontFamily: document.getElementById('font-family'),

        // Colors
        navbarBgColor: document.getElementById('navbar-bg-color'),
        navbarGradient: document.getElementById('navbar-gradient'),
        navbarGradientColor: document.getElementById('navbar-gradient-color'),
        navbarTextColor: document.getElementById('navbar-text-color'),
        menuItemColor: document.getElementById('menu-item-color'),

        // Spacing
        navbarPadding: ['top', 'right', 'bottom', 'left'].map(dir => document.getElementById(`navbar-padding-${dir}`)),
        navbarMargin: ['top', 'right', 'bottom', 'left'].map(dir => document.getElementById(`navbar-margin-${dir}`)),
        menuItemMargin: document.getElementById('menu-item-margin'),
        menuItemPadding: document.getElementById('menu-item-padding'),

        // Border
        navbarBorderWidth: document.getElementById('navbar-border-width'),
        navbarBorderColor: document.getElementById('navbar-border-color'),
        navbarBorderRadius: document.getElementById('navbar-border-radius'),

        // Container
        containerWidth: document.getElementById('container-width'),
        containerBgColor: document.getElementById('container-bg-color'),
        containerPadding: document.getElementById('container-padding'),

        // Positioning
        brandPosition: document.getElementById('brand-position'),
        menuPosition: document.getElementById('menu-position'),
        navbarContentJustify: document.getElementById('navbar-content-justify'),
        navbarContentAlign: document.getElementById('navbar-content-align'),

        // Animation
        navbarAnimation: document.getElementById('navbar-animation'),
        animationOptions: document.getElementById('animation-options'),
        animationDuration: document.getElementById('animation-duration'),
        animationDelay: document.getElementById('animation-delay'),
        animationIterationCount: document.getElementById('animation-iteration-count'),
        animationTimingFunction: document.getElementById('animation-timing-function'),

        // Menu Items
        leftItems: document.querySelector('#left-items .items-list'),
        centerItems: document.querySelector('#center-items .items-list'),
        rightItems: document.querySelector('#right-items .items-list'),
        newItemName: document.getElementById('new-item-name'),
        newItemLink: document.getElementById('new-item-link'),
        newItemPosition: document.getElementById('new-item-position'),
        addItemBtn: document.getElementById('add-item-btn'),

        // Misc
        hoverEffect: document.getElementById('hover-effect'),
        navbarContainer: document.getElementById('navbar-container'),
        outputHtml: document.getElementById('output-html'),
        outputCss: document.getElementById('output-css'),
        outputJs: document.getElementById('output-js'),

        // hover
        hoverType: document.getElementById('hover-type'),
        hoverAnimation: document.getElementById('hover-animation'),
        hoverDuration: document.getElementById('hover-duration'),
        hoverTimingFunction: document.getElementById('hover-timing-function'),

        // submenu
        submenuDepth: document.getElementById('submenu-depth'),
        submenuAnimation: document.getElementById('submenu-animation'),
        submenuIcon: document.getElementById('submenu-icon'),

        // Responsive
        burgerBreakpoint: document.getElementById('burger-breakpoint'),
        burgerColor: document.getElementById('burger-color'),
        burgerBgColor: document.getElementById('burger-bg-color'),

        // preview
        previewBtn: document.getElementById('preview-btn'),
    };

    let menuItems = {
        left: [],
        center: [],
        right: []
    };

    function updateNavbar() {
        const brandName = elements.brandName.value || 'Brand';
        const navbar = generateNavbar(brandName, menuItems);
        elements.navbarContainer.innerHTML = navbar;
        applyStyles();
        generateOutput();
    }

    function addCopyButton(element, buttonText) {
        const button = document.createElement('button');
        button.textContent = buttonText;
        button.className = 'copy-btn';
        button.addEventListener('click', () => copyToClipboard(element, button));
        element.parentNode.insertBefore(button, element.nextSibling);
    }

    function copyToClipboard(element, button) {
        const text = element.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 3000);
        });
    }

    function applyStyles() {
        const styleElement = document.getElementById('preview-styles') || document.createElement('style');
        styleElement.id = 'preview-styles';
        styleElement.textContent = generateCss();
        document.head.appendChild(styleElement);

        const container = document.getElementById('navbar-preview');
        container.style.width = elements.containerWidth.value;
    }

    function generateOutput() {
        elements.outputHtml.textContent = elements.navbarContainer.innerHTML;
        elements.outputCss.textContent = generateCss();
        elements.outputJs.textContent = generateJs();

        if (!elements.outputHtml.nextElementSibling?.classList.contains('copy-btn')) {
            addCopyButton(elements.outputHtml, 'Copy HTML');
        }
        if (!elements.outputCss.nextElementSibling?.classList.contains('copy-btn')) {
            addCopyButton(elements.outputCss, 'Copy CSS');
        }
        if (!elements.outputJs.nextElementSibling?.classList.contains('copy-btn')) {
            addCopyButton(elements.outputJs, 'Copy JS');
        }
    }

    function generateCss() {
        const animation = elements.navbarAnimation.value;
        const animationCSS = generateAnimationCSS(animation);
        const animationProperties = animation !== 'none' ? generateAnimationProperties() : '';
        const responsiveCss = generateResponsiveCss();

        return `
    .generated-navbar {
        font-family: ${elements.fontFamily.value};
        background-color: ${elements.navbarBgColor.value};
        ${elements.navbarGradient.checked ? `background-image: linear-gradient(to right, ${elements.navbarBgColor.value}, ${elements.navbarGradientColor.value});` : 'background-image: none;'}
        color: ${elements.navbarTextColor.value};
        padding: ${elements.navbarPadding.map(el => `${el.value}px`).join(' ')};
        margin: ${elements.navbarMargin.map(el => `${el.value}px`).join(' ')};
        border: ${elements.navbarBorderWidth.value}px solid ${elements.navbarBorderColor.value};
        border-radius: ${elements.navbarBorderRadius.value}px;
        ${animationProperties}
    }
    
    .generated-navbar .navbar-content {
        display: flex;
        justify-content: ${elements.navbarContentJustify.value};
        align-items: ${elements.navbarContentAlign.value};
    }
    
    .generated-navbar .brand {
        font-size: 1.5em;
        font-weight: bold;
        order: ${elements.brandPosition.value === 'left' ? '-1' : elements.brandPosition.value === 'right' ? '1' : '0'};
    }
    
    .generated-navbar ul {
        list-style-type: none;
        display: flex;
        margin: 0;
        padding: 0;
    }
    
    .generated-navbar ul li {
        margin: 0 ${elements.menuItemMargin.value}px;
    }
    
    .generated-navbar ul li a {
        color: ${elements.menuItemColor.value};
        text-decoration: none;
        padding: ${elements.menuItemPadding.value}px;
        transition: all 0.3s ease;
    }
    ${animationCSS}
    ${generateHoverCss()}
    ${responsiveCss}
    `;
    }

    function generateResponsiveCss() {
        const breakpoint = elements.burgerBreakpoint.value;
        const burgerColor = elements.burgerColor.value;

        return `
        @media (max-width: ${breakpoint}px) {
            .generated-navbar .navbar-content {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
            }
            .generated-navbar .brand {
                flex: 1;
            }
            .generated-navbar ul {
                display: none;
                flex-direction: column;
                width: 100%;
                margin-top: 10px;
            }
            .generated-navbar ul.active {
                display: flex;
            }
            .generated-navbar .burger-menu {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                width: 30px;
                height: 25px;
                background: transparent;
                border: none;
                cursor: pointer;
                padding: 0;
            }
            .generated-navbar .burger-menu .bar {
                width: 30px;
                height: 3px;
                background-color: ${burgerColor};
                transition: 0.4s;
            }
            .generated-navbar .burger-menu.active .bar:nth-child(1) {
                transform: rotate(-45deg) translate(-5px, 6px);
            }
            .generated-navbar .burger-menu.active .bar:nth-child(2) {
                opacity: 0;
            }
            .generated-navbar .burger-menu.active .bar:nth-child(3) {
                transform: rotate(45deg) translate(-5px, -6px);
            }
            .generated-navbar ul li {
                margin: 10px 0;
            }
            .generated-navbar ul.active {
                background-color: transparent;
                padding: 20px;
            }
        }
        `;
    }

    function generateAnimationProperties() {
        return `
        animation-name: ${elements.navbarAnimation.value}-animation;
        animation-duration: ${elements.animationDuration.value}s;
        animation-delay: ${elements.animationDelay.value}s;
        animation-iteration-count: ${elements.animationIterationCount.value === 'infinite' ? 'infinite' : elements.animationIterationCount.value};
        animation-timing-function: ${elements.animationTimingFunction.value};
        animation-fill-mode: both;
    `;
    }

    function generateAnimationCSS(animation) {
        switch (animation) {
            case 'fade-in':
                return `
        @keyframes fade-in-animation {
            from { opacity: 0; }
            to { opacity: 1; }
        }`;
            case 'slide-down':
                return `
        @keyframes slide-down-animation {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
        }`;
            case 'slide-up':
                return `
        @keyframes slide-up-animation {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
        }`;
            case 'slide-left':
                return `
        @keyframes slide-left-animation {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }`;
            case 'slide-right':
                return `
        @keyframes slide-right-animation {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
        }`;
            case 'zoom-in':
                return `
        @keyframes zoom-in-animation {
            from { transform: scale(0); }
            to { transform: scale(1); }
        }`;
            case 'bounce':
                return `
        @keyframes bounce-animation {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-30px); }
            60% { transform: translateY(-15px); }
        }`;
            case 'rotate':
                return `
        @keyframes rotate-animation {
            from { transform: rotate(-180deg); }
            to { transform: rotate(0deg); }
        }`;
            case 'flip':
                return `
        @keyframes flip-animation {
            from { transform: perspective(400px) rotateX(90deg); }
            to { transform: perspective(400px) rotateX(0deg); }
        }`;
            case 'swing':
                return `
        @keyframes swing-animation {
            20% { transform: rotate(15deg); }
            40% { transform: rotate(-10deg); }
            60% { transform: rotate(5deg); }
            80% { transform: rotate(-5deg); }
            100% { transform: rotate(0deg); }
        }`;
            case 'elastic':
                return `
            @keyframes elastic-animation {
                0% { transform: scale(0); }
                55% { transform: scale(1.05); }
                70% { transform: scale(0.95); }
                100% { transform: scale(1); }
            }`;
            case 'jello':
                return `
            @keyframes jello-animation {
                0%, 11.1%, 100% { transform: none; }
                22.2% { transform: skewX(-12.5deg) skewY(-12.5deg); }
                33.3% { transform: skewX(6.25deg) skewY(6.25deg); }
                44.4% { transform: skewX(-3.125deg) skewY(-3.125deg); }
                55.5% { transform: skewX(1.5625deg) skewY(1.5625deg); }
                66.6% { transform: skewX(-0.78125deg) skewY(-0.78125deg); }
                77.7% { transform: skewX(0.390625deg) skewY(0.390625deg); }
                88.8% { transform: skewX(-0.1953125deg) skewY(-0.1953125deg); }
            }`;
            case 'rubberBand':
                return `
            @keyframes rubberBand-animation {
                0% { transform: scale(1); }
                30% { transform: scaleX(1.25) scaleY(0.75); }
                40% { transform: scaleX(0.75) scaleY(1.25); }
                50% { transform: scaleX(1.15) scaleY(0.85); }
                65% { transform: scaleX(0.95) scaleY(1.05); }
                75% { transform: scaleX(1.05) scaleY(0.95); }
                100% { transform: scale(1); }
            }`;
            case 'lightSpeedIn':
                return `
            @keyframes lightSpeedIn-animation {
                0% { transform: translateX(100%) skewX(-30deg); opacity: 0; }
                60% { transform: translateX(-20%) skewX(30deg); opacity: 1; }
                80% { transform: translateX(0%) skewX(-15deg); opacity: 1; }
                100% { transform: translateX(0%) skewX(0deg); opacity: 1; }
            }`;
            case 'rollIn':
                return `
            @keyframes rollIn-animation {
                0% { opacity: 0; transform: translateX(-100%) rotate(-120deg); }
                100% { opacity: 1; transform: translateX(0px) rotate(0deg); }
            }`;
            case 'zoomInRotate':
                return `
            @keyframes zoomInRotate-animation {
                0% { opacity: 0; transform: scale(0) rotate(-360deg); }
                100% { opacity: 1; transform: scale(1) rotate(0deg); }
            }`;
            case 'slideExpandUp':
                return `
            @keyframes slideExpandUp-animation {
                0% { transform: translateY(100%) scaleY(0.3); }
                30% { transform: translateY(-8%) scaleY(1.1); }
                50% { transform: translateY(2%) scaleY(0.9); }
                75% { transform: translateY(-1%) scaleY(1.05); }
                100% { transform: translateY(0%) scaleY(1); }
            }`;
            case 'bounceInRotate':
                return `
            @keyframes bounceInRotate-animation {
                0% { opacity: 0; transform: translateY(-2000px) rotate(-720deg); }
                60% { opacity: 1; transform: translateY(30px) rotate(15deg); }
                80% { transform: translateY(-10px) rotate(-5deg); }
                100% { transform: translateY(0) rotate(0deg); }
            }`;
            case 'flipInX':
                return `
            @keyframes flipInX-animation {
                0% { transform: perspective(400px) rotateX(90deg); opacity: 0; }
                40% { transform: perspective(400px) rotateX(-10deg); }
                70% { transform: perspective(400px) rotateX(10deg); }
                100% { transform: perspective(400px) rotateX(0deg); opacity: 1; }
            }`;
            case 'flipInY':
                return `
            @keyframes flipInY-animation {
                0% { transform: perspective(400px) rotateY(90deg); opacity: 0; }
                40% { transform: perspective(400px) rotateY(-10deg); }
                70% { transform: perspective(400px) rotateY(10deg); }
                100% { transform: perspective(400px) rotateY(0deg); opacity: 1; }
            }`;

            case 'glitchAppear':
                return `
                @keyframes glitchAppear-animation {
                    0% { clip-path: inset(50% 0 50% 0); transform: skew(10deg); opacity: 0; }
                    10% { clip-path: inset(0 50% 0 50%); transform: skew(-10deg); opacity: 1; }
                    20% { clip-path: inset(50% 0 50% 0); transform: skew(10deg); }
                    30% { clip-path: inset(0 50% 0 50%); transform: skew(-10deg); }
                    40%, 100% { clip-path: inset(0 0 0 0); transform: skew(0deg); }
                }`;
            case 'neonPulse':
                return `
                @keyframes neonPulse-animation {
                    0% { box-shadow: 0 0 5px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.5), 0 0 15px rgba(255,255,255,0.5), 0 0 20px #ff00de, 0 0 35px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de, 0 0 75px #ff00de; }
                    50% { box-shadow: 0 0 2px rgba(255,255,255,0.5), 0 0 5px rgba(255,255,255,0.5), 0 0 7px rgba(255,255,255,0.5), 0 0 10px #ff00de, 0 0 17px #ff00de, 0 0 20px #ff00de, 0 0 25px #ff00de, 0 0 37px #ff00de; }
                    100% { box-shadow: 0 0 5px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.5), 0 0 15px rgba(255,255,255,0.5), 0 0 20px #ff00de, 0 0 35px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de, 0 0 75px #ff00de; }
                }`;
            case 'liquidReveal':
                return `
                @keyframes liquidReveal-animation {
                    0% { transform: scaleY(0); filter: url('#liquid'); }
                    100% { transform: scaleY(1); filter: url('#liquid'); }
                }`;
            case 'explosionIn':
                return `
                @keyframes explosionIn-animation {
                    0% { transform: scale(0); opacity: 0; }
                    20% { transform: scale(1.2); opacity: 0.2; }
                    40% { transform: scale(0.8); opacity: 0.4; }
                    60% { transform: scale(1.1); opacity: 0.6; }
                    80% { transform: scale(0.9); opacity: 0.8; }
                    100% { transform: scale(1); opacity: 1; }
                }`;
            case 'bounceStretch':
                return `
                @keyframes bounceStretch-animation {
                    0% { transform: scale(0.1, 0.1); }
                    30% { transform: scale(1.5, 0.5); }
                    40% { transform: scale(0.8, 1.2); }
                    50% { transform: scale(1.2, 0.8); }
                    65% { transform: scale(0.9, 1.1); }
                    80% { transform: scale(1.1, 0.9); }
                    100% { transform: scale(1, 1); }
                }`;
            case 'spiralIn':
                return `
                @keyframes spiralIn-animation {
                    0% { transform: rotate(720deg) scale(0); opacity: 0; }
                    100% { transform: rotate(0deg) scale(1); opacity: 1; }
                }`;
            case 'paintDrip':
                return `
                @keyframes paintDrip-animation {
                    0% { clip-path: polygon(0 0, 100% 0, 100% 0, 0 0); }
                    100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
                }`;
            case 'electricSlide':
                return `
                @keyframes electricSlide-animation {
                    0% { transform: translateX(-100%) skew(-10deg); opacity: 0; }
                    30% { transform: translateX(10%) skew(10deg); opacity: 1; }
                    60% { transform: translateX(-5%) skew(-5deg); }
                    100% { transform: translateX(0) skew(0deg); }
                }`;
            case 'dimensionalRift':
                return `
                @keyframes dimensionalRift-animation {
                    0% { transform: rotateX(90deg) translateY(50px); opacity: 0; }
                    30% { transform: rotateX(-10deg) translateY(-10px); opacity: 0.7; }
                    60% { transform: rotateX(10deg) translateY(5px); opacity: 1; }
                    100% { transform: rotateX(0deg) translateY(0); }
                }`;
            default:
                return '';
        }
    }

    function generateHoverCss() {
        const type = elements.hoverType.value;
        const duration = elements.hoverDuration.value;
        const timingFunction = elements.hoverTimingFunction.value;

        let css = `.generated-navbar ul li a { transition: all ${duration}s ${timingFunction}; }`;

        switch (type) {
            case 'underline':
                css += `.generated-navbar ul li a:hover { text-decoration: underline; }`;
                break;
            case 'overline':
                css += `.generated-navbar ul li a:hover { text-decoration: overline; }`;
                break;
            case 'background':
                css += `.generated-navbar ul li a:hover { background-color: ${elements.menuItemColor.value}; color: ${elements.navbarBgColor.value}; }`;
                break;
            case 'text-color':
                css += `.generated-navbar ul li a:hover { color: ${elements.navbarBgColor.value}; }`;
                break;
            case 'border-bottom':
                css += `.generated-navbar ul li a:hover { border-bottom: 2px solid ${elements.menuItemColor.value}; }`;
                break;
            case 'border-top':
                css += `.generated-navbar ul li a:hover { border-top: 2px solid ${elements.menuItemColor.value}; }`;
                break;
            case 'blur':
                css += `.generated-navbar ul li a:hover { filter: blur(1px); }`;
                break;
            case 'glow':
                css += `.generated-navbar ul li a:hover { text-shadow: 0 0 5px ${elements.menuItemColor.value}; }`;
                break;
            case 'shadow':
                css += `.generated-navbar ul li a:hover { text-shadow: 2px 2px 2px rgba(0,0,0,0.3); }`;
                break;
            case 'outline':
                css += `.generated-navbar ul li a:hover { outline: 2px solid ${elements.menuItemColor.value}; outline-offset: 2px; }`;
                break;
            case '3d':
                css += `.generated-navbar ul li a:hover { transform: perspective(500px) rotateX(15deg); }`;
                break;
            case 'neon':
                css += `.generated-navbar ul li a:hover { text-shadow: 0 0 5px ${elements.menuItemColor.value}, 0 0 10px ${elements.menuItemColor.value}, 0 0 15px ${elements.menuItemColor.value}; }`;
                break;
            case 'gradient':
                css += `.generated-navbar ul li a:hover { background-image: linear-gradient(45deg, ${elements.menuItemColor.value}, ${elements.navbarBgColor.value}); -webkit-background-clip: text; color: transparent; }`;
                break;
            case 'slide-bg':
                css += `
                        .generated-navbar ul li a { position: relative; z-index: 1; }
                        .generated-navbar ul li a::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 0;
                            height: 100%;
                            background-color: ${elements.menuItemColor.value};
                            z-index: -1;
                            transition: width ${duration}s ${timingFunction};
                        }
                        .generated-navbar ul li a:hover::before { width: 100%; }
                        .generated-navbar ul li a:hover { color: ${elements.navbarBgColor.value}; }
                    `;
                break;
            case 'shutter':
                css += `
                        .generated-navbar ul li a { position: relative; overflow: hidden; }
                        .generated-navbar ul li a::before, .generated-navbar ul li a::after {
                            content: '';
                            position: absolute;
                            width: 100%;
                            height: 0;
                            background-color: ${elements.menuItemColor.value};
                            transition: height ${duration}s ${timingFunction};
                            z-index: -1;
                        }
                        .generated-navbar ul li a::before { top: 0; left: 0; }
                        .generated-navbar ul li a::after { bottom: 0; right: 0; }
                        .generated-navbar ul li a:hover::before, .generated-navbar ul li a:hover::after { height: 50%; }
                        .generated-navbar ul li a:hover { color: ${elements.navbarBgColor.value}; }
                    `;
                break;
            case 'bubble':
                css += `
                        .generated-navbar ul li a { position: relative; }
                        .generated-navbar ul li a::before {
                            content: '';
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            width: 0;
                            height: 0;
                            background-color: ${elements.menuItemColor.value};
                            border-radius: 50%;
                            transform: translate(-50%, -50%);
                            transition: width ${duration}s ${timingFunction}, height ${duration}s ${timingFunction};
                            z-index: -1;
                        }
                        .generated-navbar ul li a:hover::before {
                            width: 200%;
                            height: 200%;
                        }
                        .generated-navbar ul li a:hover { color: ${elements.navbarBgColor.value}; }
                    `;
                break;
        }

        return css;
    }

    // Add event listeners for the new hover options
    elements.hoverType.addEventListener('change', updateNavbar);
    elements.hoverDuration.addEventListener('input', updateNavbar);
    elements.hoverTimingFunction.addEventListener('change', updateNavbar);

    function generateJs() {
        return `
        document.addEventListener('DOMContentLoaded', () => {
            const navbar = document.querySelector('.generated-navbar');
            const burgerMenu = navbar.querySelector('.burger-menu');
            const menuItems = navbar.querySelectorAll('ul');
    
            burgerMenu.addEventListener('click', () => {
                burgerMenu.classList.toggle('active');
                menuItems.forEach(menu => menu.classList.toggle('active'));
            });
    
            // Existing hover effect code (if any)
            const navItems = navbar.querySelectorAll('ul li a');
            navItems.forEach(item => {
            });
        });
        `;
    }

    elements.burgerBreakpoint.addEventListener('input', updateNavbar);
    elements.burgerColor.addEventListener('input', updateNavbar);

    function addMenuItem() {
        const name = elements.newItemName.value;
        const link = elements.newItemLink.value;
        const position = elements.newItemPosition.value;

        if (name && link) {
            const item = { name, link, submenu: [] };
            menuItems[position].push(item);
            renderMenuItems();
            updateNavbar();
            elements.newItemName.value = '';
            elements.newItemLink.value = '';
        }
    }

    function renderMenuItems() {
        ['left', 'center', 'right'].forEach(position => {
            const container = elements[`${position}Items`];
            container.innerHTML = '';
            menuItems[position].forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.className = 'menu-item';
                itemElement.innerHTML = `
                    <input type="text" class="item-name" value="${item.name}">
                    <input type="text" class="item-link" value="${item.link}">
                    <button class="remove-item-btn"><i class="fas fa-trash"></i></button>
                `;

                const nameInput = itemElement.querySelector('.item-name');
                const linkInput = itemElement.querySelector('.item-link');
                const removeBtn = itemElement.querySelector('.remove-item-btn');

                nameInput.addEventListener('input', () => {
                    item.name = nameInput.value;
                    updateNavbar();
                });

                linkInput.addEventListener('input', () => {
                    item.link = linkInput.value;
                    updateNavbar();
                });

                removeBtn.addEventListener('click', () => {
                    menuItems[position].splice(index, 1);
                    renderMenuItems();
                    updateNavbar();
                });

                container.appendChild(itemElement);
            });
        });
    }

    elements.navbarAnimation.addEventListener('change', () => {
        elements.animationOptions.style.display = elements.navbarAnimation.value === 'none' ? 'none' : 'block';
        updateNavbar();
    });

    [elements.animationDuration, elements.animationDelay, elements.animationIterationCount, elements.animationTimingFunction].forEach(element => {
        element.addEventListener('input', updateNavbar);
    });

    Object.values(elements).forEach(element => {
        if (element instanceof HTMLElement) {
            element.addEventListener('input', updateNavbar);
        } else if (Array.isArray(element)) {
            element.forEach(el => el.addEventListener('input', updateNavbar));
        }
    });

    elements.addItemBtn.addEventListener('click', addMenuItem);

    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });

    // Initialize
    updateNavbar();

    function openPreviewInNewTab() {
        const brandName = elements.brandName.value || 'Brand';
        const navbar = generateNavbar(brandName, menuItems);
        const styles = generateCss();
        const script = generateJs();

        const previewHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Navbar Preview</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
            }
            ${styles}
        </style>
    </head>
    <body>
        ${navbar}
        <div style="padding: 20px;">
            <h1>Navbar Preview</h1>
            <p>This is a preview of your custom navbar design.</p>
        </div>
        <script>
        ${script}
        </script>
    </body>
    </html>
        `;

        const previewWindow = window.open();
        previewWindow.document.write(previewHTML);
        previewWindow.document.close();
    }

    elements.previewBtn.addEventListener('click', openPreviewInNewTab);

});

function generateNavbar(brandName, menuItems) {
    const generateMenuItemsHtml = (items) => {
        return items.map(item => `
            <li>
                <a href="${item.link}">
                    ${item.name}
                    ${item.submenu && item.submenu.length > 0 ? `<i class="bi bi-${elements.submenuIcon.value}"></i>` : ''}
                </a>
                ${item.submenu && item.submenu.length > 0 ? `<ul>${generateMenuItemsHtml(item.submenu)}</ul>` : ''}
            </li>
        `).join('');
    };

    const leftItemsHtml = generateMenuItemsHtml(menuItems.left);
    const centerItemsHtml = generateMenuItemsHtml(menuItems.center);
    const rightItemsHtml = generateMenuItemsHtml(menuItems.right);

    return `
        <nav class="generated-navbar">
            <div class="navbar-content">
                <div class="brand">${brandName}</div>
                <div class="burger-menu">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
                <ul class="left-items">${leftItemsHtml}</ul>
                <ul class="center-items">${centerItemsHtml}</ul>
                <ul class="right-items">${rightItemsHtml}</ul>
            </div>
        </nav>`
}