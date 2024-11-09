import express from 'express';
import githubRoutes from './routes/githubRoutes';
import cors from 'cors';
import { PORT } from './config';

const app = express();
app.use(cors());
app.use(express.json());
app.use(githubRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
