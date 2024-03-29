const mongoose = require("mongoose");

const userTripSchema = mongoose.Schema({
  departure: String,
  arrival: String,
  date: Date,
  hour: String,
  price: Number,
  paid: Boolean
});

const userTrip = mongoose.model("usertrips", userTripSchema);

module.exports = userTrip;
