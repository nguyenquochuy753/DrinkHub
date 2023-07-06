const router = require('express').Router()
const userController = require('../Controller/User')

router.post('/register',userController.Register)
router.put('/addProductAtCart/:_id',userController.addProducAtCart)

module.exports = router