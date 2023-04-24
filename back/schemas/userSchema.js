const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
        username: {
            type: String,
            required: true
        },
        secret: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        profileImg: {
            type: String,
            required: true,
            default: 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
        }
    }
)

module.exports = mongoose.model('ca-users', userSchema)


