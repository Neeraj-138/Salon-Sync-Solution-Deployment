import express  from "express";
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import branchRoutes from './routes/branch.js'
import serviceRoutes from './routes/services.js'
import bookingRoutes from './routes/booking.js'
import adminRoutes from './routes/admin.js'
import bodyParser  from "body-parser";
import Razorpay from 'razorpay'
import paymentRoute from './routes/payment.js'
import cors from 'cors';
import cookieParser from "cookie-parser";

const app=express();


const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];


app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

export const instance =new Razorpay({
    key_id:process.env.KEY_ID,
    key_secret:process.env.KEY_SECRET
})

app.get('/',(req,res,next)=>{
    return res.status(200).json({
        status:true,
        message:"Hello World"
    })
})
app.use('/api/auth',authRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/user',userRoutes);
app.use('/api/branch',branchRoutes);
app.use('/api/service',serviceRoutes);
app.use('/api/booking',bookingRoutes);
app.use('/api/payment',paymentRoute);
const PORT=process.env.BACKEND_PORT||8000;
app.use('/uploads', express.static('uploads')); 
app.listen(PORT,()=>{
    console.log("Server listening at port ",PORT)
})