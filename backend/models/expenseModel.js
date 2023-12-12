const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User is required"]
    },
    account: {
        type: String,
        required: [true, "Account is required"]
    },
    color: {
        type: String,
        required: [true, "Color is required"]
    },
    type: {
        type: String,
        required: [true, "Type is required"]
    },
    amount: {
        type: String,
        required: [true, "Amount is required"]
    },
    currency: {
        type: String,
        required: [true, "Currency is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    labels: {
        type: Array,
        required: [true, "Labels is required"]
    },
    date: {
        type: String,
        required: [true, "Date is required"]
    },
    time: {
        type: String,
        required: [true, "Time is required"]
    },
    payer: {
        type: String,
        required: [true, "Payer is required"]
    },
    note: {
        type: String,
        required: [true, "Date is required"]
    },
    paymentType: {
        type: String,
        required: [true, "Payment Type is required"]
    },
    paymentStatus: {
        type: String,
        required: [true, "Payment Status is required"]
    }

}, { timestamps: true }
);

const expenseModel = new mongoose.model('Expense', expenseSchema);
module.exports = expenseModel;
