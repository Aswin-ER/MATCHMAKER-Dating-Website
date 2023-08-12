import Chat from '../Model/chat.js';
import chatModel from '../Model/chat.js';
import message from '../Model/message.js';
import User from '../Model/user.js';

const chatControllers = {

    accessChat: async (req, res) => {

        const { userId, oppoId } = req.body;

        if (!oppoId) {
            console.log("No user Found");
            return res.sendStatus(404);
        }

        var isChat = await chatModel.find({
            $and: [
                {
                    users: { $elemMatch: { $eq: userId } }
                },
                {
                    users: { $elemMatch: { $eq: oppoId } }
                }
            ],
        }).populate('users', '-password').populate('latestMessage');

        isChat = await User.populate(isChat, {
            path: 'latestMessage.sender',
            select: 'name picture email',
        });

        if (isChat.length > 0) {
            // console.log(isChat[0], "chat")
            res.send(isChat[0]);
        } else {
            var chatData = {
                chatName: "sender",
                users: [userId, oppoId],
            }

            try {
                const createdChat = await chatModel.create(chatData);

                const fullChat = await chatModel.findOne({ _id: createdChat._id }).populate('users', '-password');
                // console.log(fullChat,"created")
                res.status(200).send(fullChat);
            } catch (err) {
                res.status(400);
                throw new Error(err.message);
            }
        }
    },

    // fetchChats: (req, res) => {

    //     try {
    //         chatModel.find({ users: { $elemMatch: { $eq: req.body.userId } } })
    //             .populate('users', '-password')
    //             .populate('latestMessage')
    //             .sort({ updatedAt: -1 })
    //             .then(async (result) => {
    //                 result = await User.populate(result, {
    //                     path: 'latestMessage.sender',
    //                     select: 'name picture email',
    //                 });

    //                 res.status(200).send(result);
    //             })
    //     } catch (err) {
    //         console.log(err)
    //     }
    // },

}


export default chatControllers;

