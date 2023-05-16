module.exports = (sequelize, Sequelize) => {
  const Lecturer = sequelize.define("Lecturers", {
    name: { type: Sequelize.STRING },
    address: { type: Sequelize.STRING },
  });
  return Lecturer;
};
