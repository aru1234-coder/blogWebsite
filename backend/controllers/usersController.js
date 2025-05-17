const db = require("../db");
const bcrypt = require("bcryptjs"); // Make sure to install it: npm install bcryptjs
require("dotenv").config();

exports.addUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // 1. Check if the email already exists
    const [existing] = await db.execute(
      `SELECT id FROM users WHERE email = ?`,
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

    // 3. Insert the user into the users table
    const [result] = await db.execute(
      `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
      [name, email, hashedPassword, role]
    );

    res.status(201).json({
      message: "User added successfully",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  const { email, password, role, name } = req.body;
  const { userId } = req.params;

  try {
    // 1. Check if the email already exists for another user
    const [existing] = await db.execute(
      `SELECT id FROM users WHERE email = ? AND id != ?`,
      [email, userId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // 2. Hash the password if provided
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // 3. Build dynamic SQL and values
    const fields = [];
    const values = [];

    if (name) {
      fields.push("name = ?");
      values.push(name);
    }

    if (email) {
      fields.push("email = ?");
      values.push(email);
    }

    if (hashedPassword) {
      fields.push("password = ?");
      values.push(hashedPassword);
    }

    if (role) {
      fields.push("role = ?");
      values.push(role);
    }

    values.push(userId); // for WHERE id = ?

    if (fields.length === 0) {
      return res
        .status(400)
        .json({ error: "No valid fields provided for update" });
    }

    const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;

    const [result] = await db.execute(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Check if the blog exists
    const [userRows] = await db.execute("SELECT id FROM users WHERE id = ?", [
      userId,
    ]);

    if (userRows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete the blog
    await db.execute("DELETE FROM users WHERE id = ?", [userId]);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT * 
       FROM users`
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
