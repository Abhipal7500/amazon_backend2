const moment = require('moment');
const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const userSchema=new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile_pic:{
        type: String,
        default:"empty-avatar.jpg"
    },
    createdAt:{
        type:String,
        default: moment().format("DD/MM/YYYY") + ";" + moment().format("hh:mm:ss")
    },

    updatedAt:{
        type:String,
        default: moment().format("DD/MM/YYYY") + ";" + moment().format("hh:mm:ss")
    }

});

mongoose.model("users",userSchema);

module.exports = mongoose.model("users");



