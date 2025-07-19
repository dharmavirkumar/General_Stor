const { name } = require('ejs');
const mongoose = require('mongoose');

const tryShema = mongoose.Schema({
    email:String,
    password:String,
    confrompassword:String,
    image:String,
    price:String,
    name:String,
    description:String,
    
});




module.exports =  mongoose.model("User",tryShema);
