const express = require("express")
const router = express.Router()
const {register, login} = require("../controllers/auth")
const {setReaction, getAll, deleteOne, createConversation, allConversations, getChat, sendMessage} = require("../controllers/conversations")
const validator = require("../middleware/validator")
const {changeProfile, getUser} = require("../controllers/users")

router.post("/register", validator, register)
router.post("/login", login)
router.get("/allUsers", getAll)

router.post("/newConversation",  createConversation)
router.post("/getConversations",  allConversations)
router.get("/conversation/:id/:username", deleteOne)

router.get("/chat/:id", getChat)
router.post("/sendMessage", sendMessage)
router.post("/setReaction", setReaction)

router.post("/changeProfile", validator, changeProfile)
router.get("/user/:id", getUser)

module.exports = router