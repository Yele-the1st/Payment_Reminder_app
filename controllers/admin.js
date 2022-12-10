const { validationResult } = require("express-validator");
const Listing = require("../models/listing");
const services = require("../Services/admin");

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
    services.postJob(req)
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
