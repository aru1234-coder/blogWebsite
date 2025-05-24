const db = require("../db");

require("dotenv").config();

exports.addCategory = async (req, res) => {
  const { categoryName, slug } = req.body;

  try {
    // 1. Check if category already exists
    const [existing] = await db.execute(
      `SELECT id FROM categories WHERE name = ?`,
      [categoryName]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // 2. Insert into categories table
    const [result] = await db.execute(
      `INSERT INTO categories (name,slug) VALUES (?,?)`,
      [categoryName, slug]
    );

    res.status(201).json({
      message: "Category added successfully",
      categoryId: result.insertId,
    });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateCategory = async (req, res) => {
  const { categoryName, slug } = req.body;
  const { categoryId } = req.params;

  try {
    // 1. Check if the new category name already exists (excluding current category)
    const [existing] = await db.execute(
      `SELECT id FROM categories WHERE name = ? AND id != ?`,
      [categoryName, categoryId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: "Category name already exists" });
    }

    // 2. Update the category
    const [result] = await db.execute(
      `UPDATE categories SET name = ?,slug =? WHERE id = ?`,
      [categoryName, slug, categoryId]
    );

    // 3. Check if update affected any rows
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    if (!categoryId) {
      return res.status(400).json({ error: "Category ID is required" });
    }

    // Check if the category exists
    const [categoryRows] = await db.execute(
      "SELECT id FROM categories WHERE id = ?",
      [categoryId]
    );

    if (categoryRows.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Try to delete the category
    await db.execute("DELETE FROM categories WHERE id = ?", [categoryId]);

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);

    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT * 
       FROM categories`
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
