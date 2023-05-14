const http = require("http");
const PORT = 2000;
const arr = [
  {
    username: "user1",
    email: "user1@gmail.com",
  },
];
const server = http.createServer(async (req, res) => {
  //menentukan route api kita
  //   if (req.url === "/API" && req.method === "GET") {

  //   }
  //
  const method = req.method;
  const path = req.url.split("/")[1];

  if (method === "GET") {
    if (path === "api") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write("anjing");
      res.end();
    } else if (path === "users") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(arr));
      res.end();
    }
  } else if (method === "POST") {
    if (path === "users") {
      req.on("data", (data) => {
        console.log(JSON.parse(data));
        arr.push(JSON.parse(data));
      });
      console.log("abc");
      res.end("posted");
    }
  } else if (method === "PATCH") {
    if (path === "users") {
      req.on("data", (data) => {
        //cari username yang ada di setelah slash username
        const username = req.url.split("/")[2];
        //buat sebuah variable index dengan -1
        let index = -1;

        arr.find((val, idx) => {
          if (val.username == username) {
            return (index = idx);
          }
        });
        console.log(index);
        if (index == -1) {
          return res.end("username tidak ditemukan");
        }
        arr[index].email = JSON.parse(data).email;
        res.end("data berhasil diruabah");
      });
    }
  } else if (method === "DELETE") {
    if (path === "users") {
      //cari username yang ada di setelah slash username
      const username = req.url.split("/")[2];
      //buat sebuah variable index dengan -1
      let index = -1;

      arr.find((val, idx) => {
        if (val.username == username) {
          return (index = idx);
        }
      });
      console.log(index);
      if (index == -1) {
        return res.end("username tidak ditemukan");
      }
      arr.splice(index, 1);
      return res.end("terhapus");
    }
  }
});

server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
