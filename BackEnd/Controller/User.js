const userModel = require('../Model/User')

const userController = {
    Register : async(req , res)=>{
        try {
            const newUser = new userModel(req.body)
            await newUser.save()
            res.status(200).json(newUser)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = userController