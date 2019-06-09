const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const crimeDetail = new Schema({
    details: {
                name: {
                    type : String,
                    required : true
                } ,
                typeid : {
                    type: String,
                    required : true
                } ,
                description : {
                    type: String,
                    required: true
                },
            
                dateAndTime : {
                    type: Date,
                    default: new Date,
                    
                },
                address: {
                    type: String,
                    required: true
                },
                location:{
                     type: Object,
                     required: true
                }
    }
})


const Detail = mongoose.model("crimeDetail",crimeDetail);
module.exports = Detail;