const router = require('express').Router()
const drinkController = require('../Controller/Drink')
const upload = require('../Middleware/Upload')

router.post('/addDrink',upload.single('img_url'),drinkController.addDrink)
router.get('/getAllDrink',drinkController.getAllDrink)
router.get('/countDrink',drinkController.countDrink)
router.get('/countPage', drinkController.countPage)
router.get('/drinkPaging/:pageNumber',drinkController.drinkPaging)

module.exports = router