const { validationResult } = require("express-validator");
const Listing = require("../models/listing");

module.exports = {
    postJob: data => {  
        const errors = validationResult(data)
        .then(
            (result) => {
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
            }
        )
        
        }
}