const express = require("express");
const router = express.Router();

const programController = require("../controller").programController;

//get
router.get("/", programController.getAll);
// router.get("/total", branchController.countAll);
// router.get("/:id", branchController.getById);

// //insert
router.post("/", programController.insertProgramV1, programController.getAll);

// //update
// router.patch("/:id", branchController.editBranch);

// //delete
router.delete("/:id", programController.deleteProgram);

module.exports = router;
