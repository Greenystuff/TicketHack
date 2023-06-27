var express = require('express');
var router = express.Router();
const Trip = require('../models/trips')

router.post('/trip-search', (req, res) => {
  Trip.find({
    $and: [
      { departure: new RegExp(req.body.departure, 'i') },
      { arrival: new RegExp(req.body.arrival, 'i') }
    ]
  }).then(trips => {
    if (trips.length !== 0) {
      let givenDate = new Date();
      let newTab = [];
      for (let i = 0; i < trips.length; i++) {
        let tabDate = new Date(trips[i].date);
        tabDate = tabDate.toString().slice(0, 16)
        givenDate = givenDate.toString().slice(0, 16)
        if (tabDate === givenDate) {
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
