const db = require("../db");

require("dotenv").config();

exports.addCategory = async (req, res) => {
  const { categoryName } = req.body;
  try {
    // 2. Get category_id from categoryName
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
      `INSERT INTO blogs (user_id, category_id, title, content, image, status) VALUES (?, ?, ?, ?, ?, ?)`,
      [user_id, category_id, title, content, image, status]
    );

    res.status(201).json({ message: "Blog added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateCategory = async (req, res) => {
  const { userName, categoryName, title, content, image, status } = req.body;
  const { blogId } = req.params;

  try {
    // 1. Get user_id from userName
    const [userRows] = await db.execute("SELECT id FROM users WHERE name = ?", [
      userName,
    ]);

    if (userRows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user_id = userRows[0].id;

    // 2. Get category_id from categoryName
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
       SET user_id = ?, category_id = ?, title = ?, content = ?, image = ?, status = ? 
       WHERE id = ?`,
      [user_id, category_id, title, content, image, status, blogId]
    );

    res.status(200).json({ message: "Blog updated successfully" });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteCategory = async (req, res) => {
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

exports.getCategory = async (req, res) => {
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
