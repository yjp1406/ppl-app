const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8000;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", require("./routes/index"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, (err) => {
  console.log(`Server up and running at ${PORT}`);
});

module.exports = app;