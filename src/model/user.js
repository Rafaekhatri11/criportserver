const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  
                firstname: {
                    type : String,
                    required : true
                } ,
                lastname : {
                    type: String,
                    required : true
                } ,
                email : {
                    type: String,
                    required: true
                },
                password : {
                    type: String,
                    required: true
                },
                created : {
                    type: Date,
                    default: new Date()
                },
                updated: {
                    type: Date,
                    default: new Date()
                },
                admin: {
                    type: Boolean,
                    required: true
                },
                phoneNumber: {
                    type: String,
                    required: true
                },
                imageURL: {
                    type: String,
                },
                verified: {
                    type: Boolean,
                    required: true
                },
                verificationCode:{
                    type: String,
                    required: true
                },
                gender:{
                    type:String,
                    require: true   
                },
                suspend:{
                    type: Boolean,
                    default : false
                }
    
})


const Usercreate = mongoose.model("User",userSchema);
module.exports = Usercreate;