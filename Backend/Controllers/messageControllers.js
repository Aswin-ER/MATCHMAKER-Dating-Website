import Message from '../Model/message.js';
import chat from '../Model/chat.js';
import UserProfile from '../Model/userProfile.js';
import mongoose from 'mongoose';
import { ObjectId } from 'bson';

const messageControllers = {

    sendMessage: async (req, res) => {

        const { content, chatId } = req.body;

        if (!content || !chatId) {
            console.log("Invalid data passed into request");
            return res.sendStatus(404);
        }

        const userProfile = await UserProfile.findOne({ user: req.body.userId });


        var newMessage = {
            sender: req.body.userId,
            content: content,
            chat: chatId,
            userProfile: userProfile,
        }

        try {

            var message = await Message.create(newMessage);

            message = await message.populate('sender', 'name')
            message = await message.populate('chat')
            message = await message.populate('userProfile', 'image')

            await chat.findByIdAndUpdate(req.body.chatId, {
                latestMessage: message,
            })
            // console.log(message,"updated")
            res.json(message);
        } catch (err) {
            res.status(400);
            throw new Error(err.message);
        }
    },

    allMessage: async (req, res) => {
        try {
            // console.log(req.params.id, "chatId");
            // const ids = req.params.id.split(',');

            // Now you have an array of IDs
            // console.log(ids, "chatId");
            // let length = ids.length;
            // console.log(length, "chatId");

            // let message = [];
            // for (let i = 0; i < ids.length; i++) {
            const message = await Message.find({ chat: req.params.id }).populate('sender', 'name email')
                .populate('chat').populate('userProfile', 'image')
            // }
            // console.log(message, "message");

            res.json(message);
        } catch (err) {
            res.status(400);
            throw new Error(err.message);
        }
    },

}


export default messageControllers;

