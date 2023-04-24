const userDb = require("../schemas/userSchema")
const conversationDb = require("../schemas/conversationSchema")

module.exports = {
    getAll: async (req, res) => {
        const users = await userDb.find()
        res.send({users})
    },
    createConversation: async (req, res) => {
        const {from, to} = req.body

        const convoExists = await conversationDb.findOne({participants: {$all: [from, to]}})

        if (convoExists) return res.send({success: false})

        const newConv = new conversationDb({
            participants: [from, to],
            messages: []
        })

        await newConv.save()
        const conversations = await conversationDb.find({participants:  from})
        res.send({success: true, conversations})
    },
    allConversations: async (req, res) => {
        const {username} = req.body
        const conversations = await conversationDb.find({participants: {$all: [username]}})

        res.send({success: true, conversations})

    },
    getChat: async (req, res) => {
        const {id} = req.params
        const conversation = await conversationDb.findOne({_id: id})
        res.send({success: true, conversation})
    },

    sendMessage: async (req, res) => {
        const {id, username, message} = req.body

        const newMessage = {
            username,
            message,
            time: Date.now(),
            reaction: '',
        }

        const conversation = await conversationDb.findOneAndUpdate(
            {_id: id},
            {$push: {messages: newMessage}},
            {new: true}
        )

        res.send({success: true, conversation})
    },
    deleteOne: async (req, res) => {
        const { id, username } = req.params
        await conversationDb.findOneAndDelete({_id: id})
        const conversations = await conversationDb.find({participants: {$all: [username]}})
        res.send({success: true, conversations})
    },
    setReaction: async (req, res) => {
        const {reaction, id, messageIndex} = req.body
        await conversationDb.findOneAndUpdate(
            {_id: id},
            {$set: { [`messages.${messageIndex}.${'reaction'}`]: reaction}},
        )

        res.send({success: true})
    },
}