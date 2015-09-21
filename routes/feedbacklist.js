var express = require('express');
var router = express.Router();

/*
 * GET feedbacklist.
 */
router.get('/feedbacklist', function(req, res) {
    var db = req.db;
    var collection = db.get('feedbacklist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});


/*
 * POST to send feedback.
 */
router.post('/sendfeedback', function(req, res) {
    var db = req.db;
    var collection = db.get('feedbacklist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: 'Your feedback has been sent!' } : { msg: err }
        );
    });
});

/*
 * DELETE to deletefeedback.
 */
router.delete('/deletefeedback/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('feedbacklist');
    var feedbackToDelete = req.params.id;
    collection.remove({ '_id' : feedbackToDelete }, function(err) {
        res.send((err === null) ? { msg: 'Feedback deleted!' } : { msg:'error: ' + err });
    });
});

module.exports = router;
