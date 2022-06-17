const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middlewares/errorMiddleware");
const express = require("express");
const PORT = process.env.PORT || 5000;

const app = express();


app.use(cors());
app.use(express.json());


/* ROUTES for user and business related backend API */
// user particulars and data
app.use("/api/users", require("./routes/userRoutes"));
// business particulars and data
app.use("/api/business", require("./routes/businessRoutes"));
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

if (process.env.NODE_DEV == "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // For all routes that are not the api routes specified above, direct to frontend's index.html
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html"),
    );
  })
} else {
  app.get('/', (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));