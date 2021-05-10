const sequelize = require("sequelize");
const router = require("express").Router();
const { UserModels } = require("./database");
const { users } = require("./setup.json");

const addData = async () => {
  await UserModels.create({
    username: "admin",
    password: "$2a$10$m1aQU66I/PsShAQtv5hVou0.xDQIreWdMFKxmG78kTi8tu8TcO4L6",
  });

  return "Success";
};

router.get("/initial", (req, res, next) => {
  UserModels.findOne({
    attributes: [[sequelize.fn("count", sequelize.col("id")), "count"]],
    raw: true,
  }).then((user) => {
    if (user.count === 0) {
      addData()
        .then((_) => {
          res.send(
            "<h1>Completed</h1><br/><strong>Username: </strong>admin<br/><strong>Password:</strong>admin123"
          );
        })
        .catch((err) => {
          console.log(err);
          res.send("<h1>500 Error Occurred</h1>");
        });
    } else {
      res.send(
        "<h1>Setup already completed</h1><br/><strong>Username: </strong>admin<br/><strong>Password:</strong>admin123"
      );
    }
  });
});

module.exports = router;
