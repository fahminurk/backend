const express = require("express");
const route = express.Router();
const data = require("../data/db.json");
const fs = require("fs");

route.get("/", (req, res) => {
  const users = data.users.map((val) => {
    // delete val.password;
    return val;
  });
  res.send({
    data: users,
  });
});

//login
route.get("/v1", (req, res) => {
  const { username, email, password } = req.query;
  if ((username || email) && password) {
    let anjing;
    data.users.find((val) => {
      (val.username == username || val.email == email) &&
      val.password == password
        ? (anjing = { ...val })
        : null;
    });
    if (anjing) {
      delete anjing.password;
      return res.status(200).send({
        msg: "login succes",
        data: anjing,
      });
    } else {
      return res.send("login failed");
    }
  } else {
    return res.status(400).send("wajib  isi username/passwords");
  }
});

//register
route.post("/v2", (req, res) => {
  const { email, username, password } = req.body;
  if (email && username && password) {
    const newUser = {
      id: data.counter.users,
      email,
      username,
      password,
    };
    console.log(newUser);
    data.users.push(newUser);
    data.counter.users++;

    fs.writeFile(__dirname + "/../data/db.json", JSON.stringify(data), () => {
      console.log("data baru");
    });
    return res.status(201).send({
      msg: "akun berhasi dibuat",
    });
  }
  return res.status(400).send("gagal register data kurang lengkap");
});

module.exports = route;
