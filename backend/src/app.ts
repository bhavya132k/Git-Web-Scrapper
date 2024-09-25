import express from 'express';
import githubRoutes from './routes/githubRoutes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(githubRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
