const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const isAdmin = require("../../guards/isAdmin");
const isModerator = require("../../guards/isModerator");

// bring in user model
require("../../models/User");
const User = mongoose.model("users");

// GET | api/users/profile
// view current user profile
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user.id }, (err, user) => {
      if (err) {
        res.json({ success: false, message: "User not found" });
      } else {
        res.json({ success: true, user });
      }
    });
  }
);

// GET | api/users
// view users list
router.get(
  "/",
  [passport.authenticate("jwt", { session: false }), isAdmin],
  (req, res) => {
    User.find({ role: "subscriber" }, (err, users) => {
      if (err) {
        res.json({ success: false, message: "Users not found" });
      } else {
        res.json({ success: true, users });
      }
    });
  }
);

// GET | api/users/view/:id
// get user
router.get(
  "/show/:id",
  [passport.authenticate("jwt", { session: false }), isAdmin],
  (req, res) => {
    User.findOne({ _id: req.params.id }, (err, user) => {
      if (err) {
        res.json({ success: false, message: "User not found" });
      } else {
        res.json({ success: true, user });
      }
    });
  }
);

// PUT | api/users/update
// update user
router.put(
  "/update/:id",
  [passport.authenticate("jwt", { session: false }), isAdmin],
  (req, res) => {
    if (!req.body.name) {
      res.json({ success: false, msg: "name is required" });
    } else {
      User.findOne({ _id: req.body._id }, (err, user) => {
        user.name = req.body.name;
        user.save(err => {
          if (err) {
            res.json({ success: false, message: err });
          } else {
            res.json({ success: true, message: "user updated!" });
          }
        });
      });
    }
  }
);

// DELETE | api/users/delete/:id
// delete user
router.delete(
  "/delete/:id",
  [passport.authenticate("jwt", { session: false }), isAdmin],
  (req, res) => {
    User.findOne({ _id: req.params.id }, (err, user) => {
      user.remove(err => {
        if (err) {
          res.json({ success: false, message: err });
        } else {
          res.json({ success: true, message: "blog post deleted" });
        }
      });
    });
  }
);

module.exports = router;
