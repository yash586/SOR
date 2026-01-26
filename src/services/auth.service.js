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

module.exports = { registerUser };
