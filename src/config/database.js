const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

const UserModels = require("../users/models/users")(sequelize, Sequelize);

const ProductsModels = require("../products/models/products")(
  sequelize,
  Sequelize
);

sequelize.sync().then(() => {
  console.log(`Database & tables created!`);
});

module.exports = {
  UserModels,
  ProductsModels,
  sequelize,
  SequelizeInstance: sequelize,
};
