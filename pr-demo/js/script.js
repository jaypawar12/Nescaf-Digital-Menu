const cart = [];
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const searchInput = document.getElementById("search");
const productCards = document.querySelectorAll(".product-card");
const toggleCartButton = document.getElementById("toggle-cart-btn");
const cartSection = document.querySelector(".cart-section");

function updateCart() {
    cartItemsContainer.innerHTML = "";
    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `<span>${item.name}</span> 
                                      <span>$${item.price}</span> 
                                      <span class="quantity">${item.quantity}</span>`;
        cartItemsContainer.appendChild(cartItem);
    });
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: $${totalPrice}`;
}

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
        const productCard = this.closest(".product-card");
        const productName = productCard.querySelector("h6").textContent;
        const productPrice = parseFloat(productCard.querySelector(".text-muted").textContent.replace('$', ''));

        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }

        updateCart();
    });
});

document.getElementById("buy-now-btn").addEventListener("click", function () {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Order placed successfully!");
    cart.length = 0;
    updateCart();
});

toggleCartButton.addEventListener("click", function () {
    cartSection.style.display = cartSection.style.display === "none" ? "block" : "none";
});

searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    productCards.forEach(card => {
        const productName = card.getAttribute('data-name').toLowerCase();
        card.style.display = productName.includes(searchTerm) ? '' : 'none';
    });
});

updateCart();