import userModel from '../Model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserProfile from '../Model/userProfile.js';
import User from '../Model/user.js';
import cloudinary from '../Config/cloudinary.js';
import likedProfile from '../Model/liked.js';
import mongoose from 'mongoose';
import Razorpay from 'razorpay'
import crypto from 'crypto';
import payment from '../Model/payment.js';
import premium from '../Model/premium.js';


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
        password: hashedPassword,
        status: true,
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

        if (!user.status) {
          res.send({ Blocked: 'Account is Blocked' });
          return;
        }

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
    // console.log("working....", req.body.userId);

    try {
      const user = await userModel.findById(req.body.userId);
      // console.log(user);
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
    // console.log("ivede", req.body, "body")
    // console.log(req.files, "file")

    req.files.forEach((file, index) => {
      console.log(`File ${index + 1}:`, file);
      // Handle the uploaded file as needed
    });

    try {

      const { image, about, gender, relationshipGoals, passion, age, language, lifeStyle, job, company, school, place, showAge, showDistance } = req.body;

      let cloudImageUrls = [];
      const images = req.files;

      if (images && images.length > 0) {
        // Loop through each uploaded image
        for (const image of images) {
          const result = await cloudinary.uploader.upload(image.path); // Upload image to Cloudinary
          cloudImageUrls.push(result.secure_url); // Store the secure URL
        }
      }

      // console.log(cloudImageUrls, "cloud image herereeeee")


      const existingProfile = await UserProfile.findOne({ user: req.body.userId });
      if (existingProfile) {
        existingProfile.image = cloudImageUrls;
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
        // console.log(existingProfile, "Updated user profile");
        res.status(200).send({ message: "Profile updated successfully" });

      } else {

        const user = await User.findOne({ _id: req.body.userId });
        const userName = user.name;


        const userProfile = new UserProfile({
          user: req.body.userId,
          name: userName,
          image: cloudImageUrls,
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
        // console.log(userProfile, "Created user profile")

        const updatedUser = await User.findByIdAndUpdate(
          req.body.userId,
          { $set: { profile: true } },
          { new: true }
        );
        // console.log(updatedUser,"Updated user here")

        res.status(200).send({ message: "Profile updated successfully" })
      }
    } catch (err) {
      console.log(err)
      res.status(500).send({ err: 'Internal Server Error' })
    }
  },


  getUserProfile: async (req, res) => {
    try {
      const userProfile = await UserProfile.findOne({ user: req.body.userId });
      if (userProfile) {
        // console.log(userProfile, "user profile")
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


  likedProfile: async (req, res) => {
    try {

      const currentUser = req.body.userId;

      // Match concept Here
      const userProfileId = req.body._id;
      // console.log(userProfileId, "id here")
      const user = await UserProfile.findById(userProfileId);
      const matchUser = user.user;
      // console.log(matchUser,"matchUser");

      const matchLikedProfile = await likedProfile.findOne({ user: matchUser });
      console.log(matchLikedProfile, "matchLikedProfile");

      if (!matchLikedProfile) {
        console.log("no matching profile found")
      } else {

        const currentUserProfile = await UserProfile.findOne({ user: currentUser });

        // const usersAlreadyMatched = await Match.find({ user1: currentUser, user2: userProfileId});

        if (currentUserProfile) {
          var usersMatched = matchLikedProfile.userProfileId.includes(currentUserProfile._id);
          if (usersMatched) {

            const profile = await likedProfile.findOne({ user: currentUser });

            if (profile) {

              const existingProfileIndex = profile.userProfileId.indexOf(userProfileId);

              if (existingProfileIndex === -1) {
                profile.userProfileId.push(userProfileId);
                await profile.save();
                var likeProfileArray = profile ? [profile] : [];
              } else {
                var likeProfileArray = profile ? [profile] : [];
              }


            } else {

              const likeProfile = new likedProfile({
                userProfileId: userProfileId,
                user: currentUser,

              })

              await likeProfile.save();
              console.log(likeProfile, "user profile created");
              var likeProfileArray = likeProfile ? [likeProfile] : [];
            }

            console.log("its a Match");

            const match = await User.findByIdAndUpdate(currentUser, { $push: { matches: matchUser } });
            const opomatch = await User.findByIdAndUpdate(matchUser, { $push: { matches: currentUser } });

            console.log(match, opomatch, "user profile updated");

            res.status(200).send({ match: "Congratulations, it's a match!🎉 Let the sparks fly✨", likeProfileArray });

          } else {
            console.log("no match")
          }
        } else {
          console.log("No user profile found")
        }
      }

      if (!usersMatched) {

        const userId = req.body.userId;
        const profile = await likedProfile.findOne({ user: userId });
        console.log(profile, "profile found")

        if (profile) {

          const existingProfileIndex = profile.userProfileId.indexOf(userProfileId);

          if (existingProfileIndex === -1) {
            profile.userProfileId.push(userProfileId);
            await profile.save();
            const likeProfileArray = profile ? [profile] : [];
            res.status(200).json({ message: 'Profile Liked successfully', likeProfileArray });
          } else {
            const likeProfileArray = profile ? [profile] : [];
            res.status(200).json({ message: 'Profile Already Liked', likeProfileArray });
          }

        } else {

          const likeProfile = new likedProfile({
            userProfileId: userProfileId,
            user: userId,

          })

          await likeProfile.save();
          console.log(likeProfile, "user profile created");

          const likeProfileArray = likeProfile ? [likeProfile] : [];

          res.status(200).json({ message: 'Profile Liked successfully', likeProfileArray });

        }
      }
    } catch (err) {

      res.status(500).json({ error: "Unable to like profile." });

    }
  },

  getLikedProfile: async (req, res) => {

    const userId = req.body.userId;

    try {
      const likeProfile = await likedProfile.findOne({ user: userId });
      // console.log(likeProfile, "liked all users");

      // Convert the likeProfile object to an array containing that object
      const likeProfileArray = likeProfile ? [likeProfile] : [];
      res.status(200).json(likeProfileArray);
    } catch {

    }
  },

  getLikedUserProfiles: async (req, res) => {
    const userId = req.body.userId;
    try {


      const likeProfile = await likedProfile.findOne({ user: userId }).populate('userProfileId');
      console.log(likeProfile, "here is like profile")

      if (!likeProfile?.matched) {
        res.status(200).json(likeProfile?.userProfileId);
      } else {
        res.status(200).send();
      }


    } catch (err) {
      console.log(err, "error")
    }
  },

  verifyProfile: async (req, res) => {
    try {

      const profile = await UserProfile.find({ user: req.body.userId })
      // console.log(profile)

      if (profile.length === 0) {
        res.status(200).send({ message: "Verify your profile to see" });
      } else {
        console.log("ok")
      }

    } catch (err) {
      console.log(err, "Error")
      res.status(500).send({ message: "Server error" });
    }
  },


  getFilteredUsers: async (req, res) => {
    try {

      const gender = req.body?.gender?.toString();
      const ageRange = req.body?.age;
      const relationshipGoals = req.body?.relationship?.toString();

      const query = {};

      if (gender) {
        query.gender = gender;
      }

      if (ageRange) {
        const [lowerBound, upperBound] = ageRange.split('-').map(Number);
        query.age = { $gte: lowerBound, $lte: upperBound };
      }

      if (relationshipGoals) {
        query.relationshipGoals = relationshipGoals;
      }


      const matchingUsers = await UserProfile.find(query)

      console.log(matchingUsers, "filtered user getting here")
      res.status(200).send(matchingUsers);

    } catch (err) {
      console.log(err, "error Here")
    }
  },

  getMatchedUserProfiles: async (req, res) => {

    try {

      const userId = new mongoose.Types.ObjectId(req.body.userId);

      const matchedUsers = await userModel.find({ matches: userId });
      console.log(matchedUsers, "matched user")

      const matchedUserIds = matchedUsers.map(matchedUser => matchedUser._id);

      const matchedUserProfiles = await UserProfile.find({ user: { $in: matchedUserIds } });


      console.log(matchedUserProfiles, "matched user here");
      res.status(200).send(matchedUserProfiles);

    } catch (err) {

      console.log(err, "error here");

    }
  },

  paymentOrders: async (req, res) => {

    try {
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
      });

      const options = {
        amount: 500 * 100,
        currency: 'INR',
        receipt: 'receipt_order_74394',
      };

      const order = await instance.orders.create(options);

      if (!order) return res.status(500).send('Some error occurred');
      console.log(order, "This is orders")
      res.json(order);

    } catch (err) {
      res.status(500).send(err);
    }
  },

  paymentSuccess: async (req, res) => {
    try {
      const {
        orderCreationId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
      } = req.body;

      // console.log(req.body, "success payment");

      const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);
      shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
      const digest = shasum.digest('hex');

      if (digest !== razorpaySignature) {
        return res.status(400).json({ msg: 'Transaction not legit!' })
      }

      const newPayment = payment({
        user: req.body.userId,
        amount: Number(500),
        razorpayDetails: {
          orderId: razorpayOrderId,
          paymentId: razorpayPaymentId,
          signature: razorpaySignature,
        },
        status: 'success',
        timestamp: Date.now(),
      });

      await newPayment.save();

      const newPremium = premium({
        user: req.body.userId,
        start_date: Date.now(),
        end_date: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)),
        status: 'active',
      })
      await newPremium.save();


      res.json({
        success: 'success',
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
      });


    } catch (err) {
      res.status(500).send(err)
    }
  },

  premiumStat:async (req, res) => {

    try {
      const userId = req.body.userId;
      const stat = await premium.findOne({ user: userId, status: 'active'});

      if(stat){
        res.status(200).send(stat);
      }

    } catch(err) {
        res.status(500).send(err);
    }

  }

};


export default userController;
