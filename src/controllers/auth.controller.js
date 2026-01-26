const { registerUser } = require("../services/auth.service");

const signup = async (req, res) => {
  try {
    const userData = await registerUser(req.body);
    res.status(201).json({
      message: "Registration successful",
      data: userData,
    });
  } catch (error) {
    if (error.message === "Missing fields") {
      res.status(400).json({ message: error.message });
    } else if (error.message === "Employee already exists") {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Registration failed" });
    }
  }
};

module.exports = { signup };
