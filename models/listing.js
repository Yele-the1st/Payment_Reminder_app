const Sequelize = require("sequelize");

const sequelize = require("../util/sequelize");

const Listing = sequelize.define("listing", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  clientFirstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  clientLastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  clientCompany: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  clientEmail: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  jobTitle: Sequelize.STRING,
  jobDetails: Sequelize.STRING,
  completionDate: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  feeAmount: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
});

module.exports = Listing;
