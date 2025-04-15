// document.addEventListener('DOMContentLoaded', () => {
//     const listProductHtml = document.querySelector('.listProduct');
//     const removetext = document.querySelector('#heading');
//     const listCartHtml = document.querySelector('.listcart');
//     const cartCountSpan = document.querySelector('#span');
//     const buttonCartCountSpan = document.querySelector('#span2');
//     const buttonCheck = document.querySelector('#buttoncheck');
//     const paymentoption = document.querySelector('.paymentmethods');
//     const radiobutton = document.querySelector('#credit');
//     const card = document.querySelector('.container');
//     const upibutton = document.querySelector('#upi');
//     const upi = document.querySelector('.paymentt');
//     const cashbuton = document.querySelector('#cash');
//     const cash = document.querySelector('.porder');
//     const totalPriceElement = document.querySelector('#totalPrice');
//     let listProducts = [];
//     let carts = [];

//     const fetchProducts = async () => {
//         try {
//             const response = await fetch('products.json');
//             listProducts = await response.json();
//             if (listProductHtml) renderMenuProducts();
//             if (listCartHtml) renderCartItems();
//         } catch (error) {
//             console.error("Error fetching products:", error);
//         }
//     };

//     const renderMenuProducts = () => {
//         listProductHtml.innerHTML = '';
//         listProducts.forEach((product, index) => {
//             const dynamicId = `mitem${index + 1}`;
//             listProductHtml.innerHTML += `
//                 <div class="item" id="${dynamicId}">
//                     <img src="${product.image}" alt="${product.name}">
//                     <div class="mdata">
//                         <h1>${product.name}</h1>
//                         <p>Fresh and delicious!</p>
//                         <div class="mdata1">
//                             <h1>$${product.price}</h1>
//                             <button class="button3" id="buttonimg" data-id="${product.id}"></button>
//                         </div>
//                     </div>
//                 </div>`;
//         });
//         if (listProducts.length > 0) {
//             removetext.innerHTML = `<h3 id="heading">Explore our delicious menu!</h3>`;
//         }
//     };

//     const addToCart = (id) => {
//         const existingCartItem = carts.find(cartItem => cartItem.product_id == id);
//         if (existingCartItem) {
//             existingCartItem.quantity += 1;
//         } else {
//             carts.push({ product_id: id, quantity: 1 });
//         }
//         saveCart();
//         updateCartCounter();
//         renderCartItems();
//     };

//     const updateCartCounter = () => {
//         const totalItems = carts.reduce((sum, item) => sum + item.quantity, 0);
//         if (cartCountSpan) cartCountSpan.textContent = totalItems;
//         if (buttonCartCountSpan) buttonCartCountSpan.textContent = totalItems;
//     };

//     const renderCartItems = () => {
//         listCartHtml.innerHTML = '';
//         if (carts.length === 0) {
//             listCartHtml.innerHTML = `<p>Your cart is empty! Add items from the menu.</p>`;
//             removetext.innerHTML = `<h3 id="heading">Your cart is empty</h3>`;
//             totalPriceElement.textContent = `$0`;
//             paymentoption.style.display = 'none';
//             return;
//         }

//         removetext.innerHTML = `<h3 id="heading">Your food is being prepared!!!</h3>`;
//         let totalPrice = 0;
//         carts.forEach(cartItem => {
//             const product = listProducts.find(p => p.id == cartItem.product_id);
//             const itemTotal = product.price * cartItem.quantity;
//             totalPrice += itemTotal;
//             listCartHtml.innerHTML += `
//                 <div class="item">
//                     <img src="${product.image}" alt="${product.name}">
//                     <h1>${product.name}</h1>
//                     <h1>$${itemTotal.toFixed(2)}</h1>
//                     <span class="plus" data-id="${cartItem.product_id}">+</span>
//                     <span>${cartItem.quantity}</span>
//                     <span class="minus" data-id="${cartItem.product_id}">-</span>
//                 </div>`;
//         });

//         totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
//     };

//     const changeCartItemQuantity = (id, action) => {
//         const cartItem = carts.find(cartItem => cartItem.product_id == id);
//         if (cartItem) {
//             if (action === 'plus') {
//                 cartItem.quantity += 1;
//             } else if (action === 'minus') {
//                 cartItem.quantity -= 1;
//                 if (cartItem.quantity <= 0) {
//                     carts = carts.filter(item => item.product_id != id);
//                 }
//             }
//             saveCart();
//             renderCartItems();
//             updateCartCounter();
//         }
//     };

//     const saveCart = () => {
//         localStorage.setItem('cart', JSON.stringify(carts));
//     };

//     const loadCart = () => {
//         carts = JSON.parse(localStorage.getItem('cart')) || [];
//         updateCartCounter();
//     };

//     const placeOrderFromCart = () => {
//         if (carts.length > 0) {
//             const orderId = "ORD" + Math.floor(Math.random() * 100000);
//             const orderData = {
//                 orderId: orderId,
//                 items: carts.map(item => {
//                     const product = listProducts.find(p => p.id == item.product_id);
//                     return {
//                         name: product.name,
//                         price: product.price,
//                         quantity: item.quantity
//                     };
//                 }),
//                 totalPrice: carts.reduce((sum, item) => {
//                     const product = listProducts.find(p => p.id == item.product_id);
//                     return sum + (product.price * item.quantity);
//                 }, 0)
//             };

//             // Save order data for the vendor
//             localStorage.setItem('orderData', JSON.stringify(orderData));
//             alert(`Order placed successfully! Order ID: ${orderData.orderId}`);
//             carts = []; // Clear the cart after placing the order
//             saveCart(); // Update localStorage after clearing the cart
//             renderCartItems(); // Re-render the cart (now empty)
//         }
//     };

//     // Attach events
//     if (listProductHtml) {
//         listProductHtml.addEventListener('click', (event) => {
//             if (event.target.id === 'buttonimg') {
//                 const productId = event.target.dataset.id;
//                 addToCart(productId);
//             }
//         });
//     }

//     if (listCartHtml) {
//         listCartHtml.addEventListener('click', (event) => {
//             const productId = event.target.dataset.id;
//             if (event.target.classList.contains('plus')) {
//                 changeCartItemQuantity(productId, 'plus');
//             } else if (event.target.classList.contains('minus')) {
//                 changeCartItemQuantity(productId, 'minus');
//             }
//         });
//     }

//     if (buttonCheck) {
//         buttonCheck.addEventListener('click', () => {
//             if (carts.length > 0) {
//                 paymentoption.style.display = paymentoption.style.display === 'flex' ? 'none' : 'flex';
//                 card.style.display = 'none';
//                 upi.style.display = 'none';
//                 cash.style.display = 'none';
//             }
//         });
//     }

//     if (radiobutton) {
//         radiobutton.addEventListener('click', () => {
//             card.style.display = card.style.display === 'flex' ? 'none' : 'flex';
//             upi.style.display = 'none';
//         });
//     }

//     if (upibutton) {
//         upibutton.addEventListener('click', () => {
//             upi.style.display = upi.style.display === 'flex' ? 'none' : 'flex';
//             card.style.display = 'none';
//         });
//     }

//     if (cashbuton) {
//         cashbuton.addEventListener('click', () => {
//             cash.style.display = cash.style.display === 'flex' ? 'none' : 'flex';
//             card.style.display = 'none';
//             upi.style.display = 'none';
//         });
//     }

