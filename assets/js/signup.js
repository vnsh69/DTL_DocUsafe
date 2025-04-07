// Switch between student and admin signup forms
function switchTab(type) {
    const studentForm = document.getElementById('studentSignup');
    const adminForm = document.getElementById('adminSignup');
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

// Handle file upload preview
function initializeFileUploads() {
    document.querySelectorAll('.upload-preview').forEach(preview => {
        preview.addEventListener('click', () => {
            const input = preview.nextElementSibling;
            input.click();
        });
    });

    document.querySelectorAll('input[type="file"]').forEach(input => {
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = input.previousElementSibling;
                    preview.innerHTML = `<img src="${e.target.result}" style="max-width: 100%; max-height: 100%; border-radius: 8px;">`;
                }
                reader.readAsDataURL(file);
            }
        });
    });
}

// Validate signup form
function validateForm(role) {
    const password = document.getElementById(`${role}-password`).value;
    const confirmPassword = document.getElementById(`${role}-confirm-password`).value;
    const terms = document.getElementById(`${role}-terms`);

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return false;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long!');
        return false;
    }

    if (!terms.checked) {
        alert('Please accept the Terms & Conditions!');
        return false;
    }

    return true;
}

// Handle signup form submission
async function handleSignup(formId, role) {
    const form = document.getElementById(formId);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm(role)) {
            return;
        }

        const userData = {
            name: `${document.getElementById(`${role}-fname`).value} ${document.getElementById(`${role}-lname`).value}`,
            email: document.getElementById(`${role}-email`).value,
            password: document.getElementById(`${role}-password`).value,
            role: role,
            phone: document.getElementById(`${role}-phone`).value
        };

        // Add role-specific fields
        if (role === 'student') {
            userData.enrollmentNumber = document.getElementById('student-enrollment').value;
            userData.course = document.getElementById('student-course').value;
        } else {
            userData.collegeName = document.getElementById('admin-college').value;
            userData.designation = document.getElementById('admin-designation').value;
        }

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (data.success) {
                auth.setUserSession(data);
                alert('Registration successful! Redirecting to dashboard...');
                auth.redirectToDashboard(role);
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            const errorResponse = auth.handleError(error);
            alert(errorResponse.message);
        }
    });
}

// Check for admin signup redirect
function checkAdminSignup() {
    const signupType = localStorage.getItem('signupType');
    if (signupType === 'admin') {
        switchTab('admin');
        localStorage.removeItem('signupType');
    }
}

// Initialize signup functionality
document.addEventListener('DOMContentLoaded', () => {
    checkAdminSignup();
    initializeFileUploads();
    handleSignup('studentSignup', 'student');
    handleSignup('adminSignup', 'admin');
}); 