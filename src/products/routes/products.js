const router = require("express").Router();
const { ProductsModels } = require("../../config/database");
const { upload } = require("../../config/multer");
const multer = require("multer");
const sequelize = require("sequelize");

router.post("/products", (req, res, next) => {
  const products = req.body;
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    const productInfo = { ...req.body, file: req.file.path };
    try {
      ProductsModels.create(productInfo).then((product) => {
        res
          .status(201)
          .send({ success: true, message: "Product added successfully!!" });
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });
});

router.get("/products", (req, res, next) => {
  const apiUrl = req.apiUrl;
  try {
    ProductsModels.findAll({
      where: { isDeleted: false },
      attributes: [
        "id",
        "productName",
        "price",
        "description",
        [sequelize.fn("concat", apiUrl, sequelize.col("file")), "file"],
      ],
    }).then((product) => {
      res.send({ data: product });
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/products/:id", (req, res, next) => {
  try {
    ProductsModels.findOne({
      where: { id: req.params.id },
      attributes: [
        "id",
        "productName",
        "price",
        "description",
        [sequelize.fn("concat", apiUrl, sequelize.col("file")), "file"],
      ],
    }).then((product) => {
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
