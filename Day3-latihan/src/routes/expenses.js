const express = require("express");
const route = express.Router();
const data = require("../data/db.json");
const fs = require("fs");
const moment = require("moment");
const file = __dirname + "/../data/db.json";

//get all expense
route.get("/", (req, res) => {
  res.send({
    msg: "all expenses",
    data: data.expenses,
  });
});
// route.get("/expenses", (req, res) => {
//   const expenses = data.expenses.map((val) => {
//     return val;
//   });
//   res.send({
//     msg: "PENGELUARAN MU",
//     data: expenses,
//   });
// });

//post
route.post("/", (req, res) => {
  const { date, name, category, nominal } = req.body;
  if (!date || !name || !category || !nominal)
    res.status(400).send("All data must be filled in");
  const newData = {
    id: data.counter.expenses,
    date,
    name,
    category,
    nominal,
  };
  data.counter.expenses++;
  data.expenses.push(newData);

  fs.writeFile(file, JSON.stringify(data), () =>
    console.log("new expense data added")
  );
  res.send({
    msg: "new espense data added",
    data: newData,
  });
});
// route.post("/expenses", (req, res) => {
//   const { name, nominal, category } = req.body;
//   const date = moment().format("MMMM Do YYYYY, hh:mm:ss a");
//   if (name && nominal && category) {
//     const newExpenses = {
//       id: data.counter.expenses,
//       name,
//       nominal,
//       category,
//       added: date,
//     };
//     console.log(newExpenses);
//     data.expenses.push(newExpenses);
//     data.counter.expenses++;

//     fs.writeFile(__dirname + "/../data/db.json", JSON.stringify(data), () => {
//       console.log("pengeluaran baru");
//     });
//     return res.send({
//       msg: "PENGELUARANMU BARU DITAMBAHKAN",
//       data: data.expenses,
//     });
//   }
//   return res.send("gagal");
// });

//delete
route.delete("/:id", (req, res) => {
  const expense = data.expenses.find((val, idx) => {
    if (val.id == req.params.id) {
      console.log(idx);
      return data.expenses.splice(idx, 1);
    }
  });
  if (!expense) return res.status(400).send("id tidak ditemukan");

  fs.writeFile(file, JSON.stringify(data), () =>
    console.log(`Expense id ${req.params.id} has been deleted`)
  );
  res.status(200).send({
    msg: `Expense id ${req.params.id} has been deleted`,
    data: expense,
  });
});
// route.delete("/expenses", (req, res) => {
//   const { name } = req.body;
//   let index = -1;
//   data.expenses.find((val, idx) => {
//     if (val.name == name) {
//       return (index = idx);
//     }
//   });
//   if (index == -1) {
//     return res.send("name tidak ditemukan");
//   }
//   data.expenses.splice(index, 1);
//   data.counter.expenses--;
//   fs.writeFile(__dirname + "/../data/db.json", JSON.stringify(data), () => {
//     console.log("data di hapus");
//   });
//   return res.send({
//     msg: "PENGELUARAN MU DIHAPUS",
//     data: data.expenses,
//   });
// });

//update expense
route.patch("/:id", (req, res) => {
  let index;
  let findExpense = data.expenses.find((val, idx) => {
    if (val.id == req.params.id) {
      index = idx;
      return val;
    }
  });
  console.log(findExpense);
  const { date, name, category, nominal } = req.body;

  if (!findExpense)
    return res.status(400).send(`Expense id ${req.params.id} not found`);
  else if (!date || !name || !category || !nominal)
    return res.status(400).send("All data must be filled in");
  findExpense = { ...findExpense, date, name, category, nominal };

  data.expenses[index] = { ...findExpense };

  fs.writeFile(file, JSON.stringify(data), () =>
    console.log(`Expense id ${req.params.id} has been updated`)
  );
  res.send({
    msg: `Expense id ${req.params.id} has been updated`,
    data: findExpense,
  });
});
// route.patch("/expenses", (req, res) => {
//   const { name } = req.query;
//   let babi;
//   data.expenses.find((val) =>
//     val.name == name ? (babi = { ...val, ...req.body }) : (babi = null)
//   );
//   if (babi) {
//     data.expenses[babi.id - 1] = babi;
//     fs.writeFile(__dirname + "/../data/db.json", JSON.stringify(data), () => {
//       console.log("data di ganti");
//     });
//     return res.send({
//       msg: "data diupdate",
//       data: babi,
//     });
//   } else {
//     return res.send("data tidak ada");
//   }
// });

//get by date range
route.get("/by-dates", (req, res) => {
  let { dateFrom, dateTo } = req.query;

  if (!dateFrom || !dateTo)
    return res.status(400).send("dateFrom or dateTo not found");

  const message =
    "search expenses from " +
    moment(dateFrom).format("LLL") +
    " to " +
    moment(dateTo).format("LLL");

  dateFrom = new Date(dateFrom);
  dateTo = new Date(dateTo);

  const expenses = data.expenses.filter((val) => {
    let date = new Date(val.date);
    if (date >= dateFrom && date <= dateTo) {
      return val;
    }
  });

  const total = expenses.reduce((sum, val) => sum + val.nominal, 0);

  res.send({
    message,
    data: expenses,
    Total_pengeluaran: total,
  });
});

//get by categories
route.get("/by-categories", (req, res) => {
  const { category } = req.query;
  if (!category) return res.status(400).send("category not found");

  const expenses = data.expenses.filter((val) => val.category == category);
  const total = expenses.reduce((sum, val) => sum + val.nominal, 0);

  res.send({
    msg: "total expense by category " + category,
    data: expenses,
    Total_pengeluaran: total,
  });
});

//get detail
route.get("/:id", (req, res) => {
  const expense = data.expenses.find((val) => val.id == req.params.id);
  if (!expense) res.status(400).send("ID not found");
  res.send({
    msg: "get expense detail",
    data: expense,
  });
});
// route.get("/expenses/details", (req, res) => {
//   const { id } = req.query;
//   let anjing;
//   data.expenses.find((val) => {
//     val.id == id ? (anjing = val) : null;
//   });
//   if (anjing?.id) {
//     return res.send(anjing);
//   }
//   return res.send("tidak ada");
// });
//
module.exports = route;
