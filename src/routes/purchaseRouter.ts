import express from "express";
import { createPurchase, deletePurchase, getPurchaseById } from "../controllers/purchaseController";



const router = express.Router();

router.post('/', createPurchase)
router.delete('/:id', deletePurchase);
router.get('/:id', getPurchaseById)


export default router;