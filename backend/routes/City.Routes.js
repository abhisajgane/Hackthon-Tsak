const express = require("express");
const CityRouter = express.Router();
const CityModel = require("../models/cityModel");
const authentication = require("../middlewears/authentication");

CityRouter.post("/api/post/city", authentication, async (req, res) => {
  try {
    const city = new CityModel(req.body);
    await city.save();
    res.status(201).json({ msg: "city successfully added", staus: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", status: false });
  }
});

CityRouter.get("/api/get/city", async (req, res) => {
  const state = req.query.state;
  try {
    if (!state) {
      const city = await CityModel.find();
      return res.status(200).send(city);
    }

    const cities = await CityModel.find({ state: state });
    return res.status(200).send(cities);
  } catch (error) {
    console.error("Error retrieving cities:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: false });
  }
});

CityRouter.patch("/api/update/city/:id", authentication, async (req, res) => {
  const id = req.params.id;
  try {
    const state = await CityModel.findByIdAndUpdate({ _id: id }, req.body);
    return res
      .status(200)
      .json({ message: "City Updated successfully", status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", status: false });
  }
});

//delete state
CityRouter.delete("/api/delete/city/:id", authentication, async (req, res) => {
  const id = req.params.id;
  try {
    const City = await CityModel.findByIdAndDelete(id);

    if (!City) {
      return res.status(404).json({
        error: "City not found.",
      });
    }
    return res.status(200).json({ message: "City Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", status: false });
  }
});

module.exports = CityRouter;
