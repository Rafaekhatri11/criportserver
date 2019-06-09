const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postComment = new Schema({
    comments: {
                missingId: {
                    type : String,
                    required : true
                } ,
                comment: {
                    type: String,
                    required: true
                },
                dateAndTime: {
                    type: Date,
                    default : new Date()
                }
                
    }
})


const Comment = mongoose.model("Comment",postComment);
module.exports = Comment;