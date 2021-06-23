var { Schema, model } = require("mongoose");
var { encrypt } = require("../utils/encrypt");
var { nanoid } = require("nanoid")

var userSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        default: nanoid(20),
        required: true,
        index: true
    },
    username: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true
    },
    userIcon: {
        type: String,
        default: "/assets/img/default.svg"
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    accountCreatedAt: {
        type: Date,
        required: true,
        default: () => new Date()
    }
})

module.exports = model("User", userSchema)