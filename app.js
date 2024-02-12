const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectMongodb = require("./init/mongodb");
const { authRoute, categoryRoute, fileRoute, postRoute } = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const { errorHandler } = require("./middlewares");
const notFound = require("./controllers/notFound");
const app = express();
dotenv.config();
connectMongodb();

app.use(cors({ origin: ["http://127.0.0.1:5173", "http://localhost:5173"] }));
app.use(express.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/file", fileRoute);
app.use("/api/v1/post", postRoute);

app.use("*", notFound);
app.use(errorHandler);
module.exports = app;
