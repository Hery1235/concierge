var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var buildingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("building", buildingSchema);
