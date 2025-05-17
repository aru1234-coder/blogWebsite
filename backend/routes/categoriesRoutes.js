const express = require("express");
const {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategory,
} = require("../controllers/categoriesController");
const router = express.Router();

router.post("/addCategory", addCategory);
router.put("/:categoryId", updateCategory);
router.delete("/:categoryId", deleteCategory);
router.get("/getCategory", getCategory);

module.exports = router;
