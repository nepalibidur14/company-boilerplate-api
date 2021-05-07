const router = require("express").Router();
const { ProductsModels } = require("../../config/database");

router.post("/products", (req, res, next) => {
  const products = req.body;
  try {
    ProductsModels.create(products).then((product) => {
      res
        .status(201)
        .send({ success: true, message: "Product added successfully!!" });
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/products", (req, res, next) => {
  try {
    ProductsModels.findAll({ where: { isDeleted: false } }).then((product) => {
      res.send({ success: true, data: product });
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/products/:id", (req, res, next) => {
  try {
    ProductsModels.findOne({ where: { id: req.params.id } }).then((product) => {
      if (product) {
        res.send({ success: true, data: product });
      } else {
        res.send("Nothing to show");
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
