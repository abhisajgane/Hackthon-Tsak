const mongoose = require("mongoose");
const StateSchema = mongoose.Schema({
  StateName: String,
  StateCode: String,
  Status: String,
},{
  timestamps: true
});

const StateModel = mongoose.model("state", StateSchema);

module.exports = StateModel;
