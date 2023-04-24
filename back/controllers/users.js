const userDb = require('../schemas/userSchema')
const bcrypt = require("bcrypt")
const conversationDb = require("../schemas/conversationSchema")

module.exports = {
    changeProfile: async (req, res) => {
        const { username, password, profileImg, id, prevUsername} = req.body
        const hashedPass = await bcrypt.hash(password, 10)
        const existUser = await userDb.findOne({username})

        if(existUser && prevUsername !== username) return res.send({success: false, message: "User already exist"})

        await conversationDb.updateMany(
          {participants: prevUsername},
          {
            $set: { "participants.$": username, "messages.$[].username": username},
          }
        )
         await userDb.findOneAndUpdate(
          {_id: id},
          {username, password: hashedPass, profileImg},
          { new: true }
      )
        const allUsers = userDb.find().lean()
        const sanitizedUsers = allUsers && Array.isArray(allUsers) ? allUsers.map(user => {
          const { client, ...sanitizedUser } = user;
          return sanitizedUser;
        }) : [];
        res.send({success: true, message: "", allUsers: sanitizedUsers})
    },
    getUser: async (req, res) => {
      const { id } = req.params
      const user = await userDb.findOne({_id: id})
      res.send({success: true, message: "", user})
    }
   
}