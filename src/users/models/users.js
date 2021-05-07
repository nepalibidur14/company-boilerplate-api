module.exports = (sequelize, type) => {
  return sequelize.define("user", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isDeleted: {
      type: type.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
      type: type.BOOLEAN,
      defaultValue: true,
    },
    username: {
      type: type.STRING,
    },
    password: {
      type: type.STRING,
    },
  });
};
