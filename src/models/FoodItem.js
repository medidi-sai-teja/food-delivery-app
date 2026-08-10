const mongoose = require("mongoose")
const generateCustomId = require("../utils/customIdGenerator")
const foodItemSchema = mongoose.Schema({
    fid:{
        type: String,
        required: true,
        unique: true,
        index: true
    },
    name: String,
    price: Number,
})

foodItemSchema.pre('validate', function(){
    if(!this.fid){
        this.fid = generateCustomId()
    }
    
})

const FoodItem = mongoose.model('FoodItem', foodItemSchema);


module.exports = FoodItem;  