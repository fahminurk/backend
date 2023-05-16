const express = require("express");
const router = express.Router();

const branchController = require("../controller").branchController;

//get
router.get("/", branchController.getAll);
router.get("/total", branchController.countAll);
router.get("/:id", branchController.getById);

//insert
router.post("/", branchController.insertBranch);

//update
router.patch("/:id", branchController.editBranch);

//delete
router.delete("/:id", branchController.deleteBranch);

module.exports = router;
