const drinkModel = require('../Model/Drink')

const drinkController = {
    addDrink : async(req , res) => {
        const newDrink = new drinkModel(req.body)
        if(req.file){
            newDrink.img_url = req.file.path
        }
        try {
            await newDrink.save()
            res.status(200).json(newDrink)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = drinkController