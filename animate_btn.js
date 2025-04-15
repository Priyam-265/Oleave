let orderPlaced = false;
let confirmationSound = new Audio('order-confirmation.mp3');

function generateTimeSlots() {
  const select = document.getElementById("time-slot");
  const now = new Date();
  now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15, 0, 0);

  const timeSlots = JSON.parse(localStorage.getItem('timeSlots')) || {};

  for (let i = 0; i < 4; i++) {
    const start = new Date(now.getTime() + i * 15 * 60000);
    const end = new Date(start.getTime() + 15 * 60000);

    const slotText = `${formatTime(start)} - ${formatTime(end)}`;
    const option = document.createElement("option");
    option.value = slotText;
    option.textContent = slotText;

    // Disable the slot if it's full
    if (timeSlots[slotText] && timeSlots[slotText] >= 5) {
      option.disabled = true;
      option.textContent = `${slotText} (Full)`;
    }

    select.appendChild(option);
  }
}

function formatTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

function placeOrder() {
  const slot = document.getElementById("time-slot").value;
  if (!slot) {
    alert("Please select a time slot.");
    return;
  }

  const timeSlots = JSON.parse(localStorage.getItem('timeSlots')) || {};
  if (!timeSlots[slot]) timeSlots[slot] = 0;

  // Check if slot is full
  if (timeSlots[slot] >= 5) {
    alert("Sorry, this time slot is full. Please select another.");
    return;
  }

  timeSlots[slot]++;
  localStorage.setItem('timeSlots', JSON.stringify(timeSlots));

  // Hide the order button and show the confirmation message
  document.getElementById("order-btn").style.display = "none";
  const confirmation = document.getElementById("confirmation");
  confirmation.classList.remove("hidden");

  confirmationSound.play();

  setTimeout(() => {
    const orderId = "ORD-" + Date.now();
    const orderData = {
      orderId: orderId,
      timeSlot: new Date().toLocaleString(),
      selectedTimeSlot: slot,
      totalPrice: (Math.random() * 50 + 10).toFixed(2),
      items: [
        { name: "Burger", quantity: 2, price: 5 },
        { name: "Fries", quantity: 1, price: 3 }
      ],
      status: "Order Confirmed"   // ✅ fixed here
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    existingOrders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    localStorage.setItem('currentOrderId', orderId);

    const qrDiv = document.getElementById("qrcode");
    qrDiv.classList.remove("hidden");
    qrDiv.innerHTML = "";

    // Generate QR code
    new QRCode(qrDiv, {
      text: JSON.stringify(orderData),
      width: 200,
      height: 200,
      colorDark: "#ffffff",
      colorLight: "#000000"
    });

    // Create and append Order ID below the QR code
    const orderIdDiv = document.createElement('p');
    orderIdDiv.textContent = `Order ID: ${orderId}`;
    qrDiv.appendChild(orderIdDiv);

    qrDiv.style.opacity = 1;

    orderPlaced = true;

    document.getElementById("order-timeline").classList.remove("hidden");
    updateTimeline("Order Confirmed");   // ✅ also start from "Order Confirmed"

  }, 1000);
}

function updateTimeline(status) {
  const stageConfirmed = document.getElementById("stage-confirmed");
  const stagePreparing = document.getElementById("stage-preparing");
  const stagePrepared = document.getElementById("stage-prepared");
  const line1 = document.getElementById("line-1");
  const line2 = document.getElementById("line-2");

  // Reset all stages
  stageConfirmed.classList.add("active");
  stagePreparing.classList.remove("active");
  stagePrepared.classList.remove("active");
  line1.classList.remove("active");
  line2.classList.remove("active");

  if (status === "Preparing") {
    stagePreparing.classList.add("active");
    line1.classList.add("active");
  } else if (status === "Prepared") {
    stagePreparing.classList.add("active");
    line1.classList.add("active");
    stagePrepared.classList.add("active");
    line2.classList.add("active");
  }
}

function getCurrentOrderId() {
  return localStorage.getItem('currentOrderId');
}

window.addEventListener('storage', (event) => {
  if (event.key === 'orders') {
    const updatedOrders = JSON.parse(event.newValue || '[]');
    const currentOrderId = getCurrentOrderId();
    const currentOrder = updatedOrders.find(order => order.orderId === currentOrderId);
    if (currentOrder && currentOrder.status) {
      updateTimeline(currentOrder.status);
    }
  }
});

function releaseTimeSlot(slot) {
  const timeSlots = JSON.parse(localStorage.getItem('timeSlots')) || {};

  if (timeSlots[slot] && timeSlots[slot] > 0) {
    timeSlots[slot]--;
    localStorage.setItem('timeSlots', JSON.stringify(timeSlots));

    if (timeSlots[slot] < 5) {
      const option = document.querySelector(`option[value="${slot}"]`);
      if (option) {
        option.disabled = false;
        option.textContent = slot;
      }
    }
  }
}

window.onload = generateTimeSlots;
