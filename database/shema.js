const { name } = require('ejs');
const mongoose = require('mongoose');

const tryShema = mongoose.Schema({
    email:String,
    password:String,
    confrompassword:String,
     image:String,

    
});




module.exports =  mongoose.model("User",tryShema);
