const db = require("../db");

require("dotenv").config();

exports.addBlog = async (req, res) => {
  const { userId, categoryName, title, content, image, status, slug } =
    req.body;
  try {
    //  Get category_id from categoryName
    const [categoryRows] = await db.execute(
      "SELECT id FROM categories WHERE name = ?",
      [categoryName]
    );

    if (categoryRows.length === 0) {
      return res.status(400).json({ error: "Category not found" });
    }

    const category_id = categoryRows[0].id;
    // 3. Insert into blogs table
    await db.execute(
      `INSERT INTO blogs (user_id, category_id, title, content, image, status,slug) VALUES (?, ?, ?, ?, ?, ?,?)`,
      [userId, category_id, title, content, image, status, slug]
    );
    res.status(201).json({ message: "Blog added successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateBlog = async (req, res) => {
  const { userId, categoryName, title, content, image, status, slug } =
    req.body;
  const { blogId } = req.params;

  try {
    // Get category_id from categoryName
    const [categoryRows] = await db.execute(
      "SELECT id FROM categories WHERE name = ?",
      [categoryName]
    );

    if (categoryRows.length === 0) {
      return res.status(400).json({ error: "Category not found" });
    }

    const category_id = categoryRows[0].id;

    // 3. Update the blog by ID
    await db.execute(
      `UPDATE blogs 
       SET user_id = ?, category_id = ?, title = ?, content = ?, image = ?, status = ? ,slug = ?
       WHERE id = ?`,
      [userId, category_id, title, content, image, status, slug, blogId]
    );

    res.status(200).json({ message: "Blog updated successfully" });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
    if (!blogId) {
      return res.status(400).json({ error: "Blog ID is required" });
    }

    // Check if the blog exists
    const [blogRows] = await db.execute("SELECT id FROM blogs WHERE id = ?", [
      blogId,
    ]);

    if (blogRows.length === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Delete the blog
    await db.execute("DELETE FROM blogs WHERE id = ?", [blogId]);

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT blogs.*, users.name AS userName, categories.name AS categoryName 
       FROM blogs 
       JOIN users ON blogs.user_id = users.id 
       JOIN categories ON blogs.category_id = categories.id 
       ORDER BY blogs.created_at DESC`
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
