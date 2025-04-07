const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
    createRequest,
    getAllRequests,
    getRequest,
    updateRequest,
    deleteRequest,
    approveRequest,
    rejectRequest,
    completeRequest,
    getMyRequests
} = require('../controllers/request.controller');

// Protect all routes
router.use(protect);

// Student routes
router.post('/', createRequest);
router.get('/my', getMyRequests);

// Admin routes
router.get('/', authorize('admin'), getAllRequests);
router.get('/:id', getRequest);
router.put('/:id', authorize('admin'), updateRequest);
router.delete('/:id', authorize('admin'), deleteRequest);
router.put('/:id/approve', authorize('admin'), approveRequest);
router.put('/:id/reject', authorize('admin'), rejectRequest);
router.put('/:id/complete', authorize('admin'), completeRequest);

module.exports = router; 