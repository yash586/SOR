const Records = require("../models/records.model");
const Category = require("../models/category.model");
const Employee = require("../models/employee.model");
const { getCategory } = require("../services/category.service");
const { where } = require("sequelize");

async function getSorRecords(employeeId, status) {
  const records = await Records.findAll({
    where: { employeeid: employeeId, active: status === "true" ? 1 : 0 },
    include: [
      {
        model: Category,
        attributes: ["categoryName", "categoryBackGround", "ID"],
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
          categoryid: list.Category.ID,
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
  const category = await getCategory(categoryid);
  console.log(category);
  const observationRecord = await Records.create({
    title,
    categoryid: category,
    location,
    date: jsDate,
    employeeid: employeeId,
    active: 1,
  });
  return observationRecord.ID;
}

async function deleteObservation(id) {
  const observation = await Records.update(
    { active: 0 },
    { where: { ID: id, active: 1 } },
  );
  if (!observation || observation.length === 0) {
    throw new Error("No Records Found");
  }
  return observation;
}

async function updateObservation(hashId, body) {
  try {
    const { title, categoryid, location, date } = body;
    const [day, month, year] = date.split("/").map(Number);
    const jsDate = new Date(year, month - 1, day);
    const category = await getCategory(categoryid);

    const observation = await Records.findOne({
      where: { ID: hashId, active: 1 },
    });

    if (!observation) {
      throw new Error("Observation not found");
    }

    const observationRecord = await Records.update(
      {
        title,
        categoryid: category,
        location,
        date: jsDate,
      },
      { where: { ID: hashId, active: 1 } },
    );

    return observationRecord;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getSorRecords,
  createObservation,
  deleteObservation,
  updateObservation,
};
