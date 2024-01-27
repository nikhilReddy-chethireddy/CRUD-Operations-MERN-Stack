const express = require("express");
const dotenv = require("dotenv").config();
const ContactUserRouter = require("./routes/contactRoutes.js");
const UserRouter = require("./routes/userRoutes.js");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler.js");
const connectDb = require("./config/dbConnection.js");

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) =>
  res.status(200).send("<h1>The Server is alive!</h1>")
);
app.use("/api/contacts", ContactUserRouter);
app.use("/api/users", UserRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`The server is running on ${port}`);
});
