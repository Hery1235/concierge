var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var parcelShema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  uniqueId: {
    type: String,
    require: true,
  },
  conciargeName: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  delivered: {
    type: Boolean,
    default: false,
  },
  collectedBy: {
    type: String,
    require: true,
    default: "",
  },
  collectedOn: {
    type: Date,

  },
});
module.exports = mongoose.model("parcel", parcelShema);
