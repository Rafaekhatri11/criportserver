const nodemail = require('nodemailer');
const Usercreate = require('../model/user')
const jwt = require('jsonwebtoken')
var transporter = nodemail.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "Rafaekhatri11@gmail.com",
        pass: "M@h169222"
    }
});



module.exports = {
    //Node Mailer send Email
    delete: (req,res) => {
        Usercreate.findByIdAndRemove({_id: req.params.uid}).then(() => {
            Usercreate.find().then(data => {
                res.send(data)
            })
        })
    },
    adminupdatepro :(req ,res) => {
        Usercreate.findByIdAndUpdate({ _id: req.params.uid }, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            imageURL: req.body.imageURL,
            gender: req.body.gender
        }).then(() => {
            Usercreate.find().then(data => {

                res.send(data)
            })
        }).catch(err => {
            res.send(err)
        })
    },
    suspend: (req,res) => {
        Usercreate.findByIdAndUpdate({_id: req.params.uid} ,{
            suspend: req.body.suspend
        }).then(() => {
                Usercreate.find().then(data => {
                    res.send({
                        users : data
                    })
                }).catch(err => {
                    console.log(err )
                })
        })
    },
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
      
       
        Usercreate.find({ "email": req.body.email })
            .then(user => {
               
                if (user.length < 1) {
                    res.send({
                        message: 'User deos not exist'
                    });
                }

                if (req.body.password === user[0].password) {
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


                            return res.send({
                                message: 'Register Successfully',
                                token: token
                            })

                        })
                        .catch(err => {
                            return res.send({
                                message: err
                            });
                        });
                }



            })


    }
}