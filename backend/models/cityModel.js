const mongoose = require("mongoose");
const CitySchema = mongoose.Schema({
  CityName: String,
  CityCode: String,
  // StateName: { type: mongoose.Schema.Types.ObjectId, ref: "state" },
  state:String,
  status: String,
},{
  timestamps: true
});

const CityModel = mongoose.model("city", CitySchema);

module.exports = CityModel;
