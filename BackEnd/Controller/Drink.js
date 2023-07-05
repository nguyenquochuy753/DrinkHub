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
            const countPages = Math.ceil(countDrink / 8);
            res.status(200).json(countPages);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    drinkPaging : async(req , res)=>{
        const pageNumber = req.params.pageNumber
        const pageSize = 8
        try {
            const drinkPaging = await drinkModel.find().skip((pageNumber-1)*pageSize).limit(pageSize)
            res.status(200).json(drinkPaging)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = drinkController