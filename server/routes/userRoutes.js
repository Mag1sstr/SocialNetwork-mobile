import { Router } from "express";

import {
  getMyProfile,
  updateMyProfile,
  searchUsers,
  getUserById,
  getAllUsers,
} from "../controllers/userController.js";

import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/me", getMyProfile);
router.patch("/me", updateMyProfile);
router.get("/search", searchUsers);
router.get("/:id", getUserById);
router.get("/", getAllUsers);

export default router;
