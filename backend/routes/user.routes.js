const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    updateProfile
} = require('../controllers/user.controller');

// Protected admin routes
router.get('/', protect, authorize('admin'), getAllUsers);
router.get('/:id', protect, authorize('admin'), getUser);
router.put('/:id', protect, authorize('admin'), updateUser);
router.delete('/:id', protect, authorize('admin'), deleteUser);

// Protected user routes
router.put('/profile/update', protect, updateProfile);

module.exports = router; 