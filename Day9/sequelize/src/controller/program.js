const db = require("../models");

const programController = {
  getAll: async (req, res) => {
    try {
      const program = await db.Program.findAll({
        include: [
          { model: db.Branch, as: "Branch" },
          { model: db.Lecturer, as: "Lecturer" },
        ],
      });
      console.log(program);
      return res.send(program);
    } catch (err) {
      res.status(500).send({
        msg: err.message,
      });
    }
  },
  insertProgramV1: async (req, res) => {
    try {
      const { branch, b_address, name, l_address, program } = req.body;
      const result = await db.sequelize.transaction(async () => {
        //input branch
        const newBranch = await db.Branch.create({
          branch,
          address: b_address,
        });
        console.log(newBranch.dataValues);

        // input lecturer
        const newLecturer = await db.Lecturer.create({
          name,
          address: l_address,
        });
        console.log(newLecturer.dataValues);

        // input Program
        const newProgram = await db.Program.create({
          program,
          lecturer_id: newLecturer.dataValues.id,
          branch_id: newBranch.dataValues.id,
        });
        console.log(newProgram.dataValues);
      });
      res.send(result);
    } catch (err) {
      res.status(500).send({
        msg: err.message,
      });
    }
  },
  deleteProgram: async (req, res) => {
    try {
      await db.Program.destroy({
        where: {
          id: req.params.id,
        },
      });
      return await db.Program.findAll().then((result) =>
        res.send({
          msg: `ID ${req.params.id} has been removed`,
          data: result,
        })
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: err.message,
      });
    }
  },
};

module.exports = programController;
