const { validationResult } = require("express-validator");
const Listing = require("../models/listing");

exports.getJobs = (req, res, next) => {
  Listing.findAll()
    .then((jobs) => {
      res.status(200).json({ message: "Fetched Jobs Succesfully", jobs: jobs });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postJob = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  const clientFirstName = req.body.clientFirstName;
  const clientLastName = req.body.clientLastName;
  const clientCompany = req.body.clientCompany;
  const clientEmail = req.body.clientEmail;
  const jobTitle = req.body.jobTitle;
  const jobDetails = req.body.jobDetails;
  const completionDate = req.body.completionDate;
  const feeAmount = req.body.feeAmount;
  Listing.create({
    clientFirstName: clientFirstName,
    clientLastName: clientLastName,
    clientCompany: clientCompany,
    clientEmail: clientEmail,
    jobTitle: jobTitle,
    jobDetails: jobDetails,
    completionDate: completionDate,
    feeAmount: feeAmount,
  })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "job created successfully",
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getjob = () => {
  const jobId = req.params.jobId;
  Listing.findById(jobId)
    .then((job) => {
      res.status(200).json({ message: "Fetched Job Succesfully", job: job });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getEditJob = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const jobId = req.params.jobId;
  Listing.findById(jobId)
    .then((job) => {
      if (!job) {
        return res.status(404).json({ message: "Job not Found" }).redirect("/");
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
