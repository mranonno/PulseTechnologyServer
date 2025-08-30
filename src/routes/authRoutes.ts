import express from "express";
import { loginUser, registerUser } from "../controllers/authController";
import { upload } from "../middleware/uploadCloudinary";

const router = express.Router();

router.post("/register", upload.single("image"), registerUser);
router.post("/login", loginUser);

export default router;
