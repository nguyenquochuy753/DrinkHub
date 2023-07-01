const router = require('express').Router()
const userController = require('../Controller/User')

router.post('/register',userController.Register)

module.exports = router