//     loadCart();
//     fetchProducts();
// });
document.addEventListener('DOMContentLoaded', () => {
    const listProductHtml = document.querySelector('.listProduct');
    const removetext = document.querySelector('#heading');
    const listCartHtml = document.querySelector('.listcart');
    const cartCountSpan = document.querySelector('#span');
    const buttonCartCountSpan = document.querySelector('#span2');
    const buttonCheck = document.querySelector('#buttoncheck');
    const paymentoption = document.querySelector('.paymentmethods');
    const radiobutton = document.querySelector('#credit');
    const card = document.querySelector('.container');
    const upibutton = document.querySelector('#upi');
    const upi = document.querySelector('.paymentt');
    const cashbuton = document.querySelector('#cash');
    const cash = document.querySelector('.porder');
    const totalPriceElement = document.querySelector('#totalPrice');
    let listProducts = [];
    let carts = [];

    // Fetch products from the JSON structure you provided
    const fetchProducts = async () => {
        try {
            // Load the products from the hardcoded JSON object instead of a file
            const response = await fetch('products.json'); // Make sure the JSON file is hosted and available
            const jsonData = await response.json();
            listProducts = jsonData.menuItems; // Assuming menuItems key contains product list
            if (listProductHtml) renderMenuProducts();
            if (listCartHtml) renderCartItems();
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const renderMenuProducts = () => {
        listProductHtml.innerHTML = '';
        listProducts.forEach((product, index) => {
            const dynamicId = `mitem${index + 1}`;
            listProductHtml.innerHTML += `
                <div class="item" id="${dynamicId}">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="mdata">
                        <h1>${product.name}</h1>
                        <p>Fresh and delicious!</p>
                        <div class="mdata1">
                            <h1>$${product.price}</h1>
                            <button class="button3" id="buttonimg" data-id="${product.id}"></button>
                        </div>
                    </div>
                </div>`;
        });

        if (listProducts.length > 0) {
            removetext.innerHTML = `<h3 id="heading">Explore our delicious menu!</h3>`;
        }
    };

    // Add selected product to the cart
    const addToCart = (id) => {
        const existingCartItem = carts.find(cartItem => cartItem.product_id == id);
        if (existingCartItem) {
            existingCartItem.quantity += 1;
        } else {
            carts.push({ product_id: id, quantity: 1 });
        }
        saveCart();
        updateCartCounter();
        renderCartItems();
    };

    // Update cart item counter in the UI
    const updateCartCounter = () => {
        const totalItems = carts.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountSpan) cartCountSpan.textContent = totalItems;
        if (buttonCartCountSpan) buttonCartCountSpan.textContent = totalItems;
    };

    // Render cart items and total price
    const renderCartItems = () => {
        listCartHtml.innerHTML = '';
        if (carts.length === 0) {
            listCartHtml.innerHTML = `<p>Your cart is empty! Add items from the menu.</p>`;
            removetext.innerHTML = `<h3 id="heading">Your cart is empty</h3>`;
            totalPriceElement.textContent = `$0`;
            paymentoption.style.display = 'none';
            return;
        }

        removetext.innerHTML = `<h3 id="heading">Your food is being prepared!!!</h3>`;
        let totalPrice = 0;
        carts.forEach(cartItem => {
            const product = listProducts.find(p => p.id == cartItem.product_id);
            const itemTotal = product.price * cartItem.quantity;
            totalPrice += itemTotal;
            listCartHtml.innerHTML += `
                <div class="item">
                    <img src="${product.image}" alt="${product.name}">
                    <h1>${product.name}</h1>
                    <h1>$${itemTotal.toFixed(2)}</h1>
                    <span class="plus" data-id="${cartItem.product_id}">+</span>
                    <span>${cartItem.quantity}</span>
                    <span class="minus" data-id="${cartItem.product_id}">-</span>
                </div>`;
        });

        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    };

    // Handle item quantity changes in the cart (increase or decrease)
    const changeCartItemQuantity = (id, action) => {
        const cartItem = carts.find(cartItem => cartItem.product_id == id);
        if (cartItem) {
            if (action === 'plus') {
                cartItem.quantity += 1;
            } else if (action === 'minus') {
                cartItem.quantity -= 1;
                if (cartItem.quantity <= 0) {
                    carts = carts.filter(item => item.product_id != id);
                }
            }
            saveCart();
            renderCartItems();
            updateCartCounter();
        }
    };

    // Save cart data to localStorage
    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(carts));
    };

    // Load cart data from localStorage
    const loadCart = () => {
        carts = JSON.parse(localStorage.getItem('cart')) || [];
        updateCartCounter();
    };

    // Handle order placement
    const placeOrderFromCart = () => {
        if (carts.length > 0) {
            const orderId = "ORD" + Math.floor(Math.random() * 100000);
            const orderData = {
                orderId: orderId,
                items: carts.map(item => {
                    const product = listProducts.find(p => p.id == item.product_id);
                    return {
                        name: product.name,
                        price: product.price,
                        quantity: item.quantity
                    };
                }),
                totalPrice: carts.reduce((sum, item) => {
                    const product = listProducts.find(p => p.id == item.product_id);
                    return sum + (product.price * item.quantity);
                }, 0)
            };

            // Save order data for the vendor
            localStorage.setItem('orderData', JSON.stringify(orderData));
            alert(`Order placed successfully! Order ID: ${orderData.orderId}`);
            carts = []; // Clear the cart after placing the order
            saveCart(); // Update localStorage after clearing the cart
            renderCartItems(); // Re-render the cart (now empty)
        }
    };

    // Attach events
    if (listProductHtml) {
        listProductHtml.addEventListener('click', (event) => {
            if (event.target.id === 'buttonimg') {
                const productId = event.target.dataset.id;
                addToCart(productId);
            }
        });
    }

    if (listCartHtml) {
        listCartHtml.addEventListener('click', (event) => {
            const productId = event.target.dataset.id;
            if (event.target.classList.contains('plus')) {
                changeCartItemQuantity(productId, 'plus');
            } else if (event.target.classList.contains('minus')) {
                changeCartItemQuantity(productId, 'minus');
            }
        });
    }

    if (buttonCheck) {
        buttonCheck.addEventListener('click', () => {
            if (carts.length > 0) {
                paymentoption.style.display = paymentoption.style.display === 'flex' ? 'none' : 'flex';
                card.style.display = 'none';
                upi.style.display = 'none';
                cash.style.display = 'none';
            }
        });
    }

    if (radiobutton) {
        radiobutton.addEventListener('click', () => {
            card.style.display = card.style.display === 'flex' ? 'none' : 'flex';
            upi.style.display = 'none';
        });
    }

    if (upibutton) {
        upibutton.addEventListener('click', () => {
            upi.style.display = upi.style.display === 'flex' ? 'none' : 'flex';
            card.style.display = 'none';
        });
    }

    if (cashbuton) {
        cashbuton.addEventListener('click', () => {
            cash.style.display = cash.style.display === 'flex' ? 'none' : 'flex';
            card.style.display = 'none';
            upi.style.display = 'none';
        });
    }

    loadCart();
    fetchProducts();
});

