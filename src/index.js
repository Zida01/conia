const express = require("express");
const app = express();
const validate = require("./util/validate");
const dotenv = require("dotenv");
dotenv.config();
const UserRoute = require("./routes/UserRoute");
const connectdb = require("./config/db");
const { createUserSchema } = require("./middleware/uservalidate");
const logger = require("./util/logger");
const errorHandler = require("./errors/errormiddleware");

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (req, res) => {});

app.post("/", validate(createUserSchema), (req, res) => {
  console.log(req.body);
});

app.use("v1/api/user", UserRoute);

app.use(errorHandler);

app.listen(PORT, (req, res) => {
  console.log("App  is Working");
  logger.info("Application Started");
});
