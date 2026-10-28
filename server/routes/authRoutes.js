import { Router } from "express";
import rateLimit from "express-rate-limit";

import {
  register,
  login,
  logout,
  getMe,
} from "../controllers/authController.js";

import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Слишком много попыток. Попробуйте через 15 минут",
  },
});

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/logout", logout);
router.get("/me", requireAuth, getMe);

export default router;
