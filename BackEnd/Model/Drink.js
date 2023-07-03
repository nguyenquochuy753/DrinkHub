const mongoose = require('mongoose')

const drinkSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true
    },
    des : {
        type : String ,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    img_url : {
        type : String ,
        required : true
    }
})

const Drink = mongoose.model('Drink',drinkSchema)
module.exports = Drink