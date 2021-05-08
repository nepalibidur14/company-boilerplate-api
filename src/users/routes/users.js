const router = require("express").Router();

const { UserModels } = require("../../config/database");

const bcrypt = require("bcrypt");
const passport = require("passport");

router.get("/users", (req, res) => {
  res.json();
});

router.post("/users", async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    UserModels.create({
      username: req.body.username,
      password: hashPassword,
    }).then((user) => {
      res.status(201).send("User created successfully");
    });
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.post("/user/login", async (req, res, next) => {
  await passport.authenticate(
    "admin-login",
    { session: true },
    (err, passportUser, info) => {
      if (err) {
        res.status(500).send("Error!");
        return;
      }
      if (passportUser) {
        const user = passportUser;
        return res.send({ success: true, user: user });
      } else {
        return res.send(info);
      }
    }
  )(req, res, next);
});
module.exports = router;
