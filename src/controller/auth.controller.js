const nodemail = require('nodemailer');
const Usercreate = require('../model/user')
const jwt = require('jsonwebtoken')
var transporter = nodemail.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "rafaekhatri11@gmail.com",
        pass: "d@veloperone"
    }
});



module.exports = {
    //Node Mailer send Email

    alluser: (req,res) => {
            Usercreate.find().then(data => {
                res.send({
                    users : data
                })
            }).catch(err => {
                console.log(err )
            })
    },

    updatepro: (req, res) => {
        console.log(req.params.uid)

        Usercreate.findByIdAndUpdate({ _id: req.params.uid }, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            imageURL: req.body.imageURL,
            gender: req.body.gender
        }).then(() => {
            Usercreate.findOne({_id: req.params.uid}).then(newdata => {

                res.send(newdata)
            })
        }).catch(err => {
            res.send(err)
        })
    },

    login: (req, res) => {
        const body = req.body;
        console.log(body,"line 45")
        Usercreate.find({ "email": body.email })
            .then(user => {
                console.log(user[0])
                if (user.length < 1) {
                    res.send({
                        message: 'User deos not exist'
                    });
                }

                if (body.password === user[0].password) {
                    let getuser = user[0];
                    const token = jwt.sign({
                        uid: getuser._id,
                        created: getuser.created,
                        updated: getuser.updated,
                        suspend: getuser.suspend,
                        firstname: getuser.firstname,
                        lastname: getuser.lastname,
                        email: getuser.email,
                        password: getuser.password,
                        admin: getuser.admin,
                        phonenumber: getuser.phoneNumber,
                        imageURL: getuser.imageURL,
                        verified: getuser.verified,
                        gender: getuser.gender

                    }, 'secret',
                        {
                            expiresIn: '1h'
                        }
                    )
                    res.send({
                        message: 'Successfully Log In',
                        token: token
                    })
                }
                else {


                    res.send({
                        message: 'Password does not match'

                    })
                }
            }).catch(err => {
                console.log(err);
                res.send({
                    message: err
                })
            })
    }


    ,
    nodeMailer: (req, res) => {
        console.log(req.body.email, "youssuff");

        var rand = Math.floor((Math.random() * 100) + 56764);


        Usercreate.find({ "email": req.body.email })
            .then(user => {

                if (user.length >= 1) {
                    res.send({
                        message: "This email address is already exist please try a new one"
                    });
                } else {

                    var User = new Usercreate({
                        //  id : new mongoose.Types.ObjectId,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        password: req.body.password,
                        admin: req.body.admin,
                        phoneNumber: req.body.phonenumber,
                        imageURL: req.body.imageurl,
                        verified: req.body.verified,
                        verificationCode: rand,
                        gender: req.body.gender
                    });

                    User.save()
                        .then(result => {
                            console.log("======", result);
                            const token = jwt.sign({
                                email: result.email,
                                userId: result._id
                            }, 'secret',
                                {
                                    expiresIn: '1h'
                                }
                            )

                            let mailOptions = {
                                from: 'criport', // sender address
                                to: req.body.email, // list of receivers
                                subject: "criportesting", // Subject line
                                text: "Welcome to criport", // plain text body
                                html: `<b>your verification code is '${rand}' please verify on that link <a>'${`http://localhost:1010/signup/${rand}`}'</a> </b>` // html body
                            }
                            let info = transporter.sendMail(mailOptions).then((err, res) => {
                                console.log(res, "iuoeiwruoiw");
                            }).catch((errr) => {
                                console.log(errr);
                            })


                            return res.status(200).send({
                                message: 'Register Successfully',
                                token: token
                            })

                        })
                        .catch(err => {
                            return res.status(500).send({
                                message: err
                            });
                        });
                }



            })


    }
}