const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema ({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    name:{
        type:String,
        required:true,
    },
    crop:{
        type:String,
        required:true,   
    },
    Phone:{
        type:Number,
        required:true,
    },
    Qty:{
        type:Number,
        required:true,
    },
    Price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    
});

module.exports = mongoose.model('agro_list',NotesSchema);