import  express  from "express";
import multer from "multer";
import{ AllBookedAppointment,  AllBookedAppointmentbydate,  acceptrequest,  addreview,  allcontact,  allemployee, allreviews, deletecontact, deletereview, getemployee, getreview, rejectrequest, request, requrestemployee, updateEmployee, updatereview } from "../controller/admin.js";
import { isAdmin, isAuthenticate } from "../middlewares/authMiddleware.js";
const router=express.Router();



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,"./uploads"); // Destination folder for storing uploaded files
    },
    filename: function (req, file, cb) {
      cb(null,`${ Date.now() + '-' + file.originalname}`); // Use unique filenames
    }
  });
  
  const upload = multer({ storage:storage });
  
router.get('/allbookedappointment',AllBookedAppointment);
router.get('/allbookedappointmentbydate',isAuthenticate,isAdmin,AllBookedAppointmentbydate);
router.get('/allemployee',isAuthenticate,isAdmin,allemployee);
router.get('/requestemployee',isAuthenticate,isAdmin,requrestemployee);
router.get('/employee/:id',getemployee);
router.put('/updateemployee/:id',isAuthenticate,isAdmin,updateEmployee);
router.post('/request', upload.single('file'),request);
router.post('/acceptrequest/:id',isAuthenticate,isAdmin, acceptrequest);
router.post('/addreview',isAuthenticate,isAdmin, addreview);
router.delete('/deletereview/:id',isAuthenticate,isAdmin, deletereview);
router.put('/updatereview/:id',isAuthenticate,isAdmin, updatereview);
router.get('/getreview/:id', getreview);
router.get('/allreviews', allreviews);
router.post('/rejectrequest/:id',isAuthenticate,isAdmin, rejectrequest);
router.get('/allcontacts',isAuthenticate,isAdmin,allcontact);
router.delete('/deletecontact/:id',isAuthenticate,isAdmin, deletecontact);


export default router;