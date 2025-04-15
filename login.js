document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('#button'); 
    const emailInput = document.querySelector('#emaili[type="email"]');
    const passwordInput = document.querySelector('#emaili[type="password"]');

    loginButton.addEventListener('click', (event) => {
        event.preventDefault(); 
        const storedEmail = sessionStorage.getItem('userEmail');
        const storedPassword = sessionStorage.getItem('userPassword');
        const storedUserName = sessionStorage.getItem('userName');
        const inputEmail = emailInput.value.trim();
        const inputPassword = passwordInput.value.trim();
        console.log('Stored Email:', storedEmail);
        console.log('Stored Password:', storedPassword);
        console.log('Entered Email:', inputEmail);
        console.log('Entered Password:', inputPassword);
        if (inputEmail === storedEmail && inputPassword === storedPassword) {
            sessionStorage.setItem('userName', storedUserName);
            sessionStorage.setItem('isLoggedIn', 'true');
            alert(`Welcome, ${storedUserName}! Redirecting to your cart.`);
            window.location.href = 'cart.html';
        } else {
            alert('Incorrect email or password. Please try again.');
        }
    });
});
