  // // timeline.js - Handles the order status timeline

  // // Initialize and update timeline
  // function initializeTimeline(status) {
  //   const stageConfirmed = document.getElementById("stage-confirmed");
  //   const stagePreparing = document.getElementById("stage-preparing");
  //   const stagePrepared = document.getElementById("stage-prepared");
  //   const line1 = document.getElementById("line-1");
  //   const line2 = document.getElementById("line-2");
    
  //   if (!stageConfirmed || !stagePreparing || !stagePrepared) return;
    
  //   // Update stages based on status
  //   if (status === "Order Confirmed" || status === "Confirmed") {
  //     stageConfirmed.classList.add("active");
  //   } 
  //   else if (status === "Preparing") {
  //     stageConfirmed.classList.add("active");
  //     line1.classList.add("active");
  //     stagePreparing.classList.add("active");
  //   } 
  //   else if (status === "Prepared" || status === "Ready") {
  //     stageConfirmed.classList.add("active");
  //     line1.classList.add("active");
  //     stagePreparing.classList.add("active");
  //     line2.classList.add("active");
  //     stagePrepared.classList.add("active");
  //   }
  // }

  // // Check for order status updates
  // function checkOrderStatus() {
  //   const currentOrderId = localStorage.getItem('currentOrderId');
    
  //   if (currentOrderId) {
  //     // Check direct status indicator
  //     const orderStage = localStorage.getItem(`order-${currentOrderId}-stage`);
      
  //     if (orderStage) {
  //       updateOrderStatus(orderStage);
  //       return;
  //     }
      
  //     // Check orders array
  //     const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  //     const currentOrder = orders.find(order => order.orderId === currentOrderId);
      
  //     if (currentOrder && currentOrder.status) {
  //       updateOrderStatus(currentOrder.status);
  //     }
  //   }
  // }

  // // Update timeline based on order status
  // function updateOrderStatus(status) {
  //   const stageConfirmed = document.getElementById("stage-confirmed");
  //   const stagePreparing = document.getElementById("stage-preparing");
  //   const stagePrepared = document.getElementById("stage-prepared");
  //   const line1 = document.getElementById("line-1");
  //   const line2 = document.getElementById("line-2");
    
  //   if (!stageConfirmed) return;
    
  //   // Update stages based on status
  //   if (status === "Preparing" || status === "preparing") {
  //     stageConfirmed.classList.add("active");
  //     line1.classList.add("active");
  //     stagePreparing.classList.add("active");
  //   } 
  //   else if (status === "Prepared" || status === "prepared" || status === "Ready" || status === "ready") {
  //     stageConfirmed.classList.add("active");
  //     line1.classList.add("active");
  //     stagePreparing.classList.add("active");
  //     line2.classList.add("active");
  //     stagePrepared.classList.add("active");
  //   }
  // }

  // // Listen for storage events to detect vendor status updates
  // window.addEventListener('storage', (event) => {
  //   if (event.key === 'orders' || event.key.startsWith('order-')) {
  //     checkOrderStatus();
  //   }
  // });

  // // Check status every few seconds
  // setInterval(() => {
  //   checkOrderStatus();
  // }, 5000); // Check every 5 seconds