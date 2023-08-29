import mongoose from 'mongoose';
import Chat from '../Model/chat.js';
import chatModel from '../Model/chat.js';
import message from '../Model/message.js';
import User from '../Model/user.js';
import UserProfile from '../Model/userProfile.js';

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
        }).populate('users', '-password').populate('latestMessage').populate('userProfiles');

        isChat = await User.populate(isChat, {
            path: 'latestMessage.sender',
            select: 'name picture email',
        });

        if (isChat.length > 0) {
            res.send(isChat[0]);
        } else {

            var chatData = {
                chatName: "sender",
                users: [userId, oppoId],
            }

            try {
                const createdChat = await chatModel.create(chatData);

                const fullChat = await chatModel.findOne({ _id: createdChat._id }).populate('users', '-password').populate('userProfiles')
                res.status(200).send(fullChat);
            } catch (err) {
                res.status(400);
                throw new Error(err.message);
            }
        }
    },

    fetchChat: async (req, res) => {
        try {
            const { userId } = req.body
            Chat.find({ users: { $elemMatch: { $eq: userId } } })
                .populate("users", "-Password")
                .populate("latestMessage")
                .sort({ updatedAt: -1 })
                .then(async (result) => {
                    result = await User.populate(result, {
                        path: "latestMessage.sender",
                        select: "name email"
                    })
                    res.status(200).send(result)
                })
        } catch (error) {
            console.log(error, "fetchChat error catch")
            res.status(400).json({ error })
        }
    },

    getMatchedUserProfiles: async (req, res) => {
        try {
            const userId = new mongoose.Types.ObjectId(req.body.userId);
            // console.log(userId,"heheh")
            const user = await User.findById(userId);
            const matchedUsers = user.matches;
            // console.log(matchedUsers,"match")

            let chat = [];
            for(let i = 0; i < matchedUsers.length; i++) {
                chat[i] = await Chat.findOne({ users: userId && matchedUsers[i] }).populate('latestMessage').populate('users');
            }
            // console.log(chat,"success")

            let chatId = [];
            for (let i = 0; i < chat.length; i++) {
                chatId[i] = chat[i]._id;
            }
            // console.log(chatId, "success")

            let latestMessage = [];
            for (let i = 0; i < chat.length; i++) {
                latestMessage[i] = chat[i].latestMessage;
            }

            let userPro = [];
            for (let i = 0; i < matchedUsers.length; i++) {
                userPro[i] = await UserProfile.findOne({ user: matchedUsers[i] });
            }

            // const matchedUserIds = matchedUsers.map(matchedUser => matchedUser);
            // console.log(matchedUserIds, "asasasas")

            // let chatId = [];
            // for (let i = 0; i < matchedUserIds.length; i++) {
            //     chatId[i] = await UserProfile.findOne({ user: matchedUserIds[i] });
            // }

            // console.log(chatId, "all chat id here");
            res.status(200).send({message: latestMessage, userPro: userPro, chatId: chatId});


        } catch (err) {
            console.log(err, "error here");
        }
    },

}


export default chatControllers;

