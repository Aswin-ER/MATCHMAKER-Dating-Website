import AdminModel from '../Model/admin.js';

const adminControllers = {

    login: async (req, res) => {
        const { email, password } = req.body;

        const admin = await AdminModel.findOne({ email: email });

        if (admin) {
            if (admin.password === password) {
                res.status(200).send({ success: "Login successful" })
            } else {
                res.send({ err: "Invalid password" })
            }
        } else {
            res.send({ err: "Invalid admin Found" })
        }
    },
}


export default adminControllers;

