import mongoose from "mongoose";

const premiumSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },

    start_date: {
        type: Date,
        default: Date.now(),
        required: true,
    },

    end_date: {
        type: Date,
        required: true,
    },

    status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active',
    },

    payment_transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payment'
    },

})

const premium = mongoose.model('premiums', premiumSchema);

export default premium;