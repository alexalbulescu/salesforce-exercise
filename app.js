const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "views")));

app.use("/", require("./routes/index"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));