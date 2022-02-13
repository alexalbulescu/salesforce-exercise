const express = require('express');
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

router.get("/stores", async (req, res) => {
    await res.sendFile(path.join(__dirname, "../views", "stores.html"));
});

module.exports = router;