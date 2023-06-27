var express = require('express');
var router = express.Router();
const userTrip = require('../models/userTrips')

router.post('/add-trip', (req, res) => {
  if (req.body.departure && req.body.arrival && req.body.date && req.body.price && req.body.paid) {
    const newTrip = new userTrip({
      departure: req.body.departure,
      arrival: req.body.arrival,
      date: req.body.date,
      price: req.body.price,
      paid: req.body.paid
    })
    newTrip.save().then(() => {
      res.json({ result: true })
    });
  } else {
    res.json({
      result: false,
      error: 'Champ recquis manquant'
    })
  }
});

module.exports = router;
