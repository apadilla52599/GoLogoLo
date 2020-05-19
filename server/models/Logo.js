var mongoose = require('mongoose');


var LogoSchema = new mongoose.Schema({
  id: String,
  textList: Array,
  text: String,
  color: String,
  imgList: Array,
  backgroundColor: String,
  fontSize: { type: Number, min: 2, max: 144 },
  height: {type: Number, min: 2, max: 1000},
  width: {type: Number, min: 2, max: 1000},
  borderColor: String,
  borderRadius: {type: Number, min: 2, max: 144},
  borderWidth: {type: Number, min: 2, max: 144},
  padding: {type: Number, min: 2, max: 144},
  margin: {type: Number, min: 2, max: 144},
  lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Logo', LogoSchema);