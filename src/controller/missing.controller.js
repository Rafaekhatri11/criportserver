const Missing = require('../model/missing');

module.exports = {

     delete : (req,res) => {
         Missing.findByIdAndRemove({_id:req.params.uid}).then(() => {
             Missing.find().then((data)=>{
                 res.send(data);
             }).catch((err) => {
                 console.log(err);
             })
         })
     },
     approve : (req,res) => {
        Missing.findByIdAndUpdate({_id: req.params.uid} ,{
           persons: {
                approve: req.body.approve,
                Name: req.body.Name,
                Description: req.body.Description,
                iamgeURL: req.body.imageURL ,
                dateAndTime: new Date(),
                Location: req.body.location
            }
        }).then(() => {
                Missing.find().then(data => {
                    res.send({
                        missing : data
                    })
                }).catch(err => {
                    console.log(err )
                })
        })
     },
     getmissing: (req,res) => {
            Missing.find().then((allmissing) => {
                res.send({
                    missing : allmissing
                })
            }).catch(err => {
                console.log(err)
            })
    },
    missingperson: (req, res) => {

        let persons = {
            Name: req.body.persons.name,
            Description: req.body.persons.description,
            iamgeURL: req.body.persons.imageURL,
            Location: req.body.persons.location
        }
        var postmissingDetails = new Missing({ persons });
        postmissingDetails.save()
            .then((data) => {
                console.log(data);
                res.send("Success");
            })
            .catch(err => {
                res.status(500).send(err)
            })
    }
}
