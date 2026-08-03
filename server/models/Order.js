const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({

    customer:{
        type:String,
        required:true
    },


    item:{
        type:String,
        required:true
    },


    image:{
        type:String,
        default:""
    },


    price:{
        type:Number,
        required:true
    },


    quantity:{
        type:Number,
        required:true
    },


    amount:{
        type:Number,
        required:true
    },


    status:{
        type:String,
        default:"Pending"
    },


    createdAt:{
        type:Date,
        default:Date.now
    }

});


module.exports = mongoose.model("Order", orderSchema);