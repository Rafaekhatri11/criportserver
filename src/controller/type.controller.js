const Type = require('../model/type');

module.exports = {
    type : (req,res) => {

        let  types = {
            category: req.body.type.category,
            subcategory : req.body.type.subcategory
 }
        var type = new Type({types});
        type.save()
        .then((data) => {
            console.log(data);
            res.send("Success");
        })
        .catch(err => {
            res.status(500).send(err)
        })
    }
}