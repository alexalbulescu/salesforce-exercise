const express = require('express');
const router = express.Router();

router.get("/", async (req, res) =>{
    await res.sendFile(path.join(__dirname, "views", "index.html"));
});

module.exports = router;