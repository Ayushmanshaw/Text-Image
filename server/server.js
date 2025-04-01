// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './config/mongodb.js'
// import userRouter from './routes/userRoutes.js'
// import imageRouter from './routes/imageRouters.js'
// const PORT = process.env.PORT || 4000
// const app = express()
// app.use(express.json())
// app.use(cors())
// await connectDB()
// app.use('/api/user',userRouter)
// app.use('/api/image',imageRouter)
// app.get('/',(req,res)=>res.send("API Working"))
// app.listen(PORT,()=>console.log('server running on port'+PORT))

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRouters.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
connectDB().then(() => console.log('MongoDB connected')).catch(err => console.error('MongoDB connection failed:', err));

// Routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);
app.get('/', (req, res) => res.send('API Working'));

// Export for Vercel Serverless Function
export default app;
