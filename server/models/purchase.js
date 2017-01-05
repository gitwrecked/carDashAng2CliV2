"use strict";

const mongoose = require('mongoose');

let purchaseSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    item: {
        type: String,
        required: true
    },
    created_at: Date,
    updated_at: Date
});

purchaseSchema.pre('save', function(next) {
    let currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

module.exports = mongoose.model('Purchase', purchaseSchema);