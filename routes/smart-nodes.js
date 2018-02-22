var express = require('express');
var router = express.Router();

/* Show new smart node page. */
router.get('/new', function(req, res, next) {
  res.render('new-smart-node');
});

module.exports = router;
