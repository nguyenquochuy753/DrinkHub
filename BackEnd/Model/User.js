const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String ,
        required : true
    },
    pass : {
        type : String , 
        required : true
    },
    cart_id : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Cart' ,
        required : true
    }
})

const User = mongoose.model('User',userSchema)
module.exports = User