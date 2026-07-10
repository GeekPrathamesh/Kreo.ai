import express, { Request, Response } from 'express';
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { userRouter } from './routes/userRoutes.js';
import { projectRouter } from './routes/projectRoutes.js';
import { authRouter } from './routes/authRoutes.js';
import { stripeRouter } from './routes/stripeRoutes.js';
import { stripeWebhook } from './controllers/stripeController.js';
import connectDB from './configs/db.js';

const app = express();
connectDB();

const PORT = process.env.PORT || 9000;

// Configure CORS to dynamically allow all origins while supporting credentials
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    callback(null, origin); // explicitly echoes back the incoming origin string
  },
  credentials: true,
}));

app.use(cookieParser());

// Stripe Webhook needs raw body parser, must be defined BEFORE express.json()
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

app.use(express.json());

app.all("/health", (req, res) => {
  res.status(200).send("OK");
});

app.use("/api/auth", authRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/user", userRouter);
app.use("/api/project", projectRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});