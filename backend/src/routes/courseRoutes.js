// src/routes/courseRoutes.js

const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.get("/", courseController.getAllCourses);
router.post("/", courseController.createCourse);
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
