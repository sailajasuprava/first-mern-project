require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { globalErrorHandler } = require("./controllers/errorController");
const AppError = require("./utils/appError");
const authRouter = require("./routes/authRoutes");
const contactRouter = require("./routes/contactRoute");

const port = process.env.PORT || 3000;
const DB = process.env.DB_URL;
const corsOptions = {
  origin: " http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
const app = express();

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.log("ERROR", err));

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/contact", contactRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`This route ${req.originalUrl} doesn't exist.`, 404));
});
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
