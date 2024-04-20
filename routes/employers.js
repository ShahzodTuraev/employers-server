const { Router } = require("express");
const pool = require("../config/db");
const router = Router();

router.get("/", async (req, res) => {
  try {
    console.log("GET cont/employsers");
    const employers = await pool.query("SELECT * FROM employer");
    res.status(200).json(employers.rows);
  } catch (err) {
    console.log(`ERROR, cont/employers, ${err.message} `);
    res.status(500).json({ state: "fail", message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    console.log("GET cont/employserById");
    const employer = await pool.query(
      "SELECT * FROM employer LEFT JOIN job ON job.id=employer.job_id WHERE employer.id = $1",
      [req.params.id]
    );
    res.status(200).json(employer.rows[0]);
  } catch (err) {
    console.log(`ERROR, cont/employerById, ${err.message} `);
    res.status(500).json({ state: "fail", message: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    console.log("POST cont/employer-add");
    const { name, salary, degree, job_id } = req.body;
    const newEmployer = await pool.query(
      `
        INSERT INTO employer (name, degree, salary, job_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, degree, salary, job_id]
    );
    res.status(201).json(newEmployer.rows);
  } catch (err) {
    console.log(`ERROR, cont/employer-add, ${err.message} `);
    res.status(500).json({ state: "fail", message: err.message });
  }
});

// Edit

router.post("/update/:id", async (req, res) => {
  try {
    console.log("POST cont/employer-update");
    const { id } = req.params;
    const { name, salary, degree, job_id } = req.body;
    const oldEmployer = await pool.query(
      `SELECT * FROM employer WHERE id = $1`,
      [id]
    );
    const updatedEmployer = await pool.query(
      `
         UPDATE employer set name = $1, degree = $2, salary = $3, job_id = $4 WHERE id = $5 RETURNING *`,
      [
        name ? name : oldEmployer.rows[0].name,
        degree ? degree : oldEmployer.rows[0].degree,
        salary ? salary : oldEmployer.rows[0].salary,
        job_id ? job_id : oldEmployer.rows[0].job_id,
        id,
      ]
    );
    res.status(201).json(updatedEmployer.rows[0]);
  } catch (err) {
    console.log(`ERROR, cont/employer-update, ${err.message} `);
    res.status(500).json({ state: "fail", message: err.message });
  }
});

// DELETE

router.delete("/delete/:id", async (req, res) => {
  try {
    console.log("DELETE cont/employer-delete");
    const { id } = req.params;

    await pool.query(`DELETE FROM employer WHERE id = $1`, [id]);
    res.status(201).json({ message: "The employer deleted successfully" });
  } catch (err) {
    console.log(`ERROR, cont/employer-delete, ${err.message} `);
    res.status(500).json({ state: "fail", message: err.message });
  }
});
module.exports = router;
