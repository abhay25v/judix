import express from "express";
import { body } from "express-validator";
import { register, login, getMe, logout } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();
router.post(
	"/register",
	validate([
		body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
		body("email").isEmail().withMessage("Valid email is required"),
		body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
	]),
	register
);

router.post(
	"/login",
	validate([
		body("email").isEmail().withMessage("Valid email is required"),
		body("password").notEmpty().withMessage("Password is required"),
	]),
	login
);
router.get("/me", authMiddleware, getMe);
router.post("/logout", logout);

export default router;
