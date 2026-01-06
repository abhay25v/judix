import express from "express";
import { body } from "express-validator";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { authMiddleware } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

// All task routes require authentication
router.use(authMiddleware);

router.post(
  "/",
  validate([body("title").trim().isLength({ min: 3 }).withMessage("Title must be at least 3 characters")]),
  createTask
);
router.get("/", getTasks);
router.get("/:id", getTask);
router.put(
  "/:id",
  validate([
    body("title").optional().trim().isLength({ min: 3 }).withMessage("Title must be at least 3 characters"),
    body("completed").optional().isBoolean().withMessage("Completed must be a boolean"),
  ]),
  updateTask
);
router.delete("/:id", deleteTask);

export default router;
