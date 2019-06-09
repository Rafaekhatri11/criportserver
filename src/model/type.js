const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const crimeType = new Schema({
    type: {
               category: {
                   type: String,
                   require: true
               },
               subcategory :[]
    }
})


const Type = mongoose.model("crimeType",crimeType);
module.exports = Type;