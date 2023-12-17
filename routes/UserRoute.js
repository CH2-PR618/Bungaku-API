import express from "express";
import { updateUser, createUser } from "../controllers/Users.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.post('/register', createUser);
router.put("/user/update", verifyUser, updateUser);

export default router;
