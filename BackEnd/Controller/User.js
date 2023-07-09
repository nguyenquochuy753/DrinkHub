const userModel = require('../Model/User')
const cartModel = require('../Model/Cart')
const productAddAtCartModel = require('../Model/ProductAddAtCart')

const userController = {
    Register : async(req , res)=>{
        try {
            const newCart = new cartModel()
            const newUser = new userModel({
                username : req.body.username ,
                pass : req.body.pass ,
                cart_id : newCart._id
            })
            await newCart.save()
            await newUser.save()
            res.status(200).json(newUser)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    addProducAtCart : async(req , res)=>{
        const user_id = req.params._id;
        try {
            const user = await userModel.findById(user_id);
            const newProductAddAtCart = new productAddAtCartModel(req.body);

            cartModel.findById(user.cart_id)
                .then(cart => {
                    cart.id_product_add_cart.push(newProductAddAtCart._id);
                    return cart.save();
                })
                .then(() => newProductAddAtCart.save())
            res.status(200).json('Thêm vào giỏ hàng thành công!')
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getProductInCart : async(req,res)=>{
        const user_id = req.params._id
        try {
            const productInCart = await userModel.findById(user_id)
                .populate({
                    path: 'cart_id',
                    populate: {
                        path: 'id_product_add_cart',
                        populate: {
                            path: 'id_product',
                            model: 'Drink'
                        }
                    }
                })
            res.status(200).json(productInCart)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = userController