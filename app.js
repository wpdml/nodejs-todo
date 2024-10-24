const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require("dotenv").config();

const allowedOrigins = [
  "http://localhost:3000",
  "https://todo-demo3.netlify.app",
  "https://jeuitodo.netlify.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200,
};

const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
console.log("mongouri", MONGODB_URI_PROD);
const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/api", indexRouter);

const mongoURI = MONGODB_URI_PROD;

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("DB connection fail", err);
  });

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
