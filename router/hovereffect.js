const mongoose = require("mongoose")
const Express = require("express")

const router = Express.Router();


router.get("/",(req,res)=>{
    // res.send("hello from api")
    res.render('auth/login',{title:"login page"})
})





module.exports = router