const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        default:""
    },

    company:{
        type:String,
        default:""
    },

    source:{
        type:String,
        default:"Website"
    },

    status:{
        type:String,
        default:"New"
    },

    followUpDate:{
        type:Date,
        default:null
    },

    notes:{
        type:String,
        default:""
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Lead", leadSchema);