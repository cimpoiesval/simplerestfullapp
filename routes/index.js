var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Rest Application' });
});

/* GET New Feedback page. */
router.get('/newfeedback', function(req, res) {
    res.render('newfeedback', { title: 'Send Feedback' });
});

/* GET Feedback List page. */
router.get('/feedbacklist', function(req, res) {
    res.render('feedbacklist', { title: 'Feedback List' });
});

/* GET Confirmation page. */
router.get('/feedbackconfirmation', function(req, res) {
    res.render('feedbackconfirmation', { title: 'Feedback Confirmation' });
});

module.exports = router;
