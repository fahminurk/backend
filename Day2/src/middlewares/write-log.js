const fs = require("fs");
const moment = require("moment");

const log = (req, res, next) => {
  const date = moment().format("MMMM Do YYYY, h:mm:ss a");
  console.log(date);
  fs.appendFileSync(__dirname + "/../log/log.txt", date + "\n");
  next();
};

module.exports = log;
