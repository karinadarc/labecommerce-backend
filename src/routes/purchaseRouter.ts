import express from "express";
import { db } from "../database/knex";
import { createPurchase, deletePurchase } from "../controllers/purchaseController";



const router = express.Router();

router.post('/', createPurchase)
router.delete('/:id', deletePurchase);


export default router;