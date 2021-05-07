const router = require("express").Router();

const { UserModels } = require("../../config/database");

const bcrypt = require("bcrypt");

router.get("/users", (req, res) => {
  res.json();
});

router.post("/users", async (req, res) => {
  console.log("sdfnjfnjfjdfnd");

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
