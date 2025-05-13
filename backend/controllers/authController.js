const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Import bcryptjs for hashing and comparing passwords

require("dotenv").config();

exports.authLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const query = `select * from users where email = ?`;
    const [result] = await db.query(query, [email]);

    if (result.length == 0) {
      return res.status(401).json("Invalid email and password");
    }
    const user = result[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json("Invalid email and password");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents access to the cookie from JavaScript
      secure: process.env.NODE_ENV === "production", // Ensures cookie is sent over HTTPS in production
      maxAge: 3600000, // 1 hour
      sameSite: "Strict", // Helps prevent CSRF attacks
    });

    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

exports.authRegister = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const [existingUser] = await db.query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

    const query = `insert into users (name,email,password,role) values(?,?,?,?)`;
    const [result] = await db.query(query, [name, email, hashedPassword, role]);
    res.status(200).json({
      message: "Register successful",
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};
