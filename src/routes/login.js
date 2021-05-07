const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const controllers = require("../controllers/controller");

const users = [
  {
    name: "bidur",
  },
];

router.get("/users", (req, res) => {
  res.json(users);
});

router.post("/users", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = { name: req.body.name, password: hashPassword };
    users.push(user);
    res.status(201).send();
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/user/login", async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  if (user == null) {
    return res.status(400).send("cannot find the user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("success");
    } else {
      res.send("Not allowed");
    }
  } catch {
    res.status(500).send();
  }
});
module.exports = router;
