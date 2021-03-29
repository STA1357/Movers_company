/** @format */

const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel.js");
const generateToken = require("../utils/generateToken.js");
const isAuth = require("../utils/isAuth.js");
const isAdmin = require("../utils/isAdmin.js");
const CryptoJS = require("crypto-js");
const utf8 = require("utf8");
var crypto = require("crypto");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(404)
        .send({ message: "User with this email not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(404).json({ message: "Wrong password" });
    }

    return res.status(200).send({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      phone_number: user.phone_number,
      email: user.email,
      token: generateToken(user),
      image: user.image,
      isAdmin: user.isAdmin,
      balance: user.balance,
      autoRiaId: user.autoRiaId,
      createdAt: user.createdAt,
    });
  } catch (e) {
    res.status(403).send({ message: "Invalid email or password" });
  }
});

userRouter.post("/register", async (req, res) => {
  try {
    const checkEmail = await User.findOne({ email: req.body.email });

    if (checkEmail) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      phone_number: req.body.phone_number,
      email: req.body.email,
      password: hashedPassword,
      image: req.body.image,
    });

    const createdUser = await user.save();

    res.status(201).send({
      _id: createdUser._id,
      first_name: createdUser.first_name,
      last_name: createdUser.last_name,
      username: createdUser.username,
      phone_number: createdUser.phone_number,
      email: createdUser.email,
      token: generateToken(createdUser),
      image: createdUser.image,
      isAdmin: createdUser.isAdmin,
      balance: createdUser.balance,
      autoRiaId: createdUser.autoRiaId,
      createdAt: createdUser.createdAt,
    });
  } catch (e) {
    res.status(500).send({ message: "Something went wrong" });
  }
});

userRouter.put("/update", isAuth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.phone_number = req.body.phone_number;
    user.email = req.body.email;
    const updatedUser = await user.save();
    const response = {
      _id: updatedUser._id,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      username: updatedUser.username,
      phone_number: updatedUser.phone_number,
      email: updatedUser.email,
      token: generateToken(updatedUser),
      image: updatedUser.image,
      isAdmin: updatedUser.isAdmin,
      balance: updatedUser.balance,
      autoRiaId: updatedUser.autoRiaId,
      createdAt: updatedUser.createdAt,
    };
    return res.status(201).json({
      message: "Профиль обновлён",
      response,
    });
  } catch (e) {
    res.status(500).send({ message: "Something went wrong" });
  }
});

userRouter.put("/updateBalance", isAuth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    user.balance = req.body.balance;
    const updatedUser = await user.save();
    const response = {
      _id: updatedUser._id,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      username: updatedUser.username,
      phone_number: updatedUser.phone_number,
      email: updatedUser.email,
      token: generateToken(updatedUser),
      image: updatedUser.image,
      isAdmin: updatedUser.isAdmin,
      balance: updatedUser.balance,
      createdAt: updatedUser.createdAt,
    };
    return res.status(201).json({
      message: "Баланс обновлён",
      response,
    });
  } catch (e) {
    res.status(500).send({ message: "Something went wrong" });
  }
});

userRouter.put("/updateAutoRiaId", isAuth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    user.autoRiaId = req.body.autoRiaId;
    const updatedUser = await user.save();
    const response = {
      _id: updatedUser._id,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      username: updatedUser.username,
      phone_number: updatedUser.phone_number,
      email: updatedUser.email,
      token: generateToken(updatedUser),
      image: updatedUser.image,
      isAdmin: updatedUser.isAdmin,
      balance: updatedUser.balance,
      autoRiaId: updatedUser.autoRiaId,
      createdAt: updatedUser.createdAt,
    };
    return res.status(201).json({ response });
  } catch (e) {
    res.status(500).send({ message: "Something went wrong" });
  }
});

userRouter.put("/updateImage", isAuth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    user.image = `http://localhost:5002/${req.body.image}`;
    const updatedUser = await user.save();

    const response = {
      _id: updatedUser._id,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      username: updatedUser.username,
      phone_number: updatedUser.phone_number,
      email: updatedUser.email,
      image: updatedUser.image,
      token: generateToken(updatedUser),
      isAdmin: updatedUser.isAdmin,
      balance: updatedUser.balance,
      autoRiaId: updatedUser.autoRiaId,
      createdAt: updatedUser.createdAt,
    };
    return res.status(201).json({
      message: "Фото обновленно",
      response,
    });
  } catch (e) {
    res.status(500).send({ message: "Something went wrong" });
  }
});

userRouter.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    const deletedUser = await user.remove();
    res.send({ message: "Пользователь удалён", user: deletedUser });
  } else {
    res.status(404).send({ message: "Пользователь не найден" });
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).send({ message: "Пользователь не найден" });
  }
});

userRouter.post("/payment", (req, res) => {
  try {
    const {
      merchantAccount,
      merchantDomainName,
      orderReference,
      orderDate,
      amount,
      currency,
      productName,
      productPrice,
      productCount,
      secretKey,
    } = req.body;
    // console.log(
    //   `${merchantAccount};${merchantDomainName};${orderReference};${orderDate};${amount};${currency};${productName};${productCount};${productPrice};`
    // );
    // const hash = CryptoJS.HmacMD5(
    //   `${merchantAccount};${merchantDomainName};${orderReference};${orderDate};${amount};${currency};${productName};${productCount};${productPrice};`,
    //   `${secretKey}`
    // );
    //creating hmac object
    var hmac = crypto.createHmac("md5", `${secretKey}`);
    //passing the data to be hashed
    data = hmac.update(
      `${merchantAccount};${merchantDomainName};${orderReference};${orderDate};${amount};${currency};${productName};${productCount};${productPrice};`
    );
    //Creating the hmac in the required format
    gen_hmac = data.digest("hex");
    // console.log(hash);
    // console.log(CryptoJS.enc);
    // const token = hash.toString(CryptoJS.enc.utf8);
    // const token = hash.toString();
    const token = utf8.encode(gen_hmac);
    res.send({ token });
  } catch (error) {
    res.send({ error });
  }
});

module.exports = userRouter;
