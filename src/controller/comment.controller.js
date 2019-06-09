const Comment = require('../model/comment');

module.exports= {
    postComment: (req,res) => {
        let comments = {
            missingId: req.body.comments.missingId ,
            comment: req.body.comments.comment
            
}
        var comment = new Comment({comments});
        comment.save()
        .then((data) => {
            console.log(data);
            res.send("Success");
        })
        .catch(err => {
            res.status(500).send(err)
        })
    }
}