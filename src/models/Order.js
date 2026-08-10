const mongoose = require("mongoose")
const generateCustomId = require("../utils/customIdGenerator")
const orderSchema  = mongoose.Schema({
    oid: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    foodItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodItem'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
   
    quantity: {
        type: Number,
        default: 1
    },
    
    totalAmount: Number,
    status: {
        type: String,
        enum: ['placed', 'preparing', 'cancelled', 'delivered']
    }

}, {timestamps: { createdAt: 'created_at'}})


orderSchema.pre('validate', function(){
    if(!this.oid){
        this.oid = generateCustomId();
    }
})
const Order = mongoose.model('order', orderSchema)

module.exports = Order
