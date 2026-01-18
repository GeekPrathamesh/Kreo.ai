import express, { Request, Response } from 'express';
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerk.js';
import { userRouter } from './routes/userRoutes.js';
import { projectRouter } from './routes/projectRoutes.js';

const app = express();

const PORT = process.env.PORT || 9000;


//middkeware
app.use(cors());
app.post('/api/clerk', express.raw({ type: 'application/json' }),clerkWebhooks)
app.use(express.json());
app.use(clerkMiddleware())

app.use("/api/user",userRouter);
app.use("/api/project",projectRouter);
app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});