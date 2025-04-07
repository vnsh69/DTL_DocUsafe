// API endpoints
const API_URL = 'http://localhost:5000/api';

// Common authentication functions
const auth = {
    // Store user data and token
    setUserSession: (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
    },

    // Clear user session
    clearUserSession: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Get current user
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    // Get auth token
    getToken: () => {
        return localStorage.getItem('token');
    },

    // Check if user is logged in
    isLoggedIn: () => {
        return !!localStorage.getItem('token');
    },

    // Redirect based on role
    redirectToDashboard: (role) => {
        if (role === 'admin') {
            window.location.href = '/pages/admin/dashboard.html';
        } else if (role === 'student') {
            window.location.href = '/pages/student/dashboard.html';
        }
    },

    // Handle API errors
    handleError: (error) => {
        console.error('API Error:', error);
        return { success: false, message: 'An error occurred. Please try again.' };
    }
}; 