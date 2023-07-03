const router = require('express').Router()
const drinkController = require('../Controller/Drink')
const upload = require('../Middleware/Upload')

router.post('/addDrink',upload.single('img_url'),drinkController.addDrink)

module.exports = router