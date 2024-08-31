document.addEventListener('DOMContentLoaded', function () {
    generateGrid();
    document.getElementById('sidebar').classList.add('open'); // Open the sidebar by default
});

document.getElementById('generate-grid').addEventListener('click', generateGrid);

function generateGrid() {
    const rows = parseInt(document.getElementById('rows').value, 10);
    const columns = parseInt(document.getElementById('columns').value, 10);
    const rowGap = `${document.getElementById('row-gap').value}px`;
    const columnGap = `${document.getElementById('column-gap').value}px`;

    const gridPreview = document.getElementById('grid-preview');
    updateGridStyles(gridPreview, rows, columns, rowGap, columnGap);
    populateGridItems(gridPreview, rows, columns);
    displayGeneratedCSS(rows, columns, rowGap, columnGap);
}

function updateGridStyles(gridElement, rows, columns, rowGap, columnGap) {
    gridElement.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    gridElement.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    gridElement.style.rowGap = rowGap;
    gridElement.style.columnGap = columnGap;
}

function populateGridItems(gridElement, rows, columns) {
    gridElement.innerHTML = '';
    for (let i = 0; i < rows * columns; i++) {
        const item = document.createElement('div');
        item.className = 'grid-item';
        item.contentEditable = true; // Allow users to edit content
        item.textContent = `Item ${i + 1}`;
        gridElement.appendChild(item);
    }
}

function displayGeneratedCSS(rows, columns, rowGap, columnGap) {
    const cssCode = `
#grid-preview {
    display: grid;
    grid-template-rows: repeat(${rows}, 1fr);
    grid-template-columns: repeat(${columns}, 1fr);
    row-gap: ${rowGap};
    column-gap: ${columnGap};
}`;
    document.getElementById('css-output').textContent = cssCode;
    document.getElementById('modal-title').textContent = 'Generated CSS:';
}

function displayTailwindCSS(rows, columns, rowGap, columnGap) {
    const tailwindCode = `
<div class="grid grid-rows-${rows} grid-cols-${columns} gap-y-${parseInt(rowGap)} gap-x-${parseInt(columnGap)}">
    <!-- Grid items here -->
</div>`;
    document.getElementById('css-output').textContent = tailwindCode;
    document.getElementById('modal-title').textContent = 'Generated Tailwind CSS:';
}

function displayBootstrapCSS(rows, columns, rowGap, columnGap) {
    const bootstrapCode = `
<div class="d-grid" style="grid-template-rows: repeat(${rows}, 1fr); grid-template-columns: repeat(${columns}, 1fr); row-gap: ${rowGap}; column-gap: ${columnGap};">
    <!-- Grid items here -->
</div>`;
    document.getElementById('css-output').textContent = bootstrapCode;
    document.getElementById('modal-title').textContent = 'Generated Bootstrap CSS:';
}

function displayResponsiveCSS(rows, columns, rowGap, columnGap) {
    const cssCode = `
@media (max-width: 600px) {
    #grid-preview {
        grid-template-rows: repeat(${Math.ceil(rows / 2)}, 1fr);
        grid-template-columns: repeat(${Math.ceil(columns / 2)}, 1fr);
    }
}
@media (min-width: 601px) and (max-width: 1200px) {
    #grid-preview {
        grid-template-rows: repeat(${rows}, 1fr);
        grid-template-columns: repeat(${columns}, 1fr);
    }
}
@media (min-width: 1201px) {
    #grid-preview {
        grid-template-rows: repeat(${rows * 2}, 1fr);
        grid-template-columns: repeat(${columns * 2}, 1fr);
    }
}`;
    document.getElementById('css-output').textContent = cssCode;
    document.getElementById('modal-title').textContent = 'Generated Responsive CSS:';
}

function showModal() {
    document.getElementById('css-modal').style.display = 'block';
}

function hideModal() {
    document.getElementById('css-modal').style.display = 'none';
}

function showTemporaryMessage(button, message) {
    const originalText = button.textContent;
    button.textContent = message;
    setTimeout(() => {
        button.textContent = originalText;
    }, 3000);
}

document.getElementById('copy-css').addEventListener('click', function () {
    const cssCode = document.getElementById('css-output').textContent;
    navigator.clipboard.writeText(cssCode).then(() => {
        showTemporaryMessage(this, 'Copied!');
    });
});

document.getElementById('export-css').addEventListener('click', function () {
    const cssCode = document.getElementById('css-output').textContent;
    const blob = new Blob([cssCode], { type: 'text/css' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'grid-layout.css';
    link.click();
    showTemporaryMessage(this, 'Exported!');
});

document.getElementById('export-json').addEventListener('click', function () {
    const config = {
        rows: document.getElementById('rows').value,
        columns: document.getElementById('columns').value,
        rowGap: document.getElementById('row-gap').value,
        columnGap: document.getElementById('column-gap').value,
        items: Array.from(document.querySelectorAll('.grid-item')).map(item => ({
            content: item.innerHTML,
            style: item.getAttribute('style')
        }))
    };
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'grid-config.json';
    link.click();
    showTemporaryMessage(this, 'Exported!');
});

document.getElementById('show-css').addEventListener('click', function () {
    const rows = parseInt(document.getElementById('rows').value, 10);
    const columns = parseInt(document.getElementById('columns').value, 10);
    const rowGap = `${document.getElementById('row-gap').value}px`;
    const columnGap = `${document.getElementById('column-gap').value}px`;
    displayGeneratedCSS(rows, columns, rowGap, columnGap);
    showModal();
});

document.getElementById('show-tailwind').addEventListener('click', function () {
    const rows = parseInt(document.getElementById('rows').value, 10);
    const columns = parseInt(document.getElementById('columns').value, 10);
    const rowGap = `${document.getElementById('row-gap').value}px`;
    const columnGap = `${document.getElementById('column-gap').value}px`;
    displayTailwindCSS(rows, columns, rowGap, columnGap);
    showModal();
});

document.getElementById('show-responsive').addEventListener('click', function () {
    const rows = parseInt(document.getElementById('rows').value, 10);
    const columns = parseInt(document.getElementById('columns').value, 10);
    const rowGap = `${document.getElementById('row-gap').value}px`;
    const columnGap = `${document.getElementById('column-gap').value}px`;
    displayResponsiveCSS(rows, columns, rowGap, columnGap);
    showModal();
});

document.getElementById('save-config').addEventListener('click', function () {
    const config = {
        rows: document.getElementById('rows').value,
        columns: document.getElementById('columns').value,
        rowGap: document.getElementById('row-gap').value,
        columnGap: document.getElementById('column-gap').value
    };
    localStorage.setItem('gridConfig', JSON.stringify(config));
    showTemporaryMessage(this, 'Saved!');
});

document.getElementById('load-config').addEventListener('click', function () {
    const config = JSON.parse(localStorage.getItem('gridConfig'));
    if (config) {
        document.getElementById('rows').value = config.rows;
        document.getElementById('columns').value = config.columns;
        document.getElementById('row-gap').value = config.rowGap;
        document.getElementById('column-gap').value = config.columnGap;
        generateGrid(); // Automatically generate the grid after loading the configuration
        showTemporaryMessage(this, 'Loaded!');
    } else {
        showTemporaryMessage(this, 'No Config Found');
    }
});

document.getElementById('toggle-sidebar').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open');
});

// Modal functionality
const modal = document.getElementById('css-modal');
const closeModal = document.querySelector('.modal .close');

closeModal.addEventListener('click', hideModal);

window.addEventListener('click', function (event) {
    if (event.target === modal) {
        hideModal();
    }
});