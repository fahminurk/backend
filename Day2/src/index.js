const express = require("express");
const dotenv = require("dotenv"); //init dotenv
const app = express(); //function express createSer
dotenv.config(); // untuk memanggil env
const PORT = process.env.PORT;
const routes = require("./routes/index");
const verify = require("./middlewares/verify");
const log = require("./middlewares/write-log");

//agar route dapat membaca req.body json
app.use(express.json());
app.use(log, verify);
app.use("/users", routes.userRoutes);
app.use("/", (req, res) => res.end("EXPRESS API"));

app.listen(PORT, () => {
  console.log(`server PORT ${PORT}`);
});
