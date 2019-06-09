const User = require("../model/user")


module.exports = {
    verification : (req,res) => {
            console.log(req.params.uid , req.params.id);
            User.findByIdAndUpdate(req.params.uid).then(data => {
                console.log("line number 8",data);
                if(data._id = req.params.uid){
                   User.findOneAndUpdate(req.params.uid, {"verified" : true}).then(data => {
                       data ? alert("Congratulations You have verified yourself") : alert("Some thing wrong happens")
                       window.close()

                       console.log("success")
                   }).catch(err => {
                       console.log(err);
                   })
                }
            }).catch(err => {
                console.log(err)
            
            })
    }
}


