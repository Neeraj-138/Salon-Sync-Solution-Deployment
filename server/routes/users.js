import express from 'express'
import {applicationStatus, appointmentcancel, getUser,  insertContact,  myCancelledAppointment,  myappointment } from '../controller/users.js'
import { isAuthenticate, isCustomer } from '../middlewares/authMiddleware.js';

const router=express.Router();

router.get('/users/:id',getUser);
router.get('/users/myappointment/:id',isAuthenticate,isCustomer,myappointment);
router.get('/users/mycancelledappointment/:id',isAuthenticate,isCustomer,myCancelledAppointment);
router.post('/users/appointmentcancel/:id',isAuthenticate,isCustomer,appointmentcancel);
router.post('/users/contacts',isAuthenticate,isCustomer,insertContact);
router.get('/users/applicationStatus/:id',isAuthenticate,isCustomer,applicationStatus);

export default router;