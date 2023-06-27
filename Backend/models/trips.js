const mongosse = require("mongoose");

const tripSchema = mongoose.Schema({
  departure: String,
  arrival: String,
  date: Number,
  price: Number,
});

const Trip = mongoose.model("trips", tripSchema);

module.exports = Trip;
