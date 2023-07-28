import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
    
  image: String,
  about: String,
  gender: String,
  relationshipGoals: String,
  passion: String,
  age: Number,
  language: String,
  lifeStyle: String,
  job: String,
  company: String,
  school: String,
  place: String,
  showAge: Boolean,
  showDistance: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

export default UserProfile;