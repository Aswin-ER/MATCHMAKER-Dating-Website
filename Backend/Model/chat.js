import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({

    chatName: { type: String, trim: true },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }
    ],

    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message',
    },
},

    {
        timestamps: true,
    }
);

const chat = mongoose.model('chat', chatSchema);

export default chat;