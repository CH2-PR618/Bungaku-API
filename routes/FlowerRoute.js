import express from 'express';
import { verifyUser } from "../middleware/AuthUser.js";
import { getFlowerByName, getAllFlowers } from '../controllers/flowers.js';

const router = express.Router();

router.get('/flowers', verifyUser, getAllFlowers);
router.get('/flower/:flowerName', verifyUser, getFlowerByName);

export default router;
