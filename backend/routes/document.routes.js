const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
    uploadDocument,
    getAllDocuments,
    getDocument,
    updateDocument,
    deleteDocument,
    verifyDocument,
    rejectDocument,
    getMyDocuments
} = require('../controllers/document.controller');

router.use(protect);

// Student routes
router.post('/', upload.single('file'), uploadDocument);
router.get('/my', getMyDocuments);

// Admin routes
router.get('/', authorize('admin'), getAllDocuments);
router.get('/:id', getDocument);
router.put('/:id', authorize('admin'), updateDocument);
router.delete('/:id', authorize('admin'), deleteDocument);
router.put('/:id/verify', authorize('admin'), verifyDocument);
router.put('/:id/reject', authorize('admin'), rejectDocument);

module.exports = router; 