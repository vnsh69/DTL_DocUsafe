const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'completed'],
        default: 'pending'
    },
    documents: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Document'
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    adminComment: {
        type: String,
        required: false
    },
    handledBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
requestSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Request', requestSchema); 