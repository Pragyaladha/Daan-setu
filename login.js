
        // Get form elements
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const showSignupLink = document.getElementById('showSignup');
        const showLoginLink = document.getElementById('showLogin');
        const loginFormElement = document.getElementById('loginFormElement');
        const signupFormElement = document.getElementById('signupFormElement');

        // Function to show signup form
        function showSignupForm() {
            loginForm.classList.remove('active');
            signupForm.classList.add('active');
        }

        // Function to show login form
        function showLoginForm() {
            signupForm.classList.remove('active');
            loginForm.classList.add('active');
        }

        // Event listeners for switching forms
        showSignupLink.addEventListener('click', function(e) {
            e.preventDefault();
            showSignupForm();
        });

        showLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            showLoginForm();
        });

    // Handle login form submission
loginFormElement.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Hardcoded admin credentials
    const adminEmail = "ladhapragya.com";
    const adminPassword = "admin123";

    if (email === adminEmail && password === adminPassword) {
        // ✅ Redirect to admin page
        window.location.href = "admin.html";
    } else if (email && password) {
        // ✅ Normal user login
        alert('Login successful!\nEmail: ' + email);
        window.location.href = "pragya.html"; // Change to your user home page if different
    }
});


        // Handle signup form submission
        signupFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            if (email && password && confirmPassword) {
                alert('Account created successfully!\nEmail: ' + email);
                // Here you would typically send the data to your server
                // After successful signup, you might want to switch to login form
                showLoginForm();
            }
        });

        // // Handle back to home links
        // const backHomeLinks = document.querySelectorAll('.back-home-link');
        // backHomeLinks.forEach(link => {
        //     link.addEventListener('click', function(e) {
        //         e.preventDefault();
        //         alert('Redirecting to home page...');
        //         // Here you would typically redirect to your home page
        //         // window.location.href = '/';
        //     });
        // });
 
