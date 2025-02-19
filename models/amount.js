const mongoose = require('mongoose');

const amountSchema = new mongoose.Schema({
    //_id: { type: String, required: true},
    creditAmount: { type: Number, required: true}
});

module.exports = mongoose.model('Amount', amountSchema);