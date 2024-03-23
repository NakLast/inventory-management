const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const service = require("./utils/service");
const bcrypt = require("bcryptjs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));

function formatTimeTo24Hours(timeString) {
  const date = new Date(timeString);

  if (isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
}

app.get("/", (req, res) => {
  res.status(200).render("login");
});

app.get("/user", async (req, res) => {
  const users = await service.getUser();

  res.render("user", { users: users });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = await service.getUser();
  const existingUser = users.find((user) => user.username === username);

  if (!existingUser) {
    res.status(400).send("no user in database");
  }

  if (!(await bcrypt.compare(password, existingUser.password))) {
    res.status(400).send("incorrect password");
  }

  const inventory = await service.getInventory();

  res.render("dashboard", {
    loggedinName: existingUser.username,
    productData: inventory,
    users: users,
  });
});

app.get("/dashboard", async (req, res) => {
  const users = await service.getUser();
  const inventory = await service.getInventory();

  let totalInventory = 0;
  let totalSellPrice = 0;
  let totalEvaluate = 0;
  let totalDifference = 0;

  inventory.forEach((item) => {
    totalInventory += item.quantity * item.cost;
    totalSellPrice += item.quantity * item.amount;
    totalEvaluate += (item.quantity * item.amount) - (item.quantity * item.cost);

    if (!isNaN(item.amount - item.cost) && item.quantity * item.amount !== 0) {
        totalDifference += (item.amount - item.cost) / (item.quantity * item.amount) * 100;
    } else {
        totalDifference += 0;
    }
  });
  totalDifference = totalDifference.toFixed(2);

  res.status(200).render("dashboard", { productData: inventory, users: users, totalInventory: totalInventory, totalSellPrice: totalSellPrice, totalEvaluate: totalEvaluate, totalDifference: totalDifference });
});

app.get("/inventory", async (req, res) => {
  const users = await service.getUser();
  const inventory = await service.getInventory();

  res.status(200).render("inventory", { productData: inventory, users: users });
});

app.get("/addProduct-form", (req, res) => {
  res.status(200).render("addProduct");
});

app.post("/addProduct", async (req, res) => {
  const { id, product_id, product, quantity, amount } = req.body;
  const productData = { id, product_id, product, quantity, amount };

  await service.addInventory(productData);

  res.status(200).redirect("/inventory");
});

app.get("/register-form", (req, res) => {
  res.status(200).render("register");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const users = await service.getUser();
  const existingUser = users.find((user) => user.username === username);

  if (existingUser) {
    console.log("User already exists.");
    res.status(400).send("User already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await service.addUser({
    username,
    password: hashedPassword,
  });

  res.status(200).render("user", { users: users });
});

app.get("/employee-form", async (req, res) => {
  res.status(200).render("addEmployee");
});

app.get("/employee", async (req, res) => {
  const employee = await service.getEmployee();

  res.status(200).render("employee", { employee: employee });
});

app.get("/product/detail/:id", async (req, res) => {
  const recordId = parseInt(req.params.id);
  const recordDetails = await service.getInventoryById(recordId);

  res.render("inventoryDetail", { recordDetails, recordId });
});

app.post("/updateRecordInventory", async (req, res) => {
  const { id, product_id, product, quantity, cost, amount } = req.body;
  const updateRecordInventory = {
    id,
    product_id,
    product,
    quantity,
    cost,
    amount,
  };

  await service.updateRecordInvetory(updateRecordInventory);

  res.status(200).redirect("/inventory");
});

app.get("/product/delete/:id", async (req, res) => {
  const recordId = parseInt(req.params.id);
  const recordDetails = await service.getInventoryById(recordId);

  res.render("inventoryDelete", { recordDetails, recordId });
});

app.post("/deleteRecordInventory", async (req, res) => {
  const { id, product_id, product, quantity, cost, amount } = req.body;
  const deleteRecordInvetory = {
    id,
    product_id,
    product,
    quantity,
    cost,
    amount,
  };

  await service.deleteRecordInventory(deleteRecordInvetory);

  res.status(200).redirect("/inventory");
});

app.post("/addEmployee", async (req, res) => {
  const { first_name, last_name, phone } = req.body;
  const employeeData = { first_name, last_name, phone };

  await service.addEmployee(employeeData);

  const employee = await service.getEmployee();

  res.render("employee", { employee: employee });
});

app.get("/employee/detail/:id", async (req, res) => {
  const recordId = parseInt(req.params.id);
  const recordDetails = await service.getEmployeeById(recordId);

  res.render("employeeDetail", { recordDetails, recordId });
});

app.get("/recordWorkTime", async (req, res) => {
  const employee = await service.getEmployee();
  const recordWorkTime = await service.getRecordWorkTime();

  const formattedRecordWorkTime = recordWorkTime.map((item) => ({
    id: item.id,
    date: item.date,
    employee: item.employee,
    start_time: formatTimeTo24Hours(item.start_time),
    end_time: formatTimeTo24Hours(item.end_time),
  }));

  res
    .status(200)
    .render("recordWorkTime", {
      recordWorkTime: formattedRecordWorkTime,
      employee: employee,
    });
});

app.post("/addRecordWorkTime", async (req, res) => {
  const { employee, start_time, end_time } = req.body;
  const recordWorkTimeData = {
    employee,
    start_time,
    end_time,
  };

  await service.addRecordWorkTime(recordWorkTimeData);

  res.status(200).redirect("/recordWorkTime");
});

app.get("/recordWorkTime/detail/:id", async (req, res) => {
  const recordId = parseInt(req.params.id);
  const recordDetails = await service.getRecordWorkTimeById(recordId);

  recordDetails.start_time = formatTimeTo24Hours(recordDetails.start_time);
  recordDetails.end_time = formatTimeTo24Hours(recordDetails.end_time);

  res.render("employeeDetail", { recordDetails, recordId });
});

app.post("/updateRecordWorkTime", async (req, res) => {
  const { id, start_time, end_time } = req.body;
  const updateRecordWorkTime = { id, start_time, end_time };

  await service.updateRecordWorkTime(updateRecordWorkTime);

  res.status(200).redirect("/recordWorkTime");
});

app.get("/logout", (req, res) => {
  res.redirect("/");
});

module.exports = app;
