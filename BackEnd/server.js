const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv').config()
const userRouter = require('./Route/User')
const drinkRouter = require('./Route/Drink')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

mongoose.connect(process.env.Mongo_Connection).then(()=>{
    console.log('Đã kết nối MongoDB')
}).catch((err)=>{
    console.log(err)
})

app.use('/v1/user',userRouter)
app.use('/v1/drink',drinkRouter)

app.listen(8000,()=>{
    console.log('Server is running on port 8000')
})