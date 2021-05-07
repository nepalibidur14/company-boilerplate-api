const connectingServer = (req, res, next) => {
  res.status(200).json({
    body: "Hello from the server",
  });
};

module.exports.connectingServer = connectingServer;
