const mongoose = require("mongoose");

module.exports = ()=> {
    try{
        mongoose.connect(process.env.DB);
        console.log("Connected to DB")
    }catch(error){
        console.log(error);
        console.log("Not connected to DB")
    }
};
