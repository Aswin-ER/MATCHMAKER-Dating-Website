import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
    
  image: [{ type: String }],
  name: String,
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

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

export default UserProfile;