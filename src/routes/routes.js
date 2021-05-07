const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controller");

router.get("/connect-server", controllers.connectingServer);

module.exports = router;
