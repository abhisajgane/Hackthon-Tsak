const express = require("express");
const userModel = require("../models/userModel");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authentication = require("../middlewears/authentication");
const { authrised } = require("../middlewears/authrise");
require("dotenv").config();

userRouter.post("/api/users/add", async (req, res) => {
  let { name, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "email already exists", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    // Save the user to the database
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      status: true,
      user: {
        username: newUser.name,
        mobileno: newUser.mobile,
        emial: newUser.email,
        _id: newUser._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

userRouter.post("/api/user/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ msg: "User not found", status: false });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res
        .status(401)
        .json({ msg: "invalid credentials", status: false });
    }
    const newAccessToken = jwt.sign({ user: user }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      accessToken: newAccessToken,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const nodemailer = require("nodemailer");

// Create a transporter object using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bhandarisaurabh143@gmail.com",
    pass: "qucn cjnh rfjo uhss",
  },
});
userRouter.post("/api/forget/password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ msg: "Email not found", status: false });
    }

    // Generate password reset link (this is an example, you should create a secure token for resetting password)
    const resetLink = `http://localhost:3000/`;

    let mailOptions = {
      from: `"Digitalflake" <your.email@example.com>`,
      to: email,
      subject: "Reset Your Password",
      html: `Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 1 hour.`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error occurred:", error);
        return res
          .status(500)
          .json({ msg: "Failed to send email", status: false });
      } else {
        console.log("Email sent:", info.response);
        return res
          .status(200)
          .json({
            msg: "Password reset link sent to your email",
            status: true,
          });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// userRouter.get(
//   "/api/get/users",
//   authentication,
//   // authrised(["user"]),
//   async (req, res) => {
//     try {
//       const users = await userModel.find();
//       return res.status(200).send(users);
//     } catch (error) {
//       console.log(object);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   }
// );

module.exports = userRouter;
