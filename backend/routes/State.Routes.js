const express = require("express");
const StateModel = require("../models/stateModel");
const authentication = require("../middlewears/authentication");

const StateRouter = express.Router();

StateRouter.post("/api/add/state",authentication, async (req, res) => {
  try {
    const State = new StateModel(req.body);
    await State.save();
    res.status(201).json({ msg: "state successfully added", staus: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//get status
StateRouter.get("/api/get/state",authentication, async (req, res) => {
  try {
    const states = await StateModel.find();
    res.status(200).send(states);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// update state
StateRouter.patch("/api/update/state/:id",authentication, async (req, res) => {
  const id = req.params.id;
  try {
    const state = await StateModel.findByIdAndUpdate({ _id: id }, req.body);
    return res
      .status(200)
      .json({ message: "State Updated successfully", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", status: false });
  }
});

//delete state
StateRouter.delete("/api/delete/:id",authentication, async (req, res) => {
  const id = req.params.id;
  try {
    const state = await StateModel.findByIdAndDelete(id);

    if (!state) {
      return res.status(404).json({
        error: "state not found.",
      });
    }

    return res.status(200).json({ message: "State Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", status: false });
  }
});

module.exports = StateRouter;
