var express = require('express');
var router = express.Router();
const Trip = require('../models/trips')

router.post('/trip-search', (req, res) => {
  Trip.find({
    $and: [
      { departure: req.body.departure },
      { arrival: req.body.arrival }
    ]
  })
    //Trip.find({ departure: req.body.departure }, { arrival: req.body.arrival }, { date: req.body.date })
    .then(trips => {
      if (trips.length !== 0) {
        let givenDate = new Date();
        let newTab = [];
        for (let i = 0; i < trips.length; i++) {
          let tabDate = new Date(trips[i].date);
          if (tabDate >= givenDate) {
            newTab.push(trips[i]);
          }
        }
        res.json({
          result: true,
          trips: newTab
        })
      } else {
        res.json({
          result: false,
          error: 'Aucun trajet trouvé'
        })
      }
    })
});

module.exports = router;
