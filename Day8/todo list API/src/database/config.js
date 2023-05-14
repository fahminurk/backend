const mysql = require("mysql2");
const { db_host, db_user, db_password, db_database, db_port } = process.env;

const db = mysql.createConnection({
  host: db_host,
  user: db_user,
  password: db_password,
  database: db_database,
  port: db_port,
});

module.exports = db;
