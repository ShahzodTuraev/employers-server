const { Router } = require("express");
const pool = require("../config/db");
const router = Router();

router.get("/", async (req, res) => {
  try {
    console.log("GET cont/jobs");
    const jobs = await pool.query("SELECT * FROM job");
    res.status(200).json(jobs.rows);
  } catch (err) {
    console.log(`ERROR, cont/jobs, ${err.message} `);
    res.status(500).json({ state: "fail", message: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    console.log("POST cont/add");
    const newJobs = await pool.query(
      `
      INSERT INTO job (title) VALUES ($1) RETURNING *`,
      [req.body.title]
    );
    res.status(201).json(newJobs.rows);
  } catch (err) {
    console.log(`ERROR, cont/add, ${err.message} `);
    res.status(500).json({ state: "fail", message: err.message });
  }
});

module.exports = router;
