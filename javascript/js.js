const orderForm = document.getElementById('order-form');
const resetBtn = document.getElementById('reset-btn');
const orderSummary = document.getElementById('order-summary');

const products = [
    {id: 'Saucijzenbroodje', price: 0.90},
    {id: 'Croissant', price: 0.50},
    {id: 'Water', price: 1.50},
    {id: 'Cola', price: 1.70},
];

let order = {};

function updateOrder() {
    order = {};
    products.forEach(product => {
        const quantity = parseInt(document.getElementById(`${product.id}-quantity`).innerText);
        if (quantity > 0) {
            order[product.id] = quantity;
        }
    });
    displayOrder();
}

function displayOrder() {
    let html = '';
    let total = 0;
    for (const [productId, quantity] of Object.entries(order)) {
        const product = products.find(p => p.id === productId);
        const productTotal = product.price * quantity;
        const Price = productTotal.toFixed(2);

        html += `
            <div class="product-row">
                <div class="product-name">${product.id}:</div>
                <div class="product-quantity"> ${quantity} x ${productId}</div>
                <div class="product-price"> € ${Price} </div>
            </div>
        `;
        total += productTotal;
    }
    const formattedTotal = '€ ' + total.toFixed(2) + ' ';
    html += `
        <div class="total-row">
            <div class="total-name">Totaal:</div>
            <div class="total-value">${formattedTotal}</div>
        </div>
    `;
    orderSummary.innerHTML = html;
}

function resetOrder() {
    products.forEach(product => {
        document.getElementById(`${product.id}-quantity`).innerText = 0;
    });
    updateOrder();
}

products.forEach(product => {
    document.getElementById(`${product.id}-plus`).addEventListener('click', () => {
        const quantity = parseInt(document.getElementById(`${product.id}-quantity`).innerText);
        document.getElementById(`${product.id}-quantity`).innerText = quantity + 1;
        updateOrder();
    });
    document.getElementById(`${product.id}-minus`).addEventListener('click', () => {
        const quantity = parseInt(document.getElementById(`${product.id}-quantity`).innerText);
        if (quantity > 0) {
            document.getElementById(`${product.id}-quantity`).innerText = quantity - 1;
        }
        updateOrder();
    });
});

resetBtn.addEventListener('click', resetOrder);

orderForm.addEventListener('submit', e => {
    e.preventDefault();
    resetOrder();
});

resetOrder();