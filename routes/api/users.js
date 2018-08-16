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
    User.findOne({ _id: req.user.id })
      .then(user => {
        if (user) {
          res.json({ success: true, user });
        } else {
          res.json({ success: false, message: "User not found" });
        }
      })
      .catch(ex => {
        return res.status(500).send("Something went wrong");
      });
  }
);

// GET | api/users
// view users list
router.get(
  "/",
  [passport.authenticate("jwt", { session: false }), isAdmin],
  (req, res) => {
    User.find({ role: "subscriber" })
      .then(users => {
        if (users) {
          res.json({ success: true, users });
        } else {
          res.json({ success: false, message: "Users not found" });
        }
      })
      .catch(ex => {
        return res.status(500).send("Something went wrong");
      });
  }
);

// GET | api/users/view/:id
// get user
router.get(
  "/show/:id",
  [passport.authenticate("jwt", { session: false }), isAdmin],
  (req, res) => {
    User.findOne({ _id: req.params.id })
      .then(user => {
        if (user) {
          res.json({ success: true, user });
        } else {
          res.json({ success: false, message: "User not found" });
        }
      })
      .catch(ex => {
        return res.status(500).send("Something went wrong");
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
      User.findOne({ _id: req.params.id })
        .then(user => {
          if (user) {
            user.name = req.body.name;
            user
              .save()
              .then(userUpdated => {
                if (userUpdated) {
                  res.json({ success: true, message: "User updated!" });
                } else {
                  res.json({
                    success: false,
                    message: "User was not updated. Please try again"
                  });
                }
              })
              .catch(ex => {
                return res.status(500).send("Something went wrong");
              });
          } else {
            res.json({ success: false, message: "User not found" });
          }
        })
        .catch(ex => {
          return res.status(500).send("Something went wrong");
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
    User.findOne({ _id: req.params.id })
      .then(user => {
        if (user) {
          user
            .remove()
            .then(userDeleted => {
              if (userDeleted) {
                res.json({ success: true, message: "User deleted" });
              } else {
                res.json({ success: false, message: "User was not deleted" });
              }
            })
            .catch(ex => {
              return res.status(500).send("Something went wrong");
            });
        } else {
          res.json({ success: false, message: "User not found" });
        }
      })
      .catch(ex => {
        return res.status(500).send("Something went wrong");
      });
  }
);

module.exports = router;
