const Detail = require('../model/details');


module.exports = {
    postDetails: (req,res) => {


        let details = {
            name: req.body.details.name,
            typeid :req.body.details.typeid ,
            description: req.body.details.description,
           
            address: req.body.details.address,
            location:req.body.details.location,

        }
        var Details =  new Detail({details});
        Details.save()
        .then((data) => {
            console.log(data);
            res.send("Success");
        })
        .catch(err => {
            res.status(500).send(err)
        })
    },

    getPostDetails : (req,res) => {
        
            Detail.find().then(data =>{
                console.log(data[0])
                res.send({
                    details:data
                })
            }).catch(err => {
                console.log(err)
            })
    }
}