const mongoose = require('mongoose')

const Tenatsschema = mongoose.Schema({
        _id:mongoose.Schema.Types.ObjectId,
        img:String,
        price:String,
        sqft:String,
        bhk:Number,
        description:String,
        location:String
})

module.exports = mongoose.model('tenants',Tenatsschema)