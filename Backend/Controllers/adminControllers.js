import AdminModel from '../Model/admin.js';
import jwt from 'jsonwebtoken';
import User from '../Model/user.js';
import Premium from '../Model/premium.js';
import UserProfile from '../Model/userProfile.js';

const adminControllers = {

    login: async (req, res) => {
        const { email, password } = req.body;

        const admin = await AdminModel.findOne({ email: email });

        if (admin) {
            if (admin.password === password) {
                let token;
                token = jwt.sign({ adminId: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

                res.status(200).send({ success: "Login successful", token: token });
            } else {
                res.send({ err: "Invalid password" })
            }
        } else {
            res.send({ err: "Invalid admin Found" })
        }
    },

    getUsers: async (req, res) => {

        try {
            const users = await User.find();
            console.log(users, "admin users found");
            res.status(200).send(users);

        } catch {
            res.status(500).send({ err: "No users found" });
        }
    },

    totalUsers:async (req, res)=> {
        try{

            const users = await User.find({});
            const count = users.length;
            res.status(200).json(count);
        }catch(err){
            console.log(err,"totalUsers Error")
        }
    },

    totalPremium:async(req, res)=> {

        try{
            const premium = await Premium.find({});
            const count = premium.length;

            res.status(200).json(count);

        }catch(err){
            console.log(err)
        }
    },

    totalUserProfiles:async(req, res)=> {
        try {
            const profiles = await UserProfile.find({});
            const count = profiles.length;

            res.status(200).json(count);

        } catch (err) {
            console.log(err)
        }
    },

    totalGender:async (req, res)=> {

        try{
            const males = await  UserProfile.find({gender: 'Male'})
            const MaleCount = males.length;

            const females = await UserProfile.find({ gender: 'Females' })
            const FemalesCount = males.length;
            res.status(200).json({ males: MaleCount, females:FemalesCount});
        }catch(err) {

        }
    },

    ageOfUsers:async (req, res)=> {

        const age = await UserProfile.find({ age: { $gte: 18, $lte: 24 } });
        const age1 = await UserProfile.find({ age: { $gte: 25, $lte: 34 } });
        const age2 = await UserProfile.find({ age: { $gte: 35, $lte: 44 } });
        const age3 = await UserProfile.find({ age: { $gte: 45} });

        res.status(200).json({age:age.length, age1: age1.length, age2:age2.length, age3: age3.length});
    },

    userBlock: async (req, res) => {
        try {
           
            const user = await User.findById(req.body._id);
            const status = user.status

            if(status === false){
                user.status = true
                await user.save();
                res.status(200).send({ message: "User Unblocked successfully", status: true });
            }else{
                user.status = false
                await user.save();
                res.status(200).send({ message: "User Blocked successfully", status: false });
            }

        } catch (error) {

            console.error("Error in toggling user status:", error);
            res.status(500).send({ message: "Error in toggling user status" });
        }
    }

}


export default adminControllers;

