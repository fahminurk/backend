const express = require("express");
const app = express();
const PORT = 2000;
app.use(express.json());
const users = [
  {
    username: "user1",
    email: "user1@gmail.com",
  },
  {
    username: "user2",
    email: "user2@gmail.com",
  },
];
//
app.get("/", (req, res) => {
  res.send("REST API menggunakan express");
});

//get user tanpa params
app.get("/users", (req, res) => {
  console.log(req.query);
  const { email, username } = req.query;
  if (email && username) {
    const data = users.find(
      (val) => val.username == username && val.email == email
    );
    return res.send(data);
  }
  res.send(users);
});

//get user menggunakan req.params
app.get("/users/:username", (req, res) => {
  console.log(req.params);

  const data = users.find((val) => val.username == req.params.username);
  res.send(data);
});

//post new user
app.post("/users", (req, res) => {
  console.log(req.body);
  const data = req.body;
  users.push(data);
  res.send({
    msg: "data telah di update",
    data: users,
  });
});

//delete user
app.delete("/users/:username", (req, res) => {
  let index = -1;

  users.find((val, idx) => {
    if (val.username == req.params.username) {
      return (index = idx);
    }
  });
  console.log(index);
  if (index == -1) {
    return res.end("username tidak ditemukan");
  }
  users.splice(index, 1);
  return res.end({
    msg: "data berhasil dihapus",
    data: users,
  });
});

//edit user
app.patch("/users/:username", (req, res) => {
  const { username } = req.params;
  const data = req.body;
  console.log(data);

  let index = -1;
  username.find((val, idx) => {
    if ((val.username = username)) {
      index = idx;
    }
  });

  users[index].email = data.email;
  res.send({
    msg: "data berhasil diedit",
    data: users[index],
  });
});

//routes

//route ini akan match dengan acd dan abcd
//"b?" artinya boleh ada b atau tidak
app.get("/ab?cd", (req, res) => res.send("ab?cd"));

//emethod vget memiliki paramater/arg (path, rest parameter)
//app.get(PATH,(res,rq,next))
app.get(
  "/example/b",
  (req, res, next) => {
    console.log("resnya ada di function berikutnya");
    next();
  },
  (res, req) => {
    res.send("helloo");
  }
);

app.listen(PORT, () => {
  console.log(`server berjalan di ${PORT}`);
});
