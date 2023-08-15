import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },

    amount: {
        type: Number,
        required: true,
    },

    razorpayDetails: {
        orderId: {
            type: String,
            required: true,
        },

        paymentId: {
            type: String,
            required: true,
        },

        signature: {
            type: String,
            required: true,
        },
    },

    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    },

    status: {
        type: String,
        enum: ['success', 'pending', 'failed'],
        required: true
    },

})

const payment = mongoose.model('payment', paymentSchema);

export default payment;

