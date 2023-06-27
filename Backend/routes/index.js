var express = require('express');
var router = express.Router();
const Trip = require('../models/trips')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/trip-search', function (req, res) {
  Trip.find({ departure: req.body.departure })
    .then(departure => {
      if (departure) {
        Trip.find({ arrival: req.body.arrival }).then(arrival => {
          if (arrival) {
            Trip.find({ date: req.body.date }).then(date => {
              if (date) {
                // écrire la réponse 200 OK
              } else {
                res.json({
                  result: false,
                  error: 'La date entrée n\'est pas correcte'
                })
              }
            })
          } else {
            res.json({
              result: false,
              error: 'Cette ville de d\'arrivée n\'existe pas'
            })
          }
        })
      } else {
        res.json({
          result: false,
          error: 'Cette ville de départ n\'existe pas'
        })
      }
    })
});

module.exports = router;
