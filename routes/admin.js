const express = require("express");
const { body } = require("express-validator");

const adminController = require("../controllers/admin");

const router = express.Router();

//GET /admin/jobs
router.get("/jobs", adminController.getJobs);

//POST /admin/job
router.post(
  "/job",
  [
    body("clientFirstName").isString().trim().isLength({ min: 2, max: 20 }),
    body("clientLastName").isString().trim().isLength({ min: 2, max: 20 }),
    body("clientCompany").isString().trim().isLength({ min: 2, max: 20 }),
    body("clientEmail")
      .isEmail()
      .withMessage("please enter a valid email address.")
      .normalizeEmail({ gmail_remove_dots: false }),
    body("jobTitle").isString().trim().isLength({ min: 4 }),
    body("jobDetails").isString().trim().isLength({ min: 4, max: 400 }),
    body("completionDate").trim().isLength({ min: 4 }),
    body("feeAmount").isFloat(),
  ],
  adminController.postJob
);

router.get("/admin/:jobId");

module.exports = router;
