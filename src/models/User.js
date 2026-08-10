const mongoose = require("mongoose")
const generateCustomId = require("../utils/customIdGenerator")
const userSchema = mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    name: {type: String, required: true},
    email:{type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    }

})

userSchema.pre("validate", function (){
    if(!this.uid){
            this.uid = generateCustomId();
    }
})
const User = mongoose.model('User', userSchema)

module.exports = User

  