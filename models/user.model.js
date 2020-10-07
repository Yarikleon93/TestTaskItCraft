module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      notEmpty: true,
    },
    login: {
      type: Sequelize.STRING,
      notEmpty: true,
    },
    password: {
      type: Sequelize.STRING,
      notEmpty: true,
    },
    salt: {
      type: Sequelize.STRING,
    },
  });
  return User;
};
