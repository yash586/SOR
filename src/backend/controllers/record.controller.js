const {
  getSorRecords,
  createObservation,
} = require("../services/record.service");

async function getListRecords(req, res) {
  try {
    const employeeId = req.user.intId;
    const sorRecords = await getSorRecords(employeeId);
    res.status(200).json({
      message: "Success",
      data: sorRecords,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createRecord(req, res) {
  try {
    const employeeId = req.user.intId;
    const record = await createObservation(employeeId, req.body);
    res.status(201).json({
      message: "New Observation is created",
      data: record,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getListRecords, createRecord };
