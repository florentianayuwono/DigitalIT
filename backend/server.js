const cors = require("cors");
const dotenv = require("dotenv").config;
const { errorHandler } = require("./middlewares/errorMiddleware");
const express = require("express");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/form", require("./routes/formRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
