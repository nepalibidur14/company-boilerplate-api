module.exports = (sequelize, type) => {
  return sequelize.define("products", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isDeleted: {
      type: type.BOOLEAN,
      defaultValue: false,
    },
    productName: {
      type: type.STRING,
    },
    description: {
      type: type.STRING,
    },
    price: {
      type: type.STRING,
    },
  });
};
