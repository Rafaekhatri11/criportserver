const Missing = require('../model/missing');

module.exports = {

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
