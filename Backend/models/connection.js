const mongoose = require("mongoose");

const connectionString = 'mongodb+srv://davidmeunier:1odk6pShD4kvNubN@capsuledb.but3pie.mongodb.net/tickethack';

mongoose.set("strictQuery", true);

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch(error => console.error(error));


module.exports = connectionString; 