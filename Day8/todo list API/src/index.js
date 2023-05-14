const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
dotenv.config();
const PORT = process.env.PORT;
const db = require("./database/config");

app.use(cors());

db.connect((err) => {
  if (err) console.log(err);
  else console.log("mysql connected");
});

let queryString = "";

app.get("/todos", (req, res) => {
  queryString = `select id,judul,date,description 'desc' from todos`;
  db.query(queryString, (err, resault) => {
    if (err)
      return err.status(500).send({
        msg: err.message,
      });
    res.send(resault);
  });
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  queryString = `delete from todos where id = ${id}`;
  db.query(queryString, (err, resault) => {
    if (err)
      return err.status(500).send({
        msg: err.message,
      });
    res.send(resault);
  });
});

app.get("/", (req, res) => res.send("ini adalah rest api todo list"));

app.listen(PORT, () => {
  console.log("server is running on PORT " + PORT);
});
