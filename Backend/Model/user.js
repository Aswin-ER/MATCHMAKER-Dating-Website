import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
    },
    password: {
        type: String,
    },
    picture: {
        type: String,
    },
    jti: {
        type: String,
    },
    status: {
        type: Boolean,
        required: true,
    },
    profile: {
        type: Boolean,
    },
    matches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile', }],
        
    userProfile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile',
      },

    premium: { 
        type: Boolean, 
        default: false 
    },
});

const User = mongoose.model('user', userSchema);

export default User;
