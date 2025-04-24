const mongoose = require("mongoose");
const logger = require("../util/logger");
require("dotenv").config();

const { MONGODB_URI } = process.env;

const connectdb = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" db connected");
    logger.info("CONNECTED  TO  DATA BASE");
  } catch (error) {
    console.log(error);
    logger.error("error occured" + "  " + error);
  }
};
connectdb();
