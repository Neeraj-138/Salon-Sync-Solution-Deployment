import express from 'express'
import {checkout,  paymentVerification } from '../controller/razorpay.js';
import { isAuthenticate, isCustomer } from '../middlewares/authMiddleware.js';


const router=express.Router();
router.post('/paymentCheckout',checkout);
router.post('/paymentVerification',paymentVerification);

export default router;