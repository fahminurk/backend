const db = require("../models");

const branchController = {
  getAll: async (req, res) => {
    const branch = await db.Branch.findAll();
    console.log(branch);
    return res.send(branch);
  },
  getById: async (req, res) => {
    const branch = await db.Branch.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.send(branch);
  },
  countAll: async (req, res) => {
    const branch = await db.Branch.findAll({
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("id")), "count all"],
        "id",
      ],
      group: "id",
    });
    console.log(branch);
    return res.send(branch);
  },
  insertBranch: async (req, res) => {
    try {
      const { branch, address } = req.body;
      await db.Branch.create({
        branch,
        address,
      });
      return await db.Branch.findAll().then((result) => {
        res.send({
          msg: `new branch added`,
          data: result,
        });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        msg: err.message,
      });
    }
  },
  editBranch: async (req, res) => {
    try {
      const { branch, address } = req.body;
      await db.Branch.update(
        {
          branch,
          address,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      return await db.Branch.findOne({
        where: {
          id: req.params.id,
        },
      }).then((result) =>
        res.send({
          msg: `ID ${req.params.id} has been updated`,
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
  deleteBranch: async (req, res) => {
    try {
      await db.Branch.destroy({
        where: {
          id: req.params.id,
        },
      });
      return await db.Branch.findAll().then((result) =>
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

module.exports = branchController;
