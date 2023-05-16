module.exports = (sequelize, Sequelize) => {
  const Branch = sequelize.define("Branches", {
    branch: Sequelize.STRING,
    address: Sequelize.STRING,
  });
  return Branch;
};
