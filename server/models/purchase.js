var mongoose = require('mongoose'); 
var purchaseSchema = new mongoose.Schema({ 
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

purchaseSchema.pre("save", function(next) { 
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

module.exports = mongoose.model('Purchase', purchaseSchema); 