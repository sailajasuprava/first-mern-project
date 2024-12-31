require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const authRouter = require("./routes/authRoutes");

const port = process.env.PORT || 3000;
const DB = process.env.DB_URL;

const app = express();

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.log("ERROR", err));

app.use(express.json());
app.use("/api/v1/auth", authRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
