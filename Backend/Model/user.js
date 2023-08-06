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
    userProfile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile',
      },
});

const User = mongoose.model('user', userSchema);

export default User;
