const mongoose = require('mongoose')

const Homebuyerschema = mongoose.Schema({
        _id:mongoose.Schema.Types.ObjectId,
        img:String,
        price:String,
        sqft:String,
        bhk:Number,
        description:String,
        location:String
})

module.exports = mongoose.model('buyers',Homebuyerschema)