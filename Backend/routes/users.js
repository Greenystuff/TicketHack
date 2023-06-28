var express = require('express');
var router = express.Router();
const userTrip = require('../models/userTrips')

router.get('/trips', (req, res) => {
  userTrip.find({ paid: false }).then(trips => {
    res.json({
      result: true,
      trips
    })
  })
})

router.post('/add-trip', (req, res) => {
  if (req.body.departure && req.body.arrival && req.body.date && req.body.hour && req.body.price && req.body.paid != undefined) {
    const newTrip = new userTrip({
      departure: req.body.departure,
      arrival: req.body.arrival,
      date: req.body.date,
      hour: req.body.hour,
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

router.delete('/trips', (req, res) => {
  userTrip.deleteOne({ _id: req.body._id }).then(() => {
    res.json({
      result: true
    })
  })
})

router.patch('/trips', (req, res) => {
  userTrip.updateMany({}, { paid: true }).then((data) => {
    res.json({
      result: true,
      response: data
    })
  })
})

module.exports = router;
