const Records = require("../models/records.model");
const Category = require("../models/category.model");
const Employee = require("../models/employee.model");

async function getSorRecords(employeeId) {
  const records = await Records.findAll({
    where: { employeeid: employeeId },
    include: [
      {
        model: Category,
        attributes: ["categoryName", "categoryBackGround"],
      },
    ],
  });
  if (!records || records.length === 0) {
    throw new Error("No Records Found");
  }
  const result = records.map((list) => ({
    recordId: list.ID,
    title: list.title,
    location: list.location,
    date: new Date(list.date).getTime(),
    category: list.Category
      ? {
          categoryName: list.Category.categoryName,
          categoryBackground: list.Category.categoryBackGround,
        }
      : null,
    active: list.active,
  }));
  return result;
}

async function createObservation(employeeId, body) {
  const { title, categoryid, location, date } = body;
  if (!title || !categoryid || !date) {
    throw new Error("Missing Fields");
  }
  const [day, month, year] = date.split("/").map(Number);
  const jsDate = new Date(year, month - 1, day);
  const observationRecord = await Records.create({
    title,
    categoryid,
    location,
    date: jsDate,
    employeeid: employeeId,
    active: 1,
  });
  return observationRecord.ID;
}
module.exports = { getSorRecords, createObservation };
