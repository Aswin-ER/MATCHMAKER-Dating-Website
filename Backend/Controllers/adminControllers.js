import AdminModel from '../Model/admin.js';
import jwt from 'jsonwebtoken';

const adminControllers = {

    login: async (req, res) => {
        const { email, password } = req.body;

        const admin = await AdminModel.findOne({ email: email });

        if (admin) {
            if (admin.password === password) {
                let token;
                token = jwt.sign({ adminId: admin.id, email: admin.email}, process.env.JWT_SECRET, { expiresIn: "1h" });
                
                res.status(200).send({ success: "Login successful", token: token });
            } else {
                res.send({ err: "Invalid password" })
            }
        } else {
            res.send({ err: "Invalid admin Found" })
        }
    },
}


export default adminControllers;

