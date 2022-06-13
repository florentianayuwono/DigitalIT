const cors = require("cors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middlewares/errorMiddleware");
const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes //
// register and login
app.use("/authentication", require("./routes/userRoutes"));

// business particulars and data
app.use("/business", require("./routes/businessRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
