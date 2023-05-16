module.exports = (sequelize, Sequelize) => {
  const Program = sequelize.define("Programs", {
    program: Sequelize.STRING,
  });
  return Program;
};
