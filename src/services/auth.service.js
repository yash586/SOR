const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const Employee = require("../models/employee.model");

dotenv.config();

const registerUser = async ({ firstName, lastName, email, password }) => {
  if (!email || !password || !firstName || !lastName) {
    throw new Error("Missing fields");
  }
  const employeeExists = await Employee.findOne({ where: { email } });
  if (employeeExists) {
    throw new Error("Employee already exists");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const createEmployee = await Employee.create({
    firstName,
    lastName,
    email,
    password: hashPassword,
  });
  return {
    id: createEmployee.employeeid,
    email: createEmployee.email,
  };
};

const loginEmployee = async (email, password) => {
  const user = await Employee.findOne({ where: { email } });
  if (!user) {
    throw new Error(" Invalid User");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error(" Invalid credentials ");
  }
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET missing");
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN ?? "1d";

  const token = jwt.sign({ hashId: user.ID, intId: user.employeeid }, secret, {
    expiresIn,
  });
  return {
    token,
  };
};

module.exports = { registerUser, loginEmployee };
