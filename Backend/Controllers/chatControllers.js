import Chat from '../Model/chat.js';
import chatModel from '../Model/chat.js';
import message from '../Model/message.js';
import User from '../Model/user.js';

const chatControllers = {

    accessChat: async (req, res) => {

        const { userId, oppoUserId } = req.body;

        if (!oppoUserId) {
            console.log("No user Found");
            return res.sendStatus(404);
        }

        var isChat = await chatModel.find({
            $and: [
                {
                    users: { $elemMatch: { $eq: userId } }
                },
                {
                    users: { $elemMatch: { $eq: oppoUserId } }
                }
            ],
        }).populate('users', '-password').populate('latestMessage');

        isChat = await User.populate(isChat, {
            path: 'latestMessage.sender',
            select: 'name picture email',
        });

        if (isChat.length > 0) {
            res.send(isChat[0]);
        } else {
            var chatData = {
                chatName: "sender",
                users: [userId, oppoUserId],
            }

            try {
                const createdChat = await chatModel.create(chatData);

                const fullChat = await chatModel.findOne({ _id: createdChat._id }).populate('users', '-password');
                res.status(200).send(fullChat);
            } catch (err) {
                res.status(400);
                throw new Error(err.message);
            }
        }
    },

    fetchChats: (req, res) => {

        try {
            chatModel.find({ users: { $elemMatch: { $eq: req.body.userId } } })
                .populate('users', '-password')
                .populate('latestMessage')
                .sort({ updatedAt: -1 })
                .then(async (result) => {
                    result = await User.populate(result, {
                        path: 'latestMessage.sender',
                        select: 'name picture email',
                    });

                    res.status(200).send(result);
                })
        } catch (err) {
            console.log(err)
        }
    },

    getChatId: async (req, res) => {

        // console.log("reached here")
        try {
            const oppoId = req.body.oppoId;
            const userId = req.body.userId;

            // console.log(oppoId,"opop")
            // console.log(userId,"user")

            const chat = await Chat.findOne({
                users: { $all: [userId, oppoId] }
            })

            if (chat) {
                console.log(chat._id)
                res.status(200).json({ chatId: chat._id });
            } else {
                res.status(200).json({ message: "Chat not found" });
            }

        } catch {
            res.status(500).json({ error: "Internal server error" });
        }
    },

    getMessage: async (req, res) => {
        try {
            const newContent = req.body.content;
            const data = req.body.chatId;


            console.log(newContent, data, "2");

            const updatedMessage = await message.findOneAndUpdate({ chat: data.chatId }, { content: newContent }, { new: true });

            console.log(updatedMessage, "message updated");

            if (updatedMessage) {
                res.status(200).send([updatedMessage]);
            } else {
                res.status(200).send({ message: "No message found for update" });
            }

        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "An error occurred" });
        }
    },

    getAllMessages: async (req, res)=> {

        const id = req.params.id;

        console.log(id,'paa.messages')

        // const messages = await message.find({ chat: id });
        // console.log(messages)

        res.status(200).send();
    }

}


export default chatControllers;

