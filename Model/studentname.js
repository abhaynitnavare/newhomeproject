//Database Schema
const mongoose = require('mongoose')


const studentSchema = mongoose.Schema({
    Name: String,
    Email: String,
    Password:String,
    MobileNo:Number
})
//mongoDB model
module.exports = mongoose.model("studentnames",studentSchema)