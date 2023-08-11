import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },

    content: {
        type: String,
        trim: true,
    },

    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chat',
    },
},
{
    timestamps:true,
}
)

const message = mongoose.model('message', messageSchema);

export default message;