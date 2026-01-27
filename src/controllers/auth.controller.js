const { registerUser, loginEmployee } = require("../services/auth.service");

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

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing Field" });
  }
  try {
    const employeeData = await loginEmployee(email, password);
    res.status(200).json({
      message: "Login Successful",
      data: employeeData,
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = { signup, login };
