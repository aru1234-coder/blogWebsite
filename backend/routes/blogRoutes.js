const express = require("express");
const {
  addBlog,
  updateBlog,
  deleteBlog,
  getBlog,
} = require("../controllers/blogsController");
const router = express.Router();

router.post("/addBlog", addBlog);
router.put("/:blogId", updateBlog);
router.delete("/:blogId", deleteBlog);
router.get("/getBlog", getBlog);

module.exports = router;
