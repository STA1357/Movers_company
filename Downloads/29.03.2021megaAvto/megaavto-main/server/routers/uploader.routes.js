/** @format */

const multer = require("multer");
const express = require("express");
const isAuth = require("../utils/isAuth");
const path = require("path");

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now() + path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter: fileFilter,
});

uploadRouter.post("/", isAuth, upload.single("image"), async (req, res) => {
  res.send(`${req.file.path}`);
});

module.exports = uploadRouter;
