const mongoose = require("mongoose");

const wearHouseSchema = mongoose.Schema({
  name: String,
  // state: { type: mongoose.Schema.Types.ObjectId, ref: "state" },
  // city: { type: mongoose.Schema.Types.ObjectId, ref: "city" },
  state: String,
  city: String,
  status: String,
},{
  timestamps: true
});

const wearHouseModel = mongoose.model("wearHouse", wearHouseSchema);

module.exports = wearHouseModel;
