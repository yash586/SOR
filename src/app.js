const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const sorRoutes = require("./routes/records.routes");
const categoryRoutes = require("./routes/category.routes");

const app = express();
app.use(cors());

app.use(express.json());

app.use("/sor", authRoutes);

app.use("/sor", sorRoutes);

app.use("/sor/category", categoryRoutes);

module.exports = app;
