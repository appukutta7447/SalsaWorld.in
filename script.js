let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function addToCart(name, price){
    let existing = cart.find(item => item.name === name);

    if(existing){
        existing.qty++;
    } else {
        cart.push({name, price, qty:1});
    }

    saveCart();
    alert("Added to cart");
}

function updateCartCount(){
    let count = cart.reduce((sum,item)=> sum + item.qty,0);
    let badge = document.getElementById("cart-count");
    if(badge) badge.innerText = count;
}

function changeQty(index, amount){
    cart[index].qty += amount;
    if(cart[index].qty <= 0){
        cart.splice(index,1);
    }
    saveCart();
    loadCart();
}

function removeItem(index){
    cart.splice(index,1);
    saveCart();
    loadCart();
}

function loadCart(){
    let container = document.getElementById("cart-items");
    if(!container) return;

    container.innerHTML="";
    let total = 0;
    let totalItems = 0;

    cart.forEach((item,index)=>{
        total += item.price * item.qty;
        totalItems += item.qty;

        container.innerHTML += `
        <div class="cart-product">
            <img src="${item.name === 'Shoes' ? 'sabeel.jpeg' : 'sabeel.jpeg'}">
            
            <div class="product-details">
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>

                <div class="product-actions">
                    <button class="qty-btn" onclick="changeQty(${index},-1)">-</button>
                    ${item.qty}
                    <button class="qty-btn" onclick="changeQty(${index},1)">+</button>

                    <button class="remove" onclick="removeItem(${index})">Remove</button>
                </div>
            </div>
        </div>
        `;
    });

    document.getElementById("total").innerText = total;
    document.getElementById("total-items").innerText = totalItems;
}
updateCartCount();
loadCart();