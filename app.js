const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");
const sequelize = require("./util/sequelize");
const Listing = require("./models/listing");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origins", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/admin", adminRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({message: message});
})

// sequelize
//   .sync()
//   .then((result) => {
//     console.log("result");
//     app.listen(4040);
//   })
//   .catch((err) => {
//     console.log('Unable to connect to the database:', err);
//   });

const init_DB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    const created = sequelize.sync({ force: true });

    if (created) {
      console.log("==> TABLE DONE !");
      app.listen(4040);
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
init_DB();
