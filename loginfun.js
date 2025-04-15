    // document.addEventListener('DOMContentLoaded', () => {
    //     const accountButton = document.querySelector('#button-a'); 
    //     const dropdown = document.querySelector('#dropdown');
    //     const logoutButton = document.querySelector('#logoutbutton'); 
    //     const paraElement = document.querySelector('#para'); 
    //     const button4 = document.querySelector('#button4');
    //     const button5 = document.querySelector('#button5');
    //     const buttonDiv = document.querySelector('.buttons'); 
    //     const inputElement = document.querySelector('.input'); 
    //     const imageElement = document.querySelector('#payment'); 
    //     const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true'; 
    //     const userName = sessionStorage.getItem('userName');
    //     if (isLoggedIn) {
    //         if (paraElement) paraElement.textContent = `Welcome, ${userName}!`;
    //         if (buttonDiv) buttonDiv.style.display = 'none'; 
    //         if (button4) button4.style.display = 'none'; 
    //         if (button5) button5.style.display = 'none'; 
    //         if (inputElement) inputElement.style.display = 'block'; 
    //     } else {
    //         if (paraElement) paraElement.textContent = 'To place your order now, log in to your existing account or signup.';
    //         if (buttonDiv) buttonDiv.style.display = 'flex'; 
    //         if (button4) button4.style.display = 'block';
    //         if (button5) button5.style.display = 'block'; 
    //         if (inputElement) inputElement.style.display = 'none';
    //     }
    //     accountButton.addEventListener('click', (event) => {
    //         event.preventDefault();
    //         if (!isLoggedIn) {
    //             window.location.href = 'login.html'; 
    //         } else {
    //             dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    //         }
    //     });
    //     logoutButton.addEventListener('click', () => {
    //         sessionStorage.removeItem('userName');
    //         sessionStorage.removeItem('userEmail');
    //         sessionStorage.removeItem('userPassword');
    //         sessionStorage.removeItem('isLoggedIn'); 
    //         if (paraElement) paraElement.textContent = 'Welcome, Guest!'; 
    //         if (buttonDiv) buttonDiv.style.display = 'flex'; 
    //         if (button4) button4.style.display = 'block'; 
    //         if (button5) button5.style.display = 'block'; 
    //         if (inputElement) inputElement.style.display = 'none'; 
    //         dropdown.style.display = 'none';
    //         alert('You have been logged out.');
    //         window.location.href = ''; 
    //     });
    // });
    document.addEventListener('DOMContentLoaded', () => {
        const accountButton = document.querySelector('#button-a');
        const dropdown = document.querySelector('#dropdown');
        const logoutButton = document.querySelector('#logoutbutton');
        const paraElement = document.querySelector('#para');
        const button4 = document.querySelector('#button4');
        const button5 = document.querySelector('#button5');
        const buttonDiv = document.querySelector('.buttons');
        const inputElement = document.querySelector('.input');
        const profilePicture = document.querySelector('#profile-pic');
        const uploadPicButton = document.querySelector('#upload-button');
        const uploadInput = document.querySelector('#upload-pic');
        const profileName = document.querySelector('#user-name');
        const profileEmail = document.querySelector('#user-email');
    
        const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
        const userName = sessionStorage.getItem('userName') || 'Guest';
        const userEmail = sessionStorage.getItem('userEmail') || 'guest@example.com';
        const savedProfilePic = sessionStorage.getItem('profilePicture');
        if (savedProfilePic) {
            profilePicture.src = savedProfilePic;
        }
        if (isLoggedIn) {
            if (paraElement) paraElement.textContent = `Welcome, ${userName}!`;
            if (buttonDiv) buttonDiv.style.display = 'none';
            if (button4) button4.style.display = 'none';
            if (button5) button5.style.display = 'none';
            if (inputElement) inputElement.style.display = 'block';
        } else {
            if (paraElement) paraElement.textContent = 'To place your order now, log in to your existing account or signup.';
            if (buttonDiv) buttonDiv.style.display = 'flex';
            if (button4) button4.style.display = 'block';
            if (button5) button5.style.display = 'block';
            if (inputElement) inputElement.style.display = 'none';
        }
    
        
        accountButton.addEventListener('click', (event) => {
            event.preventDefault();
            if (!isLoggedIn) {
                window.location.href = 'login.html';
            } else {
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                profileName.textContent = userName;
                profileEmail.textContent = userEmail;
            }
        });
    
            uploadPicButton.addEventListener('click', () => {
            uploadInput.click();
        });
    
        uploadInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profilePicture.src = e.target.result;
                    sessionStorage.setItem('profilePicture', e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
        logoutButton.addEventListener('click', () => {
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('userEmail');
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('profilePicture');
            alert('You have been logged out.');
            if (paraElement) paraElement.textContent = 'Welcome, Guest!';
            if (buttonDiv) buttonDiv.style.display = 'flex';
            if (button4) button4.style.display = 'block';
            if (button5) button5.style.display = 'block';
            if (inputElement) inputElement.style.display = 'none';
            dropdown.style.display = 'none';
            window.location.reload();
        });
    });
    