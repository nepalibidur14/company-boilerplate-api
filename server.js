const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.port || 8000;
const baseUrl = "";

app.use((req, res, next) => {
  console.log(`Request_Endpoint: ${req.method} ${req.url}`);
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use((req, res, next) => {
  req.apiUrl = req.protocol + "://" + req.headers.host + baseUrl + "/";
  next();
});
app.use("/setup", require("./src/config/setup"));
app.use(passport.initialize());
app.use(passport.session());
require("../portfolio-api/src/users/auth");

app.use("/api/v1", require("./src/users"));
app.use("/api/v1", require("./src/products"));
app.use(baseUrl + "/temp", express.static("temp"));
app.use("/", express.static("public"));

// Catch any bad requests
app.get("*", (req, res) => {
  res.status(200).json({
    msg: "Catch All",
  });
});

// Configure our server to listen on the port defiend by our port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));
