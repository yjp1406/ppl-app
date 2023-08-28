const express = require("express");
const router = express.Router();

router.use("/db", require("./db.route"));
router.use("/auth", require("./auth.route"));
router.use("/assignment", require("./assignment.route"));
router.use("/submission", require("./submission.route"));

module.exports = router;
