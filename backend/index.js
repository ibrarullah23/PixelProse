import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

const { MONGODB_URI, FRONTEND_URI, PORT } = process.env;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use(cors({ credentials: true, origin: FRONTEND_URI }));
app.use(cookieParser());

// Import routes
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

// Use routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// Define a simple route
// app.use('/api', (req, res) => {
//   res.send('Hello World! The server is running.');
// });

// app.use("*" , function (req, res) {
//   res.status(404).json({ message: "Route not found" });
// })

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});

mongoose.connect(MONGODB_URI).then(() => {
  console.log('connected to mongoDB...')
}).catch(err => {
  console.log("could not connect to Mongo", err);
});
