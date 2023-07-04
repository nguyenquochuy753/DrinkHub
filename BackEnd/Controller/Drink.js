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
    },
    getAllDrink : async(req,res)=>{
        try {
            const allDrink = await drinkModel.find()
            res.status(200).json(allDrink)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    countDrink: async (req, res) => {
        try {
            const countDrink = await drinkModel.count()
            res.status(200).json(countDrink)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    countPage : async(req,res)=>{
        try {
            const countDrink = await drinkModel.count();
            const countPages = Math.ceil(countDrink / 6);
            res.status(200).json(countPages);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = drinkController