const express = require("express");
const dotenv = require("dotenv");
const app = express();
const routes = require("./routes/index");
const verify = require("./middlewares/verify");
//
dotenv.config();
const PORT = process.env.PORT;
//
app.use(express.json());
app.use(verify);
app.use("/expenses", routes.userRoutes);
app.use("/students", routes.studentsRoutes);
app.use("/", (req, res) => res.end("HELLO JING!"));

app.listen(PORT, () => {
  console.log(`server on PORT ${PORT}`);
});
