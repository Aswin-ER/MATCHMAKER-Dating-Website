import AdminModel from '../Model/admin.js';
import jwt from 'jsonwebtoken';
import User from '../Model/user.js';

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

