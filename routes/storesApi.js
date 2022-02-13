const stores = require("../controllers/storesController");
const express = require('express');
const router = express.Router();

//create a store
router.post("/", stores.create);
//get all stores
router.get("/", stores.findAll);

router.get("/options", stores.getOptions);

module.exports = router;