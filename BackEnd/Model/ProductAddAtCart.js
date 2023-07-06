const mongoose = require('mongoose')

const productAddAtCartSchema = new mongoose.Schema({
    id_product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drink',
    },
    SL : {
        type : Number ,
        required : true
    }
})

const ProductAddAtCart = mongoose.model('ProductAddAtCart', productAddAtCartSchema)
module.exports = ProductAddAtCart