import userModel from '../Model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserProfile from '../Model/userProfile.js';
import User from '../Model/user.js';
import cloudinary from '../Config/cloudinary.js';

const userController = {

  signup: async (req, res) => {
    const { name, email, password } = req.body;

    try {

      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.send({ err: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await userModel.create({
        name,
        email,
        password: hashedPassword
      });

      console.log(newUser.name);
      res.status(200).send({ message: 'User registered successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).send({ err: 'Internal server error' });
    }
  },


  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await userModel.findOne({ email });

      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          let token;
          token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

          res.status(200).send({ success: true, token: token });
        } else {
          res.send({ passErr: 'Invalid password' });
        }
      } else {
        res.send({ emailErr: 'User not found' });
      }
    } catch (error) {
      res.status(500).send({ err: 'Internal Server Error' });
    }
  },


  getUser: async (req, res) => {
    console.log("working....", req.body.userId);

    try {
      const user = await userModel.findById(req.body.userId);
      console.log(user);
      res.status(200).send({
        success: true,
        message: "user fetched success",
        data: user
      });
    } catch (err) {
      res.send({
        success: false,
        message: err.message
      });
    }
  },


  userProfile: async (req, res) => {

    console.log("ivede", req.body, "body")
    console.log(req.file, "file")

    try {

      const { about, gender, relationshipGoals, passion, age, language, lifeStyle, job, company, school, place, showAge, showDistance } = req.body;

      //First Time error checking
      if (!about && !gender && !relationshipGoals && !passion && !age && !language && !lifeStyle && !job && !company && !school && !place && !showAge && !showDistance) {
        res.status(200).send({ message: "Please enter at least one field to update and then save." });
        return;
      }

      let cloudImage;
      const image = req.file;

      if (image) {
        const result = await cloudinary.uploader.upload(image.path);
        cloudImage = result.secure_url;
      }

      console.log(cloudImage, "cloud image herereeeee")


      const existingProfile = await UserProfile.findOne({ user: req.body.userId });

      if (existingProfile) {
        if (image) existingProfile.image = cloudImage;
        if (about) existingProfile.about = about;
        if (gender) existingProfile.gender = gender;
        if (relationshipGoals) existingProfile.relationshipGoals = relationshipGoals;
        if (passion) existingProfile.passion = passion;
        if (age) existingProfile.age = age;
        if (language) existingProfile.language = language;
        if (lifeStyle) existingProfile.lifeStyle = lifeStyle;
        if (job) existingProfile.job = job;
        if (company) existingProfile.company = company;
        if (school) existingProfile.school = school;
        if (place) existingProfile.place = place;
        if (showAge) existingProfile.showAge = showAge;
        if (showDistance) existingProfile.showDistance = showDistance;

        await existingProfile.save();
        console.log(existingProfile, "Updated user profile");
        res.status(200).send({ message: "Profile updated successfully" });

      } else {

        const user = await User.findOne({_id: req.body.userId});
        const userName = user.name;


        const userProfile = new UserProfile({
          user: req.body.userId,
          name: userName,
          image: cloudImage,
          about,
          gender,
          relationshipGoals,
          passion,
          age,
          language,
          lifeStyle,
          job,
          company,
          school,
          place,
        })

        await userProfile.save();
        console.log(userProfile, "Created user profile")
        res.status(200).send({ message: "Profile updated successfully" })
      }
    } catch (err) {
      console.log(err)
      res.status(500).send({ err: 'Internal Server Error' })
    }
  },


  getUserProfile: async (req, res) => {
    try {
      console.log(req.body.userId, "getsuer profile")
      const userProfile = await UserProfile.findOne({ user: req.body.userId });
      if (userProfile) {
        console.log(userProfile, "user profile")
        res.status(200).json(userProfile)
      } else {
        res.status(200).json({ message: 'Set user profile' });
      }
    } catch {
      res.status(500).json({ err: 'Internal Server Error' });
    }
  },

  getAllUserProfile: async (req, res) => {
    try {
      const userDet = await UserProfile.find({});
      res.status(200).json(userDet);
    } catch (error) {
      // If there's an error while fetching user profiles, handle it here.
      console.error('Error fetching user profiles:', error);
      res.status(500).json({ error: 'Failed to fetch user profiles.' });
    }
  },


};


export default userController;
