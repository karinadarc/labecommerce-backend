import express from "express";
import { createUser, deleteUser, getAllUsers } from "../controllers/userController";

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.delete('/:id', deleteUser);

export default router;

