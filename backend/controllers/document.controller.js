const Document = require('../models/Document');

// @desc    Upload new document
// @route   POST /api/documents
// @access  Private
exports.uploadDocument = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload a file'
            });
        }

        const document = await Document.create({
            title: req.body.title,
            description: req.body.description,
            fileUrl: `/uploads/${req.file.filename}`,
            fileType: req.file.mimetype,
            user: req.user.id
        });

        res.status(201).json({
            success: true,
            data: document
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all documents (admin only)
// @route   GET /api/documents
// @access  Private/Admin
exports.getAllDocuments = async (req, res, next) => {
    try {
        const documents = await Document.find()
            .populate('user', 'name email')
            .populate('verifiedBy', 'name');

        res.status(200).json({
            success: true,
            count: documents.length,
            data: documents
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single document
// @route   GET /api/documents/:id
// @access  Private
exports.getDocument = async (req, res, next) => {
    try {
        const document = await Document.findById(req.params.id)
            .populate('user', 'name email')
            .populate('verifiedBy', 'name');

        if (!document) {
            return res.status(404).json({
                success: false,
                message: 'Document not found'
            });
        }

        // Make sure user owns document or is admin
        if (document.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this document'
            });
        }

        res.status(200).json({
            success: true,
            data: document
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update document
// @route   PUT /api/documents/:id
// @access  Private/Admin
exports.updateDocument = async (req, res, next) => {
    try {
        let document = await Document.findById(req.params.id);

        if (!document) {
            return res.status(404).json({
                success: false,
                message: 'Document not found'
            });
        }

        document = await Document.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: document
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete document
// @route   DELETE /api/documents/:id
// @access  Private/Admin
exports.deleteDocument = async (req, res, next) => {
    try {
        const document = await Document.findById(req.params.id);

        if (!document) {
            return res.status(404).json({
                success: false,
                message: 'Document not found'
            });
        }

        await document.remove();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Verify document
// @route   PUT /api/documents/:id/verify
// @access  Private/Admin
exports.verifyDocument = async (req, res, next) => {
    try {
        const document = await Document.findById(req.params.id);

        if (!document) {
            return res.status(404).json({
                success: false,
                message: 'Document not found'
            });
        }

        document.status = 'verified';
        document.verifiedBy = req.user.id;
        document.verificationComment = req.body.comment;

        await document.save();

        res.status(200).json({
            success: true,
            data: document
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Reject document
// @route   PUT /api/documents/:id/reject
// @access  Private/Admin
exports.rejectDocument = async (req, res, next) => {
    try {
        const document = await Document.findById(req.params.id);

        if (!document) {
            return res.status(404).json({
                success: false,
                message: 'Document not found'
            });
        }

        document.status = 'rejected';
        document.verifiedBy = req.user.id;
        document.verificationComment = req.body.comment;

        await document.save();

        res.status(200).json({
            success: true,
            data: document
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get logged in user's documents
// @route   GET /api/documents/my
// @access  Private
exports.getMyDocuments = async (req, res, next) => {
    try {
        const documents = await Document.find({ user: req.user.id })
            .populate('verifiedBy', 'name');

        res.status(200).json({
            success: true,
            count: documents.length,
            data: documents
        });
    } catch (err) {
        next(err);
    }
}; 