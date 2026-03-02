const {
  getSorRecords,
  createObservation,
  deleteObservation,
} = require("../services/record.service");

async function getListRecords(req, res) {
  try {
    const employeeId = req.user.intId;
    const sorRecords = await getSorRecords(employeeId, req.query.status);
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

async function deleteRecord(req, res) {
  const { recordId } = req.params;
  console.log(recordId);
  try {
    const record = await deleteObservation(recordId);
    res.status(200).json({
      message: "Observation deleted",
      data: record,
    });
  } catch (error) {}
}

module.exports = { getListRecords, createRecord, deleteRecord };
