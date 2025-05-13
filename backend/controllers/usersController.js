const db = require("../db");

//crud operation

exports.getUsers = async (req, res) => {
  try {
    const query = `select * from users`;
    const [result] = await db.query(query);
    console.log("result", result);
    res.status(200).json("Fetching All Users from the users table");
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};
