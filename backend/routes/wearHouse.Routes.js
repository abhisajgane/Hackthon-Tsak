const express = require("express");
const wearHouseModel = require("../models/wearhouseModel");
const authentication = require("../middlewears/authentication");
const wearHouseRouter = express();

wearHouseRouter.post(
  "/api/post/wearHouse",
  authentication,
  async (req, res) => {
    try {
      const wearHouse = new wearHouseModel(req.body);
      await wearHouse.save();
      res
        .status(201)
        .json({ msg: "wearHouse successfully added !", staus: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", status: false });
    }
  }
);

//get status
wearHouseRouter.get("/api/get/wearHouse", authentication, async (req, res) => {
  try {
    const wearHouse = await wearHouseModel.find();
    res.status(200).send(wearHouse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// update state
wearHouseRouter.patch(
  "/api/update/wearHouse/:id",
  authentication,
  async (req, res) => {
    const id = req.params.id;
    try {
      const state = await wearHouseModel.findByIdAndUpdate(
        { _id: id },
        req.body
      );
      return res
        .status(200)
        .json({ message: "wearHouse Updated successfully", status: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", status: false });
    }
  }
);

//delete state
wearHouseRouter.delete(
  "/api/delete/wearHouse/:id",
  authentication,
  async (req, res) => {
    const id = req.params.id;
    try {
      const state = await wearHouseModel.findByIdAndDelete(id);

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
  }
);

module.exports = wearHouseRouter;
