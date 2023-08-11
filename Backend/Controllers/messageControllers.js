import chatModel from '../Model/chat.js';
import User from '../Model/user.js';
import Message from '../Model/message.js';
import chat from '../Model/chat.js';

const messageControllers = {

    sendMessage: async (req, res)=> {

        const { content, chatId} = req.body;

        if(!content || !chatId){
            console.log("Invalid data passed into request");
            return res.sendStatus(404);
        }

        var newMessage = {
            sender:req.body.userId,
            content: content,
            chat: chatId,
        }

        try{

            var message = await Message.create(newMessage);

            message = await message.populate('sender', 'name picture')
                message = await message.populate('chat')
                message = await User.populate(message, {
                    path:'chat.user',
                    select:'name picture email',
                })

                await chat.findByIdAndUpdate(req.body.chatId, {
                    latestMessage: message,
                })

                res.json(message);
        }catch(err){
            res.status(400);
            throw new Error(err.message);
        }
    },

    allMessage: async(req, res)=> {
         try{
            const message = await Message.find({ chat: req.params.chatId }).populate('sender', 'name picture email')
                .populate('chat');

            res.json(message)
         }catch(err){
            res.status(400);
            throw new Error(err.message);
         }
    }
}


export default messageControllers;

