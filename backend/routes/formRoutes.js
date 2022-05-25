const express = require("express");
const router = express.Router();
const {
  digitalizeForm,
  controlForm,
} = require("../controllers/formController");

router.post("/digitalize", digitalizeForm);
router.post("/control", controlForm);
