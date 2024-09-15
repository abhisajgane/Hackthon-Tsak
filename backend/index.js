const express = require("express");
const cors = require("cors");
const connection = require("./db");
const userRouter = require("./routes/user.Routes");
const StateRouter = require("./routes/State.Routes");
const CityRouter = require("./routes/City.Routes");
const wearHouseRouter = require("./routes/wearHouse.Routes");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("working");
});

// user api
app.use("/", userRouter);

//state
app.use("/", StateRouter);

//city
app.use("/", CityRouter);

//wearhouse
app.use("/", wearHouseRouter);

app.listen(9090, async () => {
  try {
    await connection;
    console.log("connection established");
    console.log("server listening on 9090");
  } catch (error) {
    console.log(error);
  }
});
