const express = require("express");
const router = express.Router();
const path = require("path")


router.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "root.html"));
  });


module.exports = router;
