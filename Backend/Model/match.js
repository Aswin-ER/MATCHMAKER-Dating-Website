import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({

    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Reference to the User model
        required: true,
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Reference to the User model
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },

})

const Match = mongoose.model('Match', matchSchema);

export default Match;