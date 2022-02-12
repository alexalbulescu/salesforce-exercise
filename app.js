const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "views")));

app.use("/", require("./routes/index"));
app.use('/stores', require("./routes/stores"));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));