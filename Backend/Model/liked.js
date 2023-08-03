import mongoose from "mongoose";

const likedProfileSchema = new mongoose.Schema({

    userProfileId: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UserProfile',
    }],
    user: {
        type: String,
        required: true,
    },
    
})

const likedProfile = mongoose.model('likedProfile', likedProfileSchema);

export default likedProfile;