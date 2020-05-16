var mongoose = require('mongoose');

// var textSchema = new mongoose.Schema({
//   textName: String,
//   color: String,
//   fontSize: {type: Number, min: 2, max:144},
//   topPos:{type: Number, min: 2, max:144},
//   rightPos: {type: Number, min: 2, max:144}
// });

var LogoSchema = new mongoose.Schema({
  id: String,
  textList: Array,
  text: String,
  color: String,
  backgroundColor: String,
  fontSize: { type: Number, min: 2, max: 144 },
  borderColor: String,
  borderRadius: {type: Number, min: 2, max: 144},
  borderWidth: {type: Number, min: 2, max: 144},
  padding: {type: Number, min: 2, max: 144},
  margin: {type: Number, min: 2, max: 144},
  lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Logo', LogoSchema);