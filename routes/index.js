const { Router } = require("express");
const jobsCont = require("./jobs");
const employersCont = require("./employers");
const router = Router();
router.use("/jobs", jobsCont);
router.use("/employers", employersCont);

module.exports = router;
