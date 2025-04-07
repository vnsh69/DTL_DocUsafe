const Request = require('../models/Request');
const Document = require('../models/Document');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// @desc    Create new request
// @route   POST /api/requests
// @access  Private
exports.createRequest = async (req, res) => {
    try {
        req.body.user = req.user.id;
        const request = await Request.create(req.body);
        
        // Send email notification to admin
        const admins = await User.find({ role: 'admin' });
        for (const admin of admins) {
            await sendEmail({
                email: admin.email,
                subject: 'New Document Request',
                message: `A new document request has been submitted by ${req.user.name}`
            });
        }

        res.status(201).json({
            success: true,
            data: request
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating request',
            error: error.message
        });
    }
};

// @desc    Get all requests (admin only)
// @route   GET /api/requests
// @access  Private/Admin
exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find().populate('user', 'name email');
        
        res.status(200).json({
            success: true,
            count: requests.length,
            data: requests
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching requests',
            error: error.message
        });
    }
};

// @desc    Get my requests
// @route   GET /api/requests/my
// @access  Private
exports.getMyRequests = async (req, res) => {
    try {
        const requests = await Request.find({ user: req.user.id }).populate('user', 'name email');
        
        res.status(200).json({
            success: true,
            count: requests.length,
            data: requests
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching your requests',
            error: error.message
        });
    }
};

// @desc    Get single request
// @route   GET /api/requests/:id
// @access  Private
exports.getRequest = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id).populate('user', 'name email');

        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        // Make sure user is request owner or admin
        if (request.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this request'
            });
        }

        res.status(200).json({
            success: true,
            data: request
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching request',
            error: error.message
        });
    }
};

// @desc    Update request
// @route   PUT /api/requests/:id
// @access  Private/Admin
exports.updateRequest = async (req, res) => {
    try {
        let request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        request = await Request.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('user', 'name email');

        res.status(200).json({
            success: true,
            data: request
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating request',
            error: error.message
        });
    }
};

// @desc    Delete request
// @route   DELETE /api/requests/:id
// @access  Private/Admin
exports.deleteRequest = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        await request.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Request deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting request',
            error: error.message
        });
    }
};

// @desc    Approve request
// @route   PUT /api/requests/:id/approve
// @access  Private/Admin
exports.approveRequest = async (req, res) => {
    try {
        let request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        request = await Request.findByIdAndUpdate(
            req.params.id,
            { status: 'approved' },
            { new: true, runValidators: true }
        ).populate('user', 'name email');

        // Send email notification to user
        await sendEmail({
            email: request.user.email,
            subject: 'Document Request Approved',
            message: 'Your document request has been approved'
        });

        res.status(200).json({
            success: true,
            data: request
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error approving request',
            error: error.message
        });
    }
};

// @desc    Reject request
// @route   PUT /api/requests/:id/reject
// @access  Private/Admin
exports.rejectRequest = async (req, res) => {
    try {
        let request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        request = await Request.findByIdAndUpdate(
            req.params.id,
            { 
                status: 'rejected',
                rejectionReason: req.body.reason
            },
            { new: true, runValidators: true }
        ).populate('user', 'name email');

        // Send email notification to user
        await sendEmail({
            email: request.user.email,
            subject: 'Document Request Rejected',
            message: `Your document request has been rejected. Reason: ${req.body.reason}`
        });

        res.status(200).json({
            success: true,
            data: request
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error rejecting request',
            error: error.message
        });
    }
};

// @desc    Complete request
// @route   PUT /api/requests/:id/complete
// @access  Private/Admin
exports.completeRequest = async (req, res) => {
    try {
        let request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        request = await Request.findByIdAndUpdate(
            req.params.id,
            { status: 'completed' },
            { new: true, runValidators: true }
        ).populate('user', 'name email');

        // Send email notification to user
        await sendEmail({
            email: request.user.email,
            subject: 'Document Request Completed',
            message: 'Your document request has been completed'
        });

        res.status(200).json({
            success: true,
            data: request
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error completing request',
            error: error.message
        });
    }
}; 