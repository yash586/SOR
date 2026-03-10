const {
  getSorRecords,
  createObservation,
  deleteObservation,
  updateObservation,
} = require("../services/record.service");
const { generatePreSignedUrl } = require("../services/s3.service");

async function fileUpload(req, res) {
  try {
    const { fileName, fileType } = req.query;
    if (!fileName || !fileType) {
      return res.status(400).json({
        message: "Filename and filetype are required",
      });
    }

    const { presignedUrl, fileUrl } = await generatePreSignedUrl(
      fileName,
      fileType,
    );
    return res.json({
      message: "Presigned Url generated",
      data: { presignedUrl, fileUrl },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

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
  try {
    const record = await deleteObservation(recordId);
    res.status(200).json({
      message: "Observation deleted",
      data: record,
    });
  } catch (error) {}
}

async function updateRecord(req, res) {
  try {
    const { recordId } = req.params;
    const record = await updateObservation(recordId, req.body);
    res.status(201).json({
      message: "Observation Updated Successfully",
      data: record,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports = {
  getListRecords,
  createRecord,
  deleteRecord,
  updateRecord,
  fileUpload,
};
