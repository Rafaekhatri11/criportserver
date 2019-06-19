const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const missingPerson = new Schema({
    persons: {
                Name: {
                    type : String,
                    required : true
                } ,
                Description : {
                    type: String,
                    required : true
                } ,
                iamgeURL : {
                    type: String,
                    required: true
                },
                dateAndTime : {
                    type: Date,
                    default: new Date()
                },
                Location : {
                    type: Object,
                   required: true
                },
                approve: {
                    type: Boolean,
                    default: false
                }
    }
})


const Missing = mongoose.model("Missing",missingPerson);
module.exports = Missing;