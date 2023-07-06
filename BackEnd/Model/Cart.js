const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    id_product_add_cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'ProductAddAtCart',
    }]
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart