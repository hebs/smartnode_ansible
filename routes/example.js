var express = require('express');
var router = express.Router();

/* GET example page. */
router.get('/', function (req, res, next) {
  res.render('example');
});

module.exports = router;