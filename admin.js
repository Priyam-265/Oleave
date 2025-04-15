// admin.js - Handles the restaurant/vendor side order management
document.addEventListener("DOMContentLoaded", () => {
  const orderList = document.querySelector(".order-list");

  // Initialize data in localStorage if it doesn't exist
  const initializeData = () => {
    if (!localStorage.getItem("orders")) {
      const defaultOrders = [
        {
          orderData: {
            orderId: "12345",
            timeSlot: "12:00 PM - 1:00 PM",
            date: "2025-04-11",
            status: "Order Confirmed",
            items: [
              { id: 1, quantity: 2 },
              { id: 2, quantity: 1 },
            ],
          },
        },
      ];
      localStorage.setItem("orders", JSON.stringify(defaultOrders));
      console.log("Initialized default orders in localStorage");
    }

    if (!localStorage.getItem("menuItems")) {
      const defaultMenu = [
        { id: 1, name: "Pepperoni Pizza", price: 20, image: "mpizza1.png" },
        { id: 2, name: "Chicken Cheese Pizza", price: 25, image: "mpizza2.png" },
        { id: 3, name: "Farm House Pizza", price: 35, image: "mpizza3.png" },
        { id: 4, name: "Chicken Tikka Pizza", price: 30, image: "mpizza4.png" },
        { id: 5, name: "Cheese Chicken Pizza", price: 30, image: "mpizza5.png" },
        { id: 6, name: "Afghani Chicken Pizza", price: 35, image: "mpizza6.png" },
      ];
      localStorage.setItem("menuItems", JSON.stringify(defaultMenu));
      console.log("Initialized default menuItems in localStorage");
    }
  };

  // Load and display orders
  const loadOrders = () => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const menuItems = JSON.parse(localStorage.getItem("menuItems")) || [];

    orderList.innerHTML = "";

    if (orders.length === 0) {
      orderList.innerHTML = "<p>No orders placed yet.</p>";
      return;
    }

    orders.forEach((orderObj) => {
      const order = orderObj.orderData || orderObj;

      if (order.status === "Completed") return;

      const card = document.createElement("div");
      card.className = "card";
      card.id = `order-${order.orderId}`;

      const itemsHtml = order.items
        .map((item) => {
          const menuItem = menuItems.find((m) => m.id == item.id);
          return menuItem
            ? `<p>${menuItem.name} — ${item.quantity} × $${menuItem.price.toFixed(2)}</p>`
            : `<p>Item not found (ID: ${item.id})</p>`;
        })
        .join("");

      const total = order.items.reduce((sum, item) => {
        const menuItem = menuItems.find((m) => m.id == item.id);
        return sum + (menuItem ? menuItem.price * item.quantity : 0);
      }, 0);

      const buttonsHtml = `
        <button class="status-btn preparing-btn ${order.status !== "Order Confirmed" ? 'hidden' : ''}" 
                data-order-id="${order.orderId}" data-status="Preparing">
          Mark Preparing
        </button>
        <button class="status-btn prepared-btn ${order.status !== "Preparing" ? 'hidden' : ''}" 
                data-order-id="${order.orderId}" data-status="Prepared">
          Mark Prepared
        </button>
        <button class="picked-btn ${order.status !== "Prepared" ? 'hidden' : ''}" 
                data-order-id="${order.orderId}">
          Mark Picked
        </button>
      `;

      card.innerHTML = `
        <h3>Order ID: <span>${order.orderId}</span></h3>
        <p><strong>Time Slot:</strong> ${order.timeSlot}</p>
        <p><strong>Date:</strong> ${order.date}</p>
        <div class="order-items"><strong>Items:</strong><br>${itemsHtml}</div>
        <p><strong>Total Price:</strong> $${total.toFixed(2)}</p>
        <p class="status-display">Status: <strong>
          <span id="status-${order.orderId}" class="status-${order.status.toLowerCase().replace(/\s+/g, "-")}">
            ${order.status}
          </span>
        </strong></p>
        <div class="action-buttons">${buttonsHtml}</div>
      `;

      orderList.appendChild(card);
    });

    addButtonEventListeners();
  };

  // Add event listeners to buttons
  const addButtonEventListeners = () => {
    document.querySelectorAll(".status-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const orderId = event.target.getAttribute("data-order-id");
        const status = event.target.getAttribute("data-status");
        updateStatus(orderId, status);
      });
    });

    document.querySelectorAll(".picked-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const orderId = event.target.getAttribute("data-order-id");
        completeOrder(orderId);
      });
    });
  };

  // Update order status
  const updateStatus = (orderId, status) => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const index = orders.findIndex((o) => (o.orderData || o).orderId === orderId);

    if (index !== -1) {
      if (orders[index].orderData) {
        orders[index].orderData.status = status;
      } else {
        orders[index].status = status;
      }

      localStorage.setItem("orders", JSON.stringify(orders));
      loadOrders();
    }
  };

  // Complete the order (mark as picked)
  const completeOrder = (orderId) => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const index = orders.findIndex((o) => (o.orderData || o).orderId === orderId);

    if (index !== -1) {
      if (orders[index].orderData) {
        orders[index].orderData.status = "Completed";
      } else {
        orders[index].status = "Completed";
      }

      localStorage.setItem("orders", JSON.stringify(orders));

      const orderCard = document.getElementById(`order-${orderId}`);
      if (orderCard) {
        orderCard.remove();
      }
    }
  };

  // Inject dynamic CSS styles
  const addStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      .hidden {
        display: none;
      }
      .status-btn, .picked-btn {
        padding: 8px 16px;
        margin: 5px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
      }
      .preparing-btn {
        background-color: #ffc107;
        color: #000;
      }
      .prepared-btn {
        background-color: #4caf50;
        color: white;
      }
      .picked-btn {
        background-color: #2196f3;
        color: white;
      }
      .card {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 15px;
      }
    `;
    document.head.appendChild(style);
  };

  addStyles();
  initializeData();
  loadOrders();

  setInterval(loadOrders, 10000); // Refresh every 10 seconds
});
function loadOrders() {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const orderList = document.getElementById("order-list");
  orderList.innerHTML = "";  // Clear old list

  if (orders.length === 0) {
    orderList.innerHTML = "<p>No orders placed yet.</p>";
    return;
  }

  orders.forEach(order => {
    const orderCard = document.createElement("div");
    orderCard.className = "order-card";
    orderCard.innerHTML = `
      <h3>Order ID: ${order.orderId}</h3>
      <p>Time Slot: ${order.selectedTimeSlot}</p>
      <p>Total Price: $${order.totalPrice}</p>
      <p>Status: <strong>${order.status}</strong></p>
      <ul>
        ${order.items.map(item => `<li>${item.quantity} x ${item.name} - $${item.price}</li>`).join("")}
      </ul>
      <button onclick="updateOrderStatus('${order.orderId}', 'Preparing')">Mark Preparing</button>
      <button onclick="updateOrderStatus('${order.orderId}', 'Prepared')">Mark Prepared</button>
      <button onclick="completeOrder('${order.orderId}', '${order.selectedTimeSlot}')">Picked</button>
    `;

    // Disable buttons based on status
    if (order.status === "Order Confirmed") {
      orderCard.querySelector("button:nth-child(6)").disabled = false;  // Preparing
      orderCard.querySelector("button:nth-child(7)").disabled = true;   // Prepared
      orderCard.querySelector("button:nth-child(8)").disabled = true;   // Picked
    } else if (order.status === "Preparing") {
      orderCard.querySelector("button:nth-child(6)").disabled = true;
      orderCard.querySelector("button:nth-child(7)").disabled = false;
      orderCard.querySelector("button:nth-child(8)").disabled = true;
    } else if (order.status === "Prepared") {
      orderCard.querySelector("button:nth-child(6)").disabled = true;
      orderCard.querySelector("button:nth-child(7)").disabled = true;
      orderCard.querySelector("button:nth-child(8)").disabled = false;
    }

    orderList.appendChild(orderCard);
  });
}

function updateOrderStatus(orderId, newStatus) {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const updatedOrders = orders.map(order => {
    if (order.orderId === orderId) {
      order.status = newStatus;
    }
    return order;
  });
  localStorage.setItem('orders', JSON.stringify(updatedOrders));

  // Force refresh for customer
  window.dispatchEvent(new Event('storage'));

  loadOrders();
}

function completeOrder(orderId, timeSlot) {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const updatedOrders = orders.filter(order => order.orderId !== orderId);
  localStorage.setItem('orders', JSON.stringify(updatedOrders));

  releaseTimeSlot(timeSlot); // Free the slot when order is picked

  loadOrders();
}

// Load on page open
window.onload = loadOrders;

// Update live when localStorage changes (other tab or customer side)
window.addEventListener('storage', (event) => {
  if (event.key === 'orders') {
    loadOrders();
  }
});
