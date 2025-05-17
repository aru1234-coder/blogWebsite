const express = require("express");
const {
  addUser,
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/usersController");
const router = express.Router();

router.post("/addUser", addUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);
router.get("/getUser", getUser);

module.exports = router;
