import express from 'express';
import githubRoutes from './routes/githubRoutes';
import userRoutes from './routes/usersRoutes';
import cors from 'cors';
import connectDB from './db/connection';
import { PORT } from './config';

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(githubRoutes);
app.use(userRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
