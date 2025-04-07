// Switch between student and admin login forms
function switchTab(type) {
    const studentForm = document.getElementById('studentLogin');
    const adminForm = document.getElementById('adminLogin');
    const tabs = document.querySelectorAll('.tab-btn');
    
    if (type === 'student') {
        studentForm.style.display = 'block';
        adminForm.style.display = 'none';
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        studentForm.style.display = 'none';
        adminForm.style.display = 'block';
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
    }
}

// Handle login form submission
async function handleLogin(formId, role) {
    const form = document.getElementById(formId);
    const errorDiv = document.getElementById(`${role}-error`);
    const successDiv = document.getElementById(`${role}-success`);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById(`${role}-email`).value;
        const password = document.getElementById(`${role}-password`).value;

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                auth.setUserSession(data);
                successDiv.textContent = 'Login successful! Redirecting...';
                successDiv.style.display = 'block';
                errorDiv.style.display = 'none';

                if (data.user.role === role) {
                    auth.redirectToDashboard(role);
                } else {
                    errorDiv.textContent = `Invalid ${role} credentials`;
                    errorDiv.style.display = 'block';
                    successDiv.style.display = 'none';
                }
            } else {
                errorDiv.textContent = data.message || 'Login failed';
                errorDiv.style.display = 'block';
                successDiv.style.display = 'none';
            }
        } catch (error) {
            const errorResponse = auth.handleError(error);
            errorDiv.textContent = errorResponse.message;
            errorDiv.style.display = 'block';
            successDiv.style.display = 'none';
        }
    });
}

// Initialize login handlers
document.addEventListener('DOMContentLoaded', () => {
    handleLogin('studentLogin', 'student');
    handleLogin('adminLogin', 'admin');
}); 