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

// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './config/mongodb.js';
// import userRouter from './routes/userRoutes.js';
// import imageRouter from './routes/imageRouters.js';

// const PORT = process.env.PORT || 4000;
// const app = express();

// // ✅ Fixed CORS Configuration
// app.use(cors({
//     origin: ["http://localhost:5175", "https://text-image-gules.vercel.app"], // Allow both local dev and production frontend
//     methods: ["POST", "GET"],
//     credentials: true  // ✅ Fixed "credential" typo (should be "credentials")
// }));

// // Middleware
// app.use(express.json());

// // Database Connection & Start Server
// connectDB()
//   .then(() => {
//       console.log('MongoDB connected');
//       app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch(err => console.error('MongoDB connection failed:', err));

// // Routes
// app.use('/api/user', userRouter);
// app.use('/api/image', imageRouter);
// app.get('/', (req, res) => res.send('API Working'));

// // Export for Vercel Serverless Function
// export default app;


import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRouters.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ["https://text-image-gules.vercel.app"], // Your frontend URL
    methods: ["POST", "GET"],
    credentials: true
}));

// Database Connection
connectDB().then(() => console.log('MongoDB connected')).catch(err => console.error('MongoDB connection failed:', err));

// Routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);
app.get('/', (req, res) => res.send('API Working'));

// ✅ Instead of app.listen(PORT), use export default for Vercel
export default app;
