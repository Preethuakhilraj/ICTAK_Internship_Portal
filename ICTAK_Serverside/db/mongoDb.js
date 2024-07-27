const mongoose = require('mongoose');
mongoose.set('debug', true);
require('dotenv').config();

const db=mongoose.connect(process.env.MONGODB_URL || "mongodb+srv://preethu:preethu@cluster0.spk2oik.mongodb.net/ICTDB?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
  console.log("DB is connected");
})
.catch((error) => {
  console.error('Error in connection', error);
});
mongoose.set('debug', true);
module.exports = db